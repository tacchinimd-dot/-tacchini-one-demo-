#!/usr/bin/env node
/* ============================================================
 * build-movin-data.mjs
 *
 * MOVIN 27SS LIFESTYLE MAN 폴더의 6개 CAD PDF를 일괄 파싱·검수하여
 * src/lib/movin-data.ts 로 출력.
 *
 * Inspector MOVIN 라우트(/atelier/inspector/movin)에서 import해서
 * 실제 라이센시 데이터로 라이브 데모.
 *
 * 사용:
 *   node scripts/build-movin-data.mjs
 *
 * CI(GitHub Actions)에서는 MOVIN 폴더에 접근 불가 →
 * 이미 commit된 src/lib/movin-data.ts 그대로 사용 (sync 못함은 skip).
 * ============================================================ */

import fs from "node:fs";
import path from "node:path";
import { homedir } from "node:os";
import { parsePDF } from "./parse-cad-pdf.mjs";
import { checkSKU, gradeLine } from "./check-pillars.mjs";

const ONEDRIVE_DIR = path.join(
  homedir(),
  "OneDrive - F&F",
  "SERGIO TACCHINI - 7. Global Merchandising Integration - 7. Global Merchandising Integration",
  "001. Licensee",
  "MOVIN",
  "27SS",
  "SKETCHES SUBMISSION SS27",
  "LIFESTYLE MAN",
);

const TARGET_FILES = [
  "T1_ACE.pdf",
  "T1_BAGEL.pdf",
  "T1_NET.pdf",
  "T1_ARCHIVIO.pdf",
  "T1_CHALLENGE.pdf",
  "T1_ESSENTIALS PLUS.pdf",
];

const OUT = "src/lib/movin-data.ts";

async function main() {
  const sourceExists = fs.existsSync(ONEDRIVE_DIR);
  if (!sourceExists) {
    console.log(`[build-movin-data] ⚠ Source 폴더 없음 → skip`);
    console.log(`[build-movin-data]   CI 환경 또는 OneDrive 동기화 안 됨`);
    console.log(`[build-movin-data]   기존 ${OUT} 그대로 사용`);
    return;
  }

  console.log(`[build-movin-data] Source: ${ONEDRIVE_DIR}`);
  console.log(`[build-movin-data] Target: ${OUT}`);
  console.log("");

  const lines = [];
  for (const file of TARGET_FILES) {
    const full = path.join(ONEDRIVE_DIR, file);
    if (!fs.existsSync(full)) {
      console.warn(`  ⚠ ${file} 없음 → skip`);
      continue;
    }
    const sz = (fs.statSync(full).size / 1024 / 1024).toFixed(1);
    console.log(`  · ${file} (${sz} MB)`);
    try {
      const parsed = await parsePDF(full);
      const scored = parsed.skus.map(checkSKU);
      const grade = gradeLine(scored);
      lines.push({
        file,
        sizeMB: parseFloat(sz),
        line: parsed.line,
        season: parsed.season,
        seasonCode: parsed.seasonCode,
        gender: parsed.gender,
        skuCount: parsed.skuCount,
        skus: scored,
        ...grade,
      });
      console.log(
        `    → ${parsed.skus.length} SKUs · 종합 등급 ${grade.grade} · A:${grade.distribution.A}/B:${grade.distribution.B}/C:${grade.distribution.C}/D:${grade.distribution.D}`,
      );
    } catch (e) {
      console.error(`    ✗ 파싱 실패: ${e.message}`);
    }
  }

  /* 라이센시 종합 (모든 라인 합산) */
  const allSKUs = lines.flatMap((l) => l.skus);
  const overallGrade = gradeLine(allSKUs);

  /* TypeScript 출력 */
  const ts = `/* ============================================================
 * movin-data.ts — AUTO-GENERATED · DO NOT EDIT BY HAND
 *
 * Source: ${path.basename(ONEDRIVE_DIR)} / 6 CAD PDFs
 * Built:  ${new Date().toISOString()}
 * Lines:  ${lines.length}
 * Total SKUs: ${allSKUs.length}
 *
 * 재생성: npm run sync-movin
 * (또는 npm run build — prebuild가 자동 호출)
 * ============================================================ */

export interface MovinSKU {
  code: string;
  name: string;
  fabricRaw: string | null;
  composition: Record<string, number>;
  colors: string[];
  inferredCore: string;
  pillarScores: { P1: number; P2: number; P3: number; P4: number; P5: number };
  violations: { rule: string; severity: string; issue: string }[];
  verdict: "A" | "B" | "C" | "D";
  weightedAvg: number;
  colorClassification?: {
    raw: string;
    stCategory: string | null;
    isAllowed: boolean;
    risk?: string;
  }[];
}

export interface MovinLine {
  file: string;
  sizeMB: number;
  line: string;
  season: string;
  seasonCode: string;
  gender: string;
  skuCount: number;
  skus: MovinSKU[];
  grade: "A" | "B" | "C" | "D";
  averagePoint: number;
  distribution: { A: number; B: number; C: number; D: number };
  totalSKU: number;
}

export const MOVIN_LINES: MovinLine[] = ${JSON.stringify(lines, null, 2)};

export const MOVIN_OVERALL = ${JSON.stringify(
    {
      licensee: "MOVIN",
      season: "27SS",
      category: "Lifestyle Man",
      generatedAt: new Date().toISOString(),
      totalLines: lines.length,
      totalSKU: allSKUs.length,
      ...overallGrade,
    },
    null,
    2,
  )};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, ts, "utf-8");
  console.log("");
  console.log(`[build-movin-data] ✓ ${OUT} 생성 완료`);
  console.log(
    `[build-movin-data]   ${lines.length} lines · ${allSKUs.length} SKUs · overall ${overallGrade.grade}`,
  );
}

main().catch((e) => {
  console.error("error:", e.message, e.stack);
  process.exit(1);
});
