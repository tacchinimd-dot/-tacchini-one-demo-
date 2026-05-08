#!/usr/bin/env node
/* ============================================================
 * relativize.mjs — out/ 폴더의 HTML/CSS/JS의 절대 경로를 상대 경로로 변환
 *
 * 목적: 정적 export 결과물을 file://로 더블클릭해도 자산이 로드되도록
 *
 * 변환 규칙:
 *   - HTML 안의 href / src / poster / data-... 의 "/_next/..." → 상대 경로
 *   - HTML 안의 background-image: url("/_next/...") → 상대 경로
 *   - CSS 안의 url(/_next/...) → 상대 경로
 *   - JS chunks의 일부 절대 경로 (manifest 등) — 시도하되 chunk 내 동적 경로는 한계
 *
 * 폴더 깊이에 따라 ../ 갯수를 동적 계산한다:
 *   out/index.html         → "./_next/..."
 *   out/console/index.html → "../_next/..."
 *   out/atelier/inspector/index.html → "../../_next/..."
 * ============================================================ */

import { readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, dirname, sep, posix } from "node:path";
import { readdir } from "node:fs/promises";

const ROOT = process.argv[2] || "out";

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function toPosix(p) {
  return p.split(sep).join(posix.sep);
}

/**
 * 파일 위치를 기준으로 "/_next/foo" 같은 절대 경로를 "../_next/foo"로 변환
 */
function relativizeContent(content, fileAbsPath, rootAbsPath) {
  const fileDir = dirname(fileAbsPath);
  const relToRoot = toPosix(relative(fileDir, rootAbsPath)) || ".";
  const prefix = relToRoot === "" ? "." : relToRoot;

  // 1) src="/_next/..." href="/_next/..." 등의 attr value
  let next = content.replace(
    /(["'(=])\/(_next\/[^"'\s)]+)/g,
    (_m, lead, path) => `${lead}${prefix}/${path}`
  );

  // 2) src="/file.svg" 같은 public/ 정적 자산 (확장자 기반)
  next = next.replace(
    /((?:src|href)=["'])\/([^/"'][^"']*\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|css|js|json|html))(["'])/g,
    (_m, lead, path, tail) => `${lead}${prefix}/${path}${tail}`
  );

  // 3) 페이지 간 링크 — Next App Router export는 trailingSlash로 폴더 구조라
  //    href="/console/" 같은 형태가 나옴. 이것을 상대 경로로 변환.
  next = next.replace(
    /(href=["'])\/([a-zA-Z][^"']*\/?)(["'])/g,
    (_m, lead, path, tail) => `${lead}${prefix}/${path}${tail}`
  );

  return next;
}

let processed = 0;
const rootAbs = process.cwd() + sep + ROOT;

for await (const file of walk(ROOT)) {
  const ext = file.split(".").pop()?.toLowerCase();
  if (!["html", "css", "js"].includes(ext)) continue;

  // js chunks는 사이즈 큼. .html / .css만 처리하는 것이 안전.
  // js 안에 "/_next/" 절대 경로가 없으면 건너뛰기 (Next 16 기준 chunk 내부 경로는 manifest로 처리됨)
  if (ext === "js") {
    const content = readFileSync(file, "utf8");
    if (!content.includes('"/_next/') && !content.includes("'/_next/")) continue;
    // js는 안전하게 processing 안 함 (런타임에 manifest로 처리됨)
    continue;
  }

  const original = readFileSync(file, "utf8");
  const fileAbs = process.cwd() + sep + file;
  const transformed = relativizeContent(original, fileAbs, rootAbs);

  if (transformed !== original) {
    writeFileSync(file, transformed, "utf8");
    processed++;
    console.log(`  ✓ ${toPosix(file)}`);
  }
}

console.log(`\n[relativize] ${processed} files updated.`);
