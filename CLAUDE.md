@AGENTS.md

# TACCHINI ONE — Sergio Tacchini Global Licensee Platform Demo

> 🤖 Claude Code 새 대화에서 이 프로젝트 디렉토리에 들어오면 이 파일이 자동 로드됩니다.

## 한 줄 요약
F&F STE 라이센시 6개사 대상 글로벌 운영 플랫폼 데모. Next.js 16 + i18n(KO/EN) + GitHub Pages 자동 배포. 2026-06-09 컨퍼런스가 1차 마일스톤.

## 라이브 사이트
**https://tacchinimd-dot.github.io/-tacchini-one-demo-/**

| 페이지 | URL |
|--------|-----|
| 도어 (시작) | `/` |
| Operations Console | `/console/` |
| Inspector 라이브 데모 | `/atelier/inspector/` |
| AI-Report (검수 상세 리포트) | `/apex-report.html` (파일명 그대로 — UI에서는 "AI-Report"로 표시) |

## 배포·자동화 정책 (절대 준수)

### 1. 호스팅: **GitHub Pages만 사용** (Vercel·Netlify 사용 안 함)
- GitHub Actions 워크플로우(`.github/workflows/deploy.yml`)가 main push 시 자동 빌드·배포
- 빌드 모드: `output: 'export'` + `basePath: '/-tacchini-one-demo-'` (production만)
- dev 모드는 `npm run dev`로 `http://localhost:3000` (basePath 없음)

### 2. **사용자 요청 작업 완료 시 자동 commit + push**
사용자가 명시 요청한 정책. 매 sub-task가 아니라 사용자 요청 1건 완료 시 한 번에:
```bash
git add -A
git commit -m "<의미있는 메시지>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```
- push 후 GitHub Actions가 자동으로 약 2-3분 안에 라이브 사이트 업데이트
- 빌드 검증을 먼저 하고 push (실패한 코드 push 방지)
- 위험한 명령(force push, 브랜치 삭제 등)은 자동화 ❌, 사용자 승인 필요

### 3. 새 대화 시 가장 먼저 할 일
- 메모리(MEMORY.md)에서 프로젝트 컨텍스트 자동 로드 확인
- 필요 시 `git status` · `git log --oneline -5`로 현재 상태 점검
- dev 서버 실행 여부 확인 (이미 떠 있을 수 있음): `curl -sI http://localhost:3000`

## 기술 스택
- Next.js **16.2.6** (Turbopack · App Router) + React 19.2 + TypeScript 5
- Tailwind CSS **4** (CSS-first `@theme` in `src/app/globals.css`)
- Plus Jakarta Sans + JetBrains Mono (next/font Google)
- 자체 i18n (`src/lib/i18n/`) — KO/EN 토글 + localStorage 영속

## 폴더 컨벤션
```
src/app/          App Router 페이지
src/components/   brand · common · console · door · atelier
src/lib/          i18n · inspector-mock
public/           정적 자산 (apex-report.html 5MB)
.github/workflows/ deploy.yml
scripts/          relativize.mjs (file:// export용 유틸 — 현재 미사용)
```

## 명령어
- `npm run dev` — 로컬 개발 서버 (http://localhost:3000)
- `npm run build` — production 빌드 (out/ 생성, basePath 적용)
- `git push origin main` — GitHub Actions 트리거 → 라이브 배포

## 작업 시 주의
- **dev에서 작동하면 production에서도 작동하는지 빌드로 검증** (basePath 차이로 자산 경로 깨질 수 있음)
- `next/link` 또는 `next/image`는 basePath 자동 처리
- `<a href="/...">` 같은 직접 작성은 production에서 root 경로로 깨짐 — `<Link>` 사용 권장
- `useEffect` 안의 localStorage 사용은 SSR 안전 (도어의 한·EN 토글 패턴 참고)

## 중요 결정 이력
- 플랫폼 허브 = `TACCHINI ONE` / AI 디자인 에이전트 = `ATELIER ONE` 분리
- 워드마크 'O' = ST 라파챠 원형 심볼 (TacchiniSymbol.tsx)
- 도어 진입 → 모듈 클릭 → 콘솔 (Mission Control 패턴)
- 심층 검증 리포트의 UI 명칭 = **AI-Report** (이전엔 "Apex"였으나 명료성 위해 변경)
  - 단, 내부 파일·코드 식별자는 `apex-report.html` / `APEX_REPORT_URL` / `sync-apex.mjs` 등 유지 (사용자 원본 파일명 보존)
- 5 Pillars 구체화: **Sergio Tacchini Brandbook 2026** 기반으로 각 Pillar에 sub-pillars 5–6개 추가 (`PILLAR_META.subPillars`)
  - P4 Body-Lined Silhouette = 브랜드북 p.7 "Active Body Awareness" 명시 정의로 5개 sub-pillar 구체화
  - ABSOLUTE NO 8 Prohibitions (Brandbook p.10) — 1개라도 위반 시 즉시 Verdict D
- file:// 정적 export는 hydration 깨짐으로 포기 (메모리에 기록됨)
- Vercel CLI는 한글 사용자명("AD0707권은희") HTTP header validation으로 차단됨 → GitHub 경유

## 자세한 정보
- **메모리**: `~/.claude/projects/C--Users-AD0707/memory/project_st_global_licensee_platform.md`
- **배포 정책**: `~/.claude/projects/C--Users-AD0707/memory/feedback_deployment_preference.md`
- **v0 설계 문서**: `C:\Users\AD0707\src\output\st_platform_v0\TACCHINI_ONE_v0_초기설계.md`
