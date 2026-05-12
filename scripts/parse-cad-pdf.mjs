#!/usr/bin/env node
/* ============================================================
 * parse-cad-pdf.mjs — 라이센시 CAD PDF (MOVIN 형태) 텍스트 파서
 *
 * 입력: PDF 파일 (예: T1_ACE.pdf)
 * 출력: {
 *   line: "ACE",
 *   season: "SS27",
 *   gender: "MAN",
 *   skus: [
 *     {
 *       code: "42020",
 *       name: "ACE TRACK JACKET",
 *       fabricRaw: "NYLON STRETCH DRY TOUCH 88% PA 12% EA · LINING JERSEY",
 *       composition: { PA: 88, EA: 12, CO: 0, ... },
 *       colors: ["WHITE", "GARDENIA", "NAVY PEONY", ...]
 *     }, ...
 *   ]
 * }
 *
 * MOVIN PDF 구조 (학습된 패턴):
 *   SPRING SUMMER 2027  [LINE NAME]
 *   [GENDER]
 *   [5-digit SKU code] [PRODUCT NAME]
 *   [fabric lines...]
 *    TCX
 *     [color name]
 *    TCX
 *     [color name]
 *   ...
 *   [next SKU code]
 * ============================================================ */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
/* pdf-parse v2 (exports field 제한) — 직접 main entry 경로 사용 */
const PKG_ROOT = (() => {
  const cwd = process.cwd();
  return path.join(cwd, "node_modules", "pdf-parse");
})();
const pkgJson = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, "package.json"), "utf-8"));
const mainPath = path.join(PKG_ROOT, pkgJson.main);
const { PDFParse } = require(mainPath);

const FABRIC_KEYWORDS = [
  "COTTON",
  "NYLON",
  "POLY",
  "POLYESTER",
  "ELASTANE",
  "SPANDEX",
  "VISCOSE",
  "JERSEY",
  "PIQUET",
  "TRICOT",
  "FLEECE",
  "TWILL",
  "RIPSTOP",
  "MESH",
  "STRETCH",
  "GSM",
  "PA",
  "EA",
  "EL",
  "CO",
  "PL",
  "FABRIC",
  "LINING",
  "HEAVY",
];

function parseComposition(rawText) {
  /** 소재 텍스트에서 성분 비율 추출. 예: "88% PA 12% EA" → { PA: 88, EA: 12 } */
  const codeMap = {
    PA: "PA",       // Polyamide (Nylon)
    NYLON: "PA",
    PL: "PL",       // Polyester
    POLY: "PL",
    POLYESTER: "PL",
    PE: "PL",       // 별칭
    EA: "EA",       // Elastane
    ELASTANE: "EA",
    SPANDEX: "EA",
    EL: "EA",
    CO: "CO",       // Cotton
    COTTON: "CO",
  };

  /* 패턴 1: "88% PA 12% EA" 또는 "88%PA 11%PL" — 숫자% 키워드 */
  const result = {};
  const regex1 = /(\d{1,3})\s*%\s*([A-Z]+)/g;
  let m;
  while ((m = regex1.exec(rawText.toUpperCase())) !== null) {
    const code = codeMap[m[2]];
    if (code) {
      result[code] = (result[code] || 0) + parseInt(m[1], 10);
    }
  }

  /* 패턴 2: "71% COTTON 25% NYLON 4% SPANDEX" — 위 정규식이 처리함 */
  return result;
}

function extractFabricSummary(skuBlock) {
  /** SKU 블록에서 소재 관련 라인만 한 문자열로 합침 (검수 룰의 raw 입력) */
  const lines = skuBlock.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  /* 첫 줄은 제품명 — 그 다음부터 TCX 마커 전까지가 소재 정보 */
  const fabricLines = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith("TCX")) break;
    if (lines[i] === "TCX") break;
    /* 소재 키워드가 하나라도 들어 있으면 fabric 라인으로 간주 */
    const upper = lines[i].toUpperCase();
    if (FABRIC_KEYWORDS.some((k) => upper.includes(k))) {
      fabricLines.push(lines[i]);
    }
  }
  return fabricLines.join(" · ");
}

