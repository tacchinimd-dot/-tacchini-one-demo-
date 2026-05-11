#!/usr/bin/env node
/* ============================================================
 * sync-apex.mjs — Downloads/apex_report_standalone.html 를
 * public/apex-report.html 로 자동 동기화
 *
 * 사용:
 *   - npm run sync-apex (수동)
 *   - npm run build (prebuild 훅으로 자동 호출)
 *
 * 흐름:
 *   1. SOURCE 파일 존재 확인
 *   2. SHA256 해시 비교 → 동일하면 skip
 *   3. 다르면 복사 + 변경 사실 출력 (git이 변경 감지하도록)
 *
 * 환경변수로 SOURCE 경로 override 가능:
 *   APEX_SOURCE=/path/to/apex.html npm run sync-apex
 *
 * GitHub Actions에서는 SOURCE 파일이 없으므로 자동 skip
 * (이미 git에 commit된 public/apex-report.html을 그대로 사용).
 * ============================================================ */

import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { homedir } from "node:os";

const DEFAULT_SOURCE = join(homedir(), "Downloads", "apex_report_standalone.html");
const SOURCE = process.env.APEX_SOURCE || DEFAULT_SOURCE;
const TARGET = join("public", "apex-report.html");

function sha256(filePath) {
  const buffer = readFileSync(filePath);
  return createHash("sha256").update(buffer).digest("hex");
}

function fmtSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

console.log(`[sync-apex] Source: ${SOURCE}`);
console.log(`[sync-apex] Target: ${TARGET}`);

if (!existsSync(SOURCE)) {
  console.log(`[sync-apex] ⚠ Source 파일 없음 → skip (CI 환경 또는 사용자 PC에 없음)`);
  console.log(`[sync-apex]   기존 ${TARGET} 그대로 사용`);
  process.exit(0);
}

const srcSize = statSync(SOURCE).size;
const srcHash = sha256(SOURCE);

if (existsSync(TARGET)) {
  const tgtHash = sha256(TARGET);
  if (srcHash === tgtHash) {
    console.log(`[sync-apex] ✓ 동일 (${fmtSize(srcSize)}) — skip`);
    process.exit(0);
  }
  const tgtSize = statSync(TARGET).size;
  console.log(`[sync-apex] 변경 감지: ${fmtSize(tgtSize)} → ${fmtSize(srcSize)}`);
} else {
  console.log(`[sync-apex] ${TARGET} 신규 생성`);
}

const data = readFileSync(SOURCE);
writeFileSync(TARGET, data);
console.log(`[sync-apex] ✓ 복사 완료 (${fmtSize(srcSize)})`);
console.log(`[sync-apex]   git status 에서 ${TARGET} 변경이 감지될 것`);