function extractColors(skuBlock) {
  /** "TCX" 마커 다음 줄을 컬러로 인식. 중복 제거 */
  const lines = skuBlock.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const colors = new Set();
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "TCX" || lines[i].endsWith("TCX")) {
      if (i + 1 < lines.length) {
        const cand = lines[i + 1].replace(/^TCX\s*/i, "").trim();
        /* 다음 라인이 SKU 코드(숫자 5자리)거나 빈 줄이면 skip */
        if (/^\d{5}$/.test(cand)) continue;
        if (cand && cand.length > 1 && cand.length < 40) {
          colors.add(cand);
        }
      }
    }
  }
  return [...colors];
}

export function parsePDFText(text) {
  /** PDF 전체 텍스트 → 구조화된 객체로 변환 */
  /* 첫 줄에서 라인명 추출 ("SPRING SUMMER 2027  ACE") */
  const firstLine = text.split(/\r?\n/).find((l) => /SPRING|FALL|AUTUMN|WINTER/i.test(l)) || "";
  const seasonMatch = firstLine.match(/(SPRING\s+SUMMER|FALL\s+WINTER|AUTUMN\s+WINTER)\s+(\d{4})/i);
  const seasonName = seasonMatch ? seasonMatch[0].replace(/\s+/g, " ") : "Unknown";
  const seasonCode = seasonMatch
    ? `${seasonMatch[2].slice(2)}${/SPRING/i.test(seasonMatch[1]) ? "SS" : "FW"}`
    : "?";
  const lineName =
    firstLine
      .replace(/SPRING\s+SUMMER\s+\d{4}/i, "")
      .replace(/FALL\s+WINTER\s+\d{4}/i, "")
      .replace(/AUTUMN\s+WINTER\s+\d{4}/i, "")
      .trim() || "Unknown";

  /* 두 번째 줄에서 성별 */
  const lines = text.split(/\r?\n/).slice(0, 5);
  const genderLine =
    lines.find((l) => /^(MAN|WOMAN|WOMEN|MEN|UNISEX|KIDS)$/i.test(l.trim())) || "UNISEX";

  /* SKU 블록 분리 — 5자리 코드 + 공백 + 대문자 시작하는 제품명 */
  const skuRegex = /^(\d{5})\s+([A-Z][A-Z0-9 \-\/]+)$/gm;
  const matches = [];
  let m;
  while ((m = skuRegex.exec(text)) !== null) {
    matches.push({ code: m[1], name: m[2].trim(), index: m.index, end: m.index + m[0].length });
  }
  /* 두 줄에 걸친 경우: "42015\n BAGEL SHIRT" 같은 패턴도 처리 */
  const altRegex = /^(\d{5})\s*\n\s*([A-Z][A-Z0-9 \-\/]+)$/gm;
  while ((m = altRegex.exec(text)) !== null) {
    if (!matches.some((x) => x.code === m[1])) {
      matches.push({ code: m[1], name: m[2].trim(), index: m.index, end: m.index + m[0].length });
    }
  }
  matches.sort((a, b) => a.index - b.index);

  const skus = matches.map((sku, i) => {
    const next = matches[i + 1];
    const blockStart = sku.end;
    const blockEnd = next ? next.index : text.length;
    const block = text.slice(blockStart, blockEnd);
    const fabricSummary = extractFabricSummary(`${sku.name}\n${block}`);
    const composition = parseComposition(fabricSummary);
    const colors = extractColors(block);
    return {
      code: sku.code,
      name: sku.name,
      fabricRaw: fabricSummary || null,
      composition,
      colors,
    };
  });

  return {
    line: lineName,
    season: seasonName,
    seasonCode,
    gender: genderLine.trim(),
    skuCount: skus.length,
    skus,
  };
}

export async function parsePDF(filePath) {
  const data = fs.readFileSync(filePath);
  const parser = new PDFParse({ data });
  const r = await parser.getText();
  return parsePDFText(r.text);
}

/* CLI 진입 */
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}`) {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node parse-cad-pdf.mjs <pdf-file>");
    process.exit(1);
  }
  parsePDF(file)
    .then((r) => console.log(JSON.stringify(r, null, 2)))
    .catch((e) => {
      console.error("error:", e.message);
      process.exit(1);
    });
}
