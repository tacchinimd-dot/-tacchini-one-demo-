/* ============================================================
 * i18n Dictionary — TACCHINI ONE 데모 한·영 사전
 *
 * 스코프:
 *   · 도어(/) 전체 카피
 *   · 콘솔(/console) 헤더·KPI 라벨·테이블 헤더
 *   · Inspector(/atelier/inspector) Step 이름·핵심 버튼·status
 *   · Sidebar 네비게이션
 *
 * 데이터 본문(라이센시명·디자인 ID·violation 텍스트·codex 답변 등)은
 * 시간 절약을 위해 한국어 그대로 유지 — 데모 스코프 한정.
 * ============================================================ */

export type Lang = "ko" | "en";

export const dictionary = {
  ko: {
    /* ===== 공통 ===== */
    common: {
      enter: "들어가기",
      open: "열기",
      back: "뒤로",
      next: "다음",
      previous: "이전",
      close: "닫기",
      reset: "초기화",
      view_all: "전체 보기",
      coming_soon: "준비 중",
      live: "Live",
      preview: "Preview",
      soon: "Soon",
      welcome_back: "다시 오신 것을 환영합니다",
      all_systems: "모든 시스템 정상",
      friday: "금요일",
      may: "5월",
      year: "2026년",
    },

    /* ===== Sidebar ===== */
    sidebar: {
      brand_subtitle: "GLOBAL LICENSEE HUB",
      tenant_org: "F&F HQ",
      tenant_dept: "STE Operations",
      group_operations: "Operations",
      group_atelier: "Atelier One · AI Agent",
      nav_dashboard: "Dashboard",
      nav_licensees: "Licensees",
      nav_royalty: "Royalty",
      nav_design: "Design Reviews",
      nav_calendar: "Season Calendar",
      nav_plans: "Plans",
      nav_contracts: "Contracts",
      nav_inspector: "Inspector",
      nav_studio: "Studio",
      nav_mirror: "Mirror",
      nav_codex: "Codex",
      user_role: "ST사업부 라이센스",
      version_label: "v0.4 · CONFERENCE PREVIEW",
      back_to_platform: "TACCHINI ONE 플랫폼으로",
    },

    /* ===== 도어 (/) ===== */
    door: {
      header_brand_subtitle: "GLOBAL LICENSEE PLATFORM",
      quick_search: "빠른 검색",
      welcome: "다시 오신 것을 환영합니다",
      hero_line1: "One Voice.",
      hero_line2: "One Brand.",
      hero_line3: "Tacchini One.",
      hero_body:
        "Sergio Tacchini의 글로벌 라이센시 운영 플랫폼.\n아래 모듈 중 하나를 선택해서 작업을 시작하세요.",
      pill_active_licensees: "6개 라이센시 운영 중",
      pill_awaiting: "검수 대기 2건",
      pill_q1_royalty: "Q1 로열티 €1.84M",
      pill_season: "26FW · D-180",

      workspaces_label: "Workspaces",
      workspaces_title: "어느 모듈로 들어갈까요",
      workspaces_summary: "6개 모듈 중 4개 활성",

      mod_ops_subtitle: "Operations Console",
      mod_ops_title: "Operations",
      mod_ops_body:
        "6개 라이센시 통합 모니터링. KPI · 시즌 캘린더 D-day · 라이센시 Health Matrix · 활동 피드를 한 화면에서.",
      mod_ops_stat_licensees: "라이센시",
      mod_ops_stat_compliance: "컴플라이언스",
      mod_ops_stat_pending: "대기",
      mod_ops_stat_pending_v: "검수 2건",

      mod_atelier_subtitle: "Atelier One — AI Design Agent",
      mod_atelier_title: "Atelier",
      mod_atelier_body:
        "라이센시 디자인을 5 Universal Pillars로 자동 검수. Inspector · Studio · Mirror · Codex 4 모듈을 한 워크스페이스에서.",
      mod_atelier_stat_week: "이번 주",
      mod_atelier_stat_week_v: "+검수 5건",
      mod_atelier_stat_avg: "평균 등급",
      mod_atelier_stat_pending: "대기",
      mod_atelier_stat_pending_v: "디자인 2건",

      mod_royalty_subtitle: "Royalty",
      mod_royalty_title: "Dual Verification",
      mod_royalty_body:
        "라이센시 보고 vs AI 산정 자동 비교 · 양측 동의 후 자동 인보이스.",
      mod_royalty_stat_q1: "Q1",
      mod_royalty_stat_pending: "대기",
      mod_royalty_stat_pending_v: "정산 3건",

      mod_calendar_subtitle: "Season Calendar",
      mod_calendar_title: "26FW · D-180",
      mod_calendar_body: "시즌 시간축. 마일스톤 11개 · 라이센시별 진행률 · 자동 알림.",
      mod_calendar_stat_progress: "진행률",
      mod_calendar_stat_next: "다음",

      mod_contracts_subtitle: "Contracts",
      mod_contracts_title: "Lifecycle",
      mod_contracts_body:
        "만료·갱신·종료. AI 갱신 인사이트 자동 생성 (누적 Min · 컴플라이언스).",
      mod_contracts_stat_expiring: "만료 임박",
      mod_contracts_stat_expiring_v: "12개월 내 2건",
      mod_contracts_stat_renewals: "갱신",
      mod_contracts_stat_renewals_v: "협상 1건",

      mod_codex_subtitle: "Brand Codex",
      mod_codex_title: "5 Pillars",
      mod_codex_body:
        "Universal Pillars · Category Codex · Licensee Annex 3-Tier RAG.",
      mod_codex_stat_pillars: "Pillars",
      mod_codex_stat_pillars_v: "5개 활성",
      mod_codex_stat_annex: "라이센시 Annex",

      activity_label: "최근 활동",
      activity_atelier_flagged: "검수 결과 발행",
      activity_benjamin_submitted: "Q1 로열티 제출",
      activity_bds_uploaded: "디자인 12건 업로드",
      activity_kwon_drafted: "갱신안 초안 작성",

      quick_actions_label: "빠른 액션",
      qa_inspector: "Inspector 데모 열기",
      qa_inspector_body: "라이브 디자인 검수 데모 시작",
      qa_apex: "AI-Report 보기",
      qa_apex_body: "Sugi France 26FW AI 검수 리포트",
      qa_console: "Operations Console",
      qa_console_body: "6개 라이센시 통합 대시보드",

      footer_legal: "© 2026 F&F Co., Ltd. · Sergio Tacchini Brand · Internal preview · Not for distribution.",
      footer_version: "v0.4 · Conference Preview",
    },

    /* ===== 콘솔 (/console) ===== */
    console: {
      breadcrumb_platform: "Platform",
      breadcrumb_hq: "F&F HQ",
      breadcrumb_ste: "STE Operations",
      breadcrumb_dashboard: "Dashboard",
      title: "Global Operations",
      subtitle: "6개 라이센시 통합 운영 · 26FW 시즌 진행 중",
      cta_new_review: "새 디자인 검수",

      kpi_licensees: "Active Licensees",
      kpi_licensees_caption: "STE",
      kpi_licensees_delta: "G1·2 · G2·2 · G3·2",
      kpi_royalty: "Q1 로열티",
      kpi_royalty_caption: "이중 검증 완료",
      kpi_reviews: "Design Reviews",
      kpi_reviews_caption: "HQ 검토 대기 2건",
      kpi_reviews_delta: "이번 주 +5",
      kpi_compliance: "Pillar 컴플라이언스",
      kpi_compliance_caption: "ATELIER ONE 평균",
      kpi_compliance_delta: "이전 대비 +2.1",

      season_label: "Season Calendar",
      season_title: "26FW · D-180",
      season_subtitle: "마스터 시간축 · 마일스톤 11개 · 최근 단계: 디렉션 게시 완료",
      season_open: "캘린더 열기",
      season_next: "NEXT",

      pending_label: "HQ 검수 대기",
      pending_title: "검수 3건",
      pending_view_all: "전체 보기",
      pending_open: "Inspector 데모 열기 →",

      atelier_label: "AI 디자인 에이전트",
      atelier_title: "ATELIER ONE",
      atelier_body:
        "5 Universal Pillars · §6 검증 공식 · 라이센시 그룹별 임계값으로 디자인을 자동 검수하고 타키니화 대안을 즉시 생성합니다.",
      atelier_cta: "Inspector 라이브 데모 열기",

      matrix_label: "Operations",
      matrix_title: "라이센시 6개 · Health Matrix",
      matrix_filter: "필터",
      matrix_export: "내보내기",
      th_licensee: "라이센시",
      th_group: "그룹",
      th_region: "지역 · 카테고리",
      th_revenue: "Q1 매출",
      th_minimum: "누적 Min %",
      th_compliance: "컴플라이언스",
      th_status: "상태",

      revenue_label: "시그니쳐 매출",
      revenue_title: "플라잉스커트 시즌별 추이",
      revenue_subtitle: "한국 데이터 누적 19.5억원 · ATELIER ONE 검증 공식 ①",

      activity_label: "Activity",
      activity_title: "최근 이벤트",
      activity_all: "전체",

      /* Season Calendar — 9 milestones (id: m1~m9) */
      milestone_m1_direction:   "F&F 시즌 디렉션 게시",
      milestone_m2_competitor:  "라이센시 경쟁사 데이터·기획",
      milestone_m3_design:      "디자인 산출물 제출 마감",
      milestone_m4_design_appr: "F&F 디자인 승인",
      milestone_m5_plan:        "차기 시즌 계획 제출",
      milestone_m6_sample:      "실물 샘플 송부",
      milestone_m7_sample_appr: "샘플 검수 + 시즌 계획 승인",
      milestone_m8_launch:      "시즌 출시",
      milestone_m9_royalty:     "분기 로열티 정산",

      /* Pending Review items */
      review_movin_net:        "27SS Lifestyle Man · NET line (5 SKU)",
      review_movin_full:       "27SS Lifestyle Man · 전체 28 SKU 자동검수 완료",
      review_heritage_demo:    "Heritage Hooded Jacket (이전 시즌 demo)",

      /* Time-ago labels */
      time_now:        "방금",
      time_2m:         "2분 전",
      time_5m:         "5분 전",
      time_30m:        "30분 전",
      time_47m:        "47분 전",
      time_2h:         "2시간 전",
      time_yesterday:  "어제",

      /* Activity actors + verbs */
      actor_atelier:   "ATELIER ONE",
      actor_benjamin:  "Benjamin",
      actor_bds:       "BDS",
      actor_kwon:      "권은희 차장",
      verb_completed_inspection: "검수 완료",
      verb_submitted_royalty:    "Q1 로열티 제출",
      verb_uploaded_designs:     "디자인 12건 업로드",
      verb_renewed_draft:        "계약 갱신안 작성",
      verb_flagged_p5:           "P5 위반 플래그",

      /* Licensee table — region · category · launching label */
      lic_bbuk_region:           "UK · Ireland",
      lic_bbuk_category:         "Apparel + Acc",
      lic_sugi_footwear_region:  "FR · IT · UK · DACH · ME",
      lic_sugi_footwear_category:"Footwear",
      lic_sugi_france_region:    "FR · DACH · Benelux · 북아프리카",
      lic_sugi_france_category:  "Apparel",
      lic_benjamin_region:       "Europe · ME · 북아프리카",
      lic_benjamin_category:     "Socks · UW · Sleepwear",
      lic_bds_region:            "동유럽 16개국 · CIS",
      lic_bds_category:          "Apparel",
      lic_silver_region:         "Italy",
      lic_silver_category:       "Apparel",
      revenue_launching:         "(런칭 전)",

      /* Licensee status pills (statusKind와 별개로 라이센시별 문구) */
      lic_bbuk_status:           "갱신 협상 중",
      lic_sugi_footwear_status:  "Brand Elevation",
      lic_sugi_france_status:    "26FW 런칭",
      lic_benjamin_status:       "5+5년 연장 요청",
      lic_bds_status:            "신계약 원년",
      lic_silver_status:         "사실상 종료",
    },

    /* ===== Licensees full page ===== */
    licensees_page: {
      breadcrumb: "Licensees",
      title: "라이센시 디렉토리",
      subtitle: "6개 STE 라이센시 통합 현황 · 그룹별 임계값 적용",
      search_placeholder: "라이센시 / 지역 / 카테고리 검색…",
      filter_all: "전체",
      filter_g1: "G1 신규",
      filter_g2: "G2 격상/종료",
      filter_g3: "G3 장기 운영",
      card_revenue: "Q1 매출",
      card_minimum: "누적 Min %",
      card_compliance: "컴플라이언스",
      card_open: "라이센시 열기",
      summary_total: "총 6개 라이센시",
    },

    /* ===== Calendar full page ===== */
    calendar_page: {
      breadcrumb: "Season Calendar",
      title: "26FW 시즌 캘린더",
      subtitle: "마스터 시간축 · D-180 ~ D+30 · 마일스톤 9개",
      legend_done: "완료",
      legend_active: "진행 중",
      legend_pending: "예정",
      today: "오늘",
      summary_done: (n: number) => `완료 ${n}`,
      summary_active: (n: number) => `진행 ${n}`,
      summary_pending: (n: number) => `예정 ${n}`,
      view_table: "리스트",
      view_timeline: "타임라인",
    },

    /* ===== Inspector ===== */
    inspector: {
      breadcrumb_atelier: "Atelier One",
      breadcrumb_inspector: "Inspector",
      title: "Design Review Workspace",
      subtitle: "Live 데모 · 5 Universal Pillars × §6 검증 공식 × G1 임계값",
      apex_button: "전체 AI-Report 열기",
      step: "Step",
      reset: "데모 초기화",

      step1_label: "Step 1 · Upload",
      step1_title: "디자인 산출물 제출",
      step1_body:
        "라이센시가 CAD/3D/스케치를 업로드하면 ATELIER ONE Inspector가 5 Universal Pillars 기준으로 1차 검수합니다.",
      step1_drop_main: "CAD · 3D · 스케치 · 이미지 파일을 끌어다 놓으세요",
      step1_drop_sub: "지원 포맷: .png .jpg .pdf .ai .psd .obj .glb · 최대 50MB",
      step1_demo_intro: "데모용 샘플 디자인을 사용하시려면",
      step1_start: "데모 시작 →",
      step1_sample_label: "샘플 제출본",
      step1_tenant: "Tenant",
      step1_rules: "검수 규칙",
      step1_threshold: "G1 임계값:",
      step1_threshold_value: "전수 검수 · Brand Director 게이트",

      step2_title: "ATELIER ONE Inspector 검수 중",
      step2_subtitle: "5 Universal Pillars × §6 검증 공식 × G1 임계값 적용",
      step2_phase1: "금지 영역 검사 (Forbidden Zones)",
      step2_phase2: "5 Pillars 평가",
      step2_phase3: "검증 공식 매칭 (§6 시그니쳐 일치도)",
      step2_phase4: "라이센시 그룹별 임계값 적용",
      step2_phase5: "타키니화 대안 생성",
      step2_inprogress: "진행 중",

      step3_label: "Step 3 · Verdict",
      step3_radar: "5 Pillars 점수",
      step3_legend_pass: "통과",
      step3_legend_fail: "미달",
      step3_legend_threshold: "60% 임계",
      step3_violations: "위반 항목",
      step3_violations_count: (n: number) => `위반 항목 ${n}건`,
      step3_view_full: "전체 리포트 보기",
      step3_open_apex: "전체 AI-Report 열기",
      step3_next: "대안 3안 보기",
      step3_closest_signature: "가까운 시그니쳐",
      step3_axis_match: "핵심축 일치도",
      step3_inspected_at: "검수 시각",

      step4_label: "Step 4 · Alternatives",
      step4_title: "타키니화 대안 3안",
      step4_body:
        "ATELIER ONE Studio가 위반 항목별 자동 생성. 모두 적용 시 가장 가까운 시그니쳐 공식과 일치 축이 3 → 5로 도달합니다.",
      step4_before: "Before · 라이센시 제출본",
      step4_after: "After · 3안 모두 적용",
      step4_recovers: "회복:",
      step4_develop_notes: "디벨롭 노트",
      step4_next: "CODEX에 추가 질의",

      step5_label: "Step 5 · Codex Q&A",
      step5_title: "F&F 검수자 + ATELIER ONE",
      step5_body:
        "검수 결과를 함께 보면서 자연어로 추가 질의. CODEX가 5 Pillars 마스터 + §6 검증 공식 + 라이센시 Annex를 RAG로 응답합니다.",
      step5_reviewer: "F&F DESIGN REVIEWER",
      step5_codex: "ATELIER ONE · CODEX",
      step5_show_answer: "ATELIER ONE 답변 보기",
      step5_sources: "출처:",
      step5_progress: (a: number, b: number) =>
        `모든 질문에 답변을 받은 뒤 다음 단계로 (${a}/${b})`,
      step5_done: "모든 답변 확인 완료 ✓",
      step5_next: "의사결정 단계로",

      step6_label: "Step 6 · Decision",
      step6_title: "F&F 디자인 승인 의사결정",
      step6_body:
        "검수 결과·대안·CODEX 답변을 종합한 뒤 라이센시에게 자동 피드백이 송출됩니다.",
      step6_recommended: "RECOMMENDED",
      step6_approve_title: "Approve",
      step6_approve_ko: "승인",
      step6_approve_body: "현재 디자인 그대로 실물 샘플 단계로 진행",
      step6_revise_title: "Revise",
      step6_revise_ko: "수정 요청",
      step6_revise_body: "대안 3안 모두 적용 후 재제출 — Verdict B 격상 후 재검수",
      step6_reject_title: "Reject",
      step6_reject_ko: "반려",
      step6_reject_body: "디자인 단계 재진입 — 핵심 SKU에서 제외하고 처음부터 재기획",
      step6_next_steps: "Auto Trigger · 다음 단계",
      step6_open_apex: "AI-Report 열기",
      step6_back: "데모 처음으로 ↺",
      step6_dashboard: "Dashboard로",
    },

    /* ===== 공통 status ===== */
    status: {
      negotiating: "갱신 협상 중",
      brand_elevation: "Brand Elevation",
      launch: "26FW 런칭",
      extension_request: "5+5년 연장 요청",
      first_year: "신계약 원년",
      ending: "사실상 종료",
      group_g1: "G1 신규",
      group_g2: "G2 격상/종료",
      group_g3: "G3 장기 운영",
    },

    /* ===== Login Gate ===== */
    login: {
      brand_subtitle: "GLOBAL LICENSEE PLATFORM",
      hero_line1: "One Voice.",
      hero_line2: "One Brand.",
      hero_line3: "Tacchini One.",
      hero_body:
        "Sergio Tacchini의 글로벌 라이센시 운영 플랫폼.\n라이센시별 발급된 ID와 Code로 로그인하세요.",
      demo_badge: "DEMO 환경 · 6/9 컨퍼런스 프리뷰",
      title: "Sign in",
      subtitle: "라이센시 ID와 Code를 입력하세요.",
      field_id: "Licensee ID",
      field_id_placeholder: "예: roamin",
      field_code: "Access Code",
      field_code_placeholder: "•••••••",
      button_loading: "로그인 중...",
      button_signin: "로그인",
      err_no_user: "사용자 ID를 찾을 수 없습니다",
      err_bad_code: "비밀번호(Code)가 일치하지 않습니다",
      demo_section: "데모 빠른 로그인",
      demo_roamin_title: "Roamin · Sugi France",
      demo_roamin_subtitle: "Apparel Designer · Licensee 뷰",
      demo_kwon_title: "권은희 차장 · F&F HQ",
      demo_kwon_subtitle: "ST사업부 · 라이센스 담당 (본사 뷰)",
    },

    /* ===== MOVIN Inspector (실데이터 검수) ===== */
    movin: {
      breadcrumb_inspector: "Inspector",
      breadcrumb_licensee: "Sugi France · 27SS",
      header_title: "Sugi France · 27SS Lifestyle Man",
      header_subtitle: "라이센시 PDF 6개 자동 파싱 · 5 Pillars 검수 룰 · Brandbook 2026 기반",
      live_prototype: "LIVE PROTOTYPE",
      step_upload: "1 · Upload",
      step_analyzing: "2 · Analyzing",
      step_result: "3 · Result",
      total_inspected: (n: number) => `${n} SKUs 자동검수 완료`,
      guide_button: "검수 기준 보기",
      back_to_lines: "← 라인 목록",
      reset_flow: "↺ 다시 업로드",

      /* Step 1 — Upload */
      step1_label: "Step 1 · Upload",
      step1_title: "CAD 패키지 업로드",
      step1_body:
        "라이센시가 시즌 패키지(라인별 PDF · 각각 여러 SKU 포함)를 업로드하면 ATELIER ONE이 텍스트 추출 → SKU 분리 → 5 Pillars 자동 검수합니다.",
      drop_main: "CAD · PDF · 이미지 패키지를 끌어다 놓으세요",
      drop_sub:
        "지원 포맷: .pdf .png .jpg .ai .psd · 라인당 1개 PDF 권장 · 라이센시당 최대 1 GB",
      demo_intro: "데모용으로 Sugi France 27SS 실 제출본 사용",
      start_button: "검수 시작 →",
      files_label: (n: number) => `제출된 파일 — ${n} PDFs`,
      file_ready: "Ready",
      file_sku_unit: "SKUs",
      submission_label: "Submission",
      submission_season: "Season",
      submission_category: "Category",
      submission_group: "Group",
      submission_g1: "G1 신규",
      submission_files: "Files",
      submission_size: "Total size",
      submission_skus: "Total SKUs",
      pdfs_unit: "PDFs",
      pieces: "개",
      rules_label: "Auto-Inspection 룰",
      rules_p1: "Italian Tennis Heritage (5 sub)",
      rules_p2: "Elegant Functionalism (6 sub · ×2 가중)",
      rules_p3: "Court-to-Social Lifestyle (4 sub)",
      rules_p4: "Body-Lined Silhouette (5 sub)",
      rules_p5: "Quiet Performance (6 sub)",
      rules_total: "총 26 sub-rules + 8 ABSOLUTE NO · Brandbook 2026 기반",

      /* Step 2 — Analyzing */
      step2_title: "ATELIER ONE · Auto-Inspecting",
      step2_subtitle: (skus: number, lines: number) =>
        `Sugi France 27SS Lifestyle Man · ${skus} SKUs · ${lines} lines`,
      step2_phase1: (n: number) =>
        `${n}개 PDF 파싱 중 (T1_ACE · T1_BAGEL · T1_NET · ...)`,
      step2_phase2: (n: number) =>
        `${n}개 SKU · 소재 비율 · TCX 컬러 코드 추출`,
      step2_phase3: "5 Universal Pillars 적용 (26 sub-rules · Brandbook 2026)",
      step2_phase4: "ABSOLUTE NO 8 검증 · SKU별 Verdict 산출",
      step2_phase5: "라인 등급 + 라이센시 종합 등급 집계",
      step2_inprogress: "진행 중",

      /* Step 3 — Result */
      step3_overall_label: "Licensee Verdict · Submission Summary",
      step3_overall_caption: (skus: number, lines: number, time: string) =>
        `${skus} SKUs · ${lines} lines · 검수: ${time}`,
      stat_avg_score: "평균 등급 점수",
      stat_a_label: "A · Approve",
      stat_b_label: "B · Approve w/ Notes",
      stat_cd_label: "C / D · 수정 필요",
      verdict_distribution: "Verdict Distribution",
      lines_label: "6 LINES · 라인을 클릭하면 SKU 상세를 볼 수 있습니다",
      line_stats_sku: "SKU",
      line_stats_avg: "평균 점수",
      line_pillars_inspected: "5 Pillars 검수 완료",
      line_detail_cta: "SKU 상세 →",
      sku_score_label: "5 Pillars 점수",
      sku_fabric: "fabric",
      sku_colors: "colors",
      sku_more: (n: number) => `+ ${n}건 더보기`,

      /* Verdict 라벨 */
      verdict_a_label: "Approve",
      verdict_b_label: "Approve w/ Notes",
      verdict_c_label: "Minor Revise",
      verdict_d_label: "Major Revise",
    },

    /* ===== 4 End-to-End Flows ===== */
    flows: {
      /* 콘솔 메인 카드 */
      section_label: "ACTIVE FLOWS",
      section_title: "4 End-to-End 운영 플로우",
      section_subtitle:
        "각 플로우는 트리거에서 종료 상태까지 자동·수동 단계가 시퀀스로 연결됩니다.",
      flow_a_title: "매출 보고 → 로열티 정산",
      flow_a_subtitle: "Excel 업로드 → AI 검증 → Dual Verification → 자동 인보이스",
      flow_a_status: "Q1 2027 진행 중 · Sugi France 검증 대기",
      flow_a_progress_label: "Step 4 / 5 — F&F 검증",
      flow_b_title: "시즌 디자인 승인",
      flow_b_subtitle: "F&F 디렉션 → 라이센시 제출 → AI 검수 → 생산 코드",
      flow_b_status: "27FW 진행 · Sugi France 28 SKU 검수 완료",
      flow_b_progress_label: "Step 6 / 14 — F&F 승인 단계",
      flow_c_title: "시즌 계획 제출·승인",
      flow_c_subtitle: "3-C 매출·SKU → 3-A 마케팅 + 3-B 유통 병렬 → 실집행",
      flow_c_status: "27FW · Sugi France 3-C 1차 검토 중",
      flow_c_progress_label: "Phase 1 / 2 — 3-C 매출 승인",
      flow_d_title: "계약 라이프사이클·갱신",
      flow_d_subtitle: "자동 알림 → AI 갱신 인사이트 → 협상 thread → 갱신/종료",
      flow_d_status: "BBUK 만료 D-180 · 갱신 권고",
      flow_d_progress_label: "Step 5 / 12 — Brand Director 검토",
      open_flow: "Flow 열기 →",
      already_live: "라이브 데모",
      next_action: "다음 액션",
      trigger: "트리거",
      involved_parties: "참여 주체",

      /* 공통 step header */
      reset_flow: "↺ 다시 시작",
      back_to_console: "← 콘솔로",

      /* ============== FLOW A · Royalty ============== */
      a: {
        breadcrumb: "Flow A · Royalty",
        header_title: "매출 보고 → 로열티 정산",
        header_subtitle:
          "Sugi France · Q1 2027 · Sales Statement 업로드부터 자동 인보이스 발송까지",
        live_prototype: "LIVE PROTOTYPE",
        step1: "1 · Upload",
        step2: "2 · Validate",
        step3: "3 · Submit",
        step4: "4 · Dual Verify",
        step5: "5 · Invoice",

        /* Step 1 */
        s1_label: "Step 1 · Sales Statement 업로드",
        s1_title: "Q1 2027 매출 데이터 업로드",
        s1_body:
          "라이센시가 분기 마감 후 15영업일 내 Sales Statement Excel을 업로드합니다. 데모용으로 Sugi France의 가상 Q1 데이터를 사용합니다.",
        s1_quarter: "Quarter",
        s1_currency: "Reporting Currency",
        s1_drop_main: "Excel 파일을 끌어다 놓으세요 (.xlsx · .xls)",
        s1_drop_sub: "권장: ST 표준 템플릿 v3 · 최대 10 MB · 시트 1개",
        s1_demo_intro: "데모용 Sugi France Q1 2027 데이터 사용",
        s1_start: "AI 검증 시작 →",
        s1_template: "표준 템플릿 다운로드",

        /* Step 2 */
        s2_label: "Step 2 · AI 자동 검증",
        s2_title: "AI 검증 엔진 작동 중",
        s2_subtitle: (lines: number) => `${lines} 라인 자동 검증 중`,
        s2_phase1: "SKU 매칭 (라이센시 SKU ↔ ST Master DB)",
        s2_phase2: "ECB 환율 검증 (분기 평균 환율 적용)",
        s2_phase3: "Net 검산 (Gross · Discount · Return 일치 여부)",
        s2_phase4: "Royalty 산정 (10% Net Sales)",
        s2_phase5: "Marketing · Advertising Contribution 계산 (각 2%)",

        /* Step 3 */
        s3_label: "Step 3 · 검증 결과 + F&F 제출",
        s3_title: "검증 완료 · F&F 제출 대기",
        s3_lines: "라인 수",
        s3_gross: "Gross Sales",
        s3_net: "Net Sales",
        s3_royalty: "Royalty (10%)",
        s3_marketing: "Marketing (2%)",
        s3_advertising: "Advertising (2%)",
        s3_errors: "오류",
        s3_no_errors: "오류 없음 · 모든 검증 통과",
        s3_submit: "F&F 제출 →",
        s3_lines_label: "Top SKU 매출 (Top 5)",
        s3_validation_summary: "검증 요약",
        s3_check_pass: "통과",
        s3_check_fail: "실패",

        /* Step 4 */
        s4_label: "Step 4 · F&F Dual Verification",
        s4_title: "라이센시 보고값 vs AI 산정값 비교",
        s4_body:
          "F&F 검토자가 라이센시 보고값과 AI 독립 산정값을 비교합니다. 차이가 발생하면 협상 thread로 진행됩니다.",
        s4_compare_title: "Reported · Calculated 비교",
        s4_reported: "라이센시 보고",
        s4_calculated: "AI 산정",
        s4_diff: "차이",
        s4_within_tolerance: "허용 오차 내 (±0.5%) — 양측 합의",
        s4_approve: "양측 합의 승인 →",

        /* Step 5 */
        s5_label: "Step 5 · 자동 인보이스",
        s5_title: "인보이스 자동 발행 + AR 등록",
        s5_body:
          "양측 합의 완료. 시스템이 인보이스 PDF를 자동 생성하고 회계 시스템에 AR 등록합니다.",
        s5_invoice_no: "Invoice No.",
        s5_issue_date: "Issue Date",
        s5_due_date: "Due Date",
        s5_total: "Total",
        s5_recipient: "Recipient",
        s5_breakdown: "내역",
        s5_ar_registered: "회계 AR 등록 완료",
        s5_payment_tracking: "결제 추적 시작",
        s5_history_preserved: "정산 이력 영구 보존 (감사 대비)",
        s5_done: "정산 완료 ✓",
        s5_view_pdf: "Invoice PDF 미리보기",
      },

      /* ============== FLOW C · Plan ============== */
      c: {
        breadcrumb: "Flow C · Season Plan",
        header_title: "시즌 계획 제출·승인",
        header_subtitle:
          "Sugi France · 27FW · 3-C 매출·SKU → 3-A 마케팅 + 3-B 유통 병렬 진행",
        live_prototype: "LIVE PROTOTYPE",
        step1: "1 · 3-C Brief",
        step2: "2 · AI Review",
        step3: "3 · F&F Approve",
        step4: "4 · 3-A + 3-B",
        step5: "5 · Plan Live",

        /* Step 1 — 3-C */
        s1_label: "Phase 1 · 3-C 매출·SKU",
        s1_title: "시즌 매출 + 카테고리 + SKU 계획",
        s1_body:
          "라이센시가 시즌 총 매출 목표 + 카테고리·SKU 분배 + 가격대를 입력합니다. 모든 시즌 계획의 기준점입니다.",
        s1_total_revenue: "Total Revenue Target",
        s1_minimum: "Minimum 대비",
        s1_categories: "Category Allocation",
        s1_sku_count: "SKU Count",
        s1_price_tier: "Price Tier 분포",
        s1_entry: "Entry",
        s1_mid: "Mid",
        s1_premium: "Premium",
        s1_submit_3c: "3-C 제출 → AI 검토 →",

        /* Step 2 — AI Review */
        s2_label: "Phase 1 · AI 검토",
        s2_title: "AI가 3-C 계획을 검토합니다",
        s2_phase1: "Minimum 대비 분석 (계약 Min vs 제안 매출)",
        s2_phase2: "카테고리 분배 합리성 (권역 시장 특성 매칭)",
        s2_phase3: "SKU capacity 검증 (직전 시즌 대비 변화)",
        s2_phase4: "가격대 분포 (Affordable Premium 정합)",
        s2_phase5: "AI 권장 사항 도출",

        /* Step 3 — F&F Approve */
        s3_label: "Phase 1 · F&F ST사업부 + Brand Director 승인",
        s3_title: "검토 결과 + 의사결정",
        s3_ai_recommend: "AI 권장",
        s3_ai_signal_strong: "강한 통과 신호",
        s3_decision_panel: "의사결정",
        s3_approve: "✓ 승인 (3-A · 3-B 활성화)",
        s3_revise: "수정 요청",
        s3_reject: "반려",
        s3_signals: "주요 신호",
        s3_signal_min: "Minimum 110% 제안 — 계약 105% 충족",
        s3_signal_cat: "카테고리 분배 — Apparel 60% (시장 평균 65%)",
        s3_signal_sku: "SKU 78개 — 직전 시즌 70개 대비 +11%",
        s3_signal_price: "Premium 비중 38% — Affordable Premium 정합",

        /* Step 4 — 3-A + 3-B Parallel */
        s4_label: "Phase 2 · 3-A 마케팅 + 3-B 유통 병렬",
        s4_title: "두 영역 병렬 진행",
        s4_body:
          "3-C 승인으로 의존성이 잠금 해제되었습니다. 마케팅·유통 두 영역이 독립적으로 동시 진행됩니다.",
        s4_a_title: "3-A · Marketing",
        s4_a_budget: "Total Budget",
        s4_a_campaigns: "Campaigns",
        s4_a_review: "ROI · 글로벌 정합성 · 권역 충돌 검토",
        s4_a_status: "F&F 마케팅 승인 완료 ✓",
        s4_b_title: "3-B · Distribution",
        s4_b_tier1: "Tier 1 Account",
        s4_b_tier2: "Tier 2 Account",
        s4_b_tier3: "Tier 3 Account",
        s4_b_review: "Tier 분포 · 합리성 · 직전 시즌 대비 검토",
        s4_b_status: "F&F 유통 승인 완료 ✓",
        s4_continue: "최종 등록 →",

        /* Step 5 — Plan Live */
        s5_label: "✓ Plan Live · 실집행 단계",
        s5_title: "전체 시즌 계획 승인 완료",
        s5_body:
          "Distribution Report · Marketing Report 트래킹 대상으로 자동 등록되었습니다. 분기별 Actual 보고가 Plan과 자동 비교됩니다.",
        s5_card_3c: "3-C 매출·SKU",
        s5_card_3a: "3-A Marketing",
        s5_card_3b: "3-B Distribution",
        s5_status_approved: "Approved",
        s5_milestone: "다음 마일스톤",
        s5_milestone_q1: "Q1 Actual vs Plan 보고 (D-0 출시 후)",
        s5_done: "Plan 등록 완료 ✓",
      },

      /* ============== FLOW D · Contract ============== */
      d: {
        breadcrumb: "Flow D · Contract",
        header_title: "계약 라이프사이클·갱신",
        header_subtitle:
          "BBUK · 2022~2026 · 만료 D-180 · 자동 알림부터 협상·갱신까지",
        live_prototype: "LIVE PROTOTYPE",
        step1: "1 · Trigger",
        step2: "2 · AI Insight",
        step3: "3 · Decision",
        step4: "4 · Negotiation",
        step5: "5 · Renewed",

        /* Step 1 — Auto Trigger */
        s1_label: "Step 1 · 자동 알림 트리거",
        s1_title: "계약 만료 D-180 자동 도래",
        s1_body:
          "AX Platform이 시간 기준 자동 트리거. 만료 12·6·3·1개월 시점에 F&F 경영기획·ST사업부·Brand Director 모두에게 알림 + 갱신 인사이트 패키지 자동 첨부.",
        s1_licensee_card: "라이센시 카드",
        s1_contract_no: "Contract No.",
        s1_period: "계약 기간",
        s1_region: "권역",
        s1_category: "카테고리",
        s1_status: "현재 상태",
        s1_expiring: "만료 임박",
        s1_alert_log: "알림 발송 이력",
        s1_alert_d365: "D-365 (12개월 전)",
        s1_alert_d180: "D-180 (6개월 전) · 현재",
        s1_alert_d90: "D-90 (3개월 전) · 예정",
        s1_alert_d30: "D-30 (1개월 전) · 예정",
        s1_alert_sent: "발송 완료",
        s1_alert_pending: "대기",
        s1_run_ai: "AI 갱신 인사이트 생성 →",

        /* Step 2 — AI Insight */
        s2_label: "Step 2 · AI 갱신 인사이트",
        s2_title: "AI 갱신 협상 인사이트 생성",
        s2_phase1: "누적 Minimum 달성률 계산 (3년치)",
        s2_phase2: "매출 성장률 추이 (시즌별·연도별)",
        s2_phase3: "디자인 승인률 + 컴플라이언스 점수",
        s2_phase4: "동급 라이센시 비교 (anonymized)",
        s2_phase5: "추천 협상 포지션 도출",

        /* Step 3 — Insight + Decision */
        s3_label: "Step 3 · 인사이트 검토 + 의사결정",
        s3_title: "AI 추천 + Brand Director 결정",
        s3_perf_label: "성과 지표 (3년 누적)",
        s3_perf_min: "누적 Minimum 달성률",
        s3_perf_growth: "연평균 매출 성장률",
        s3_perf_compliance: "디자인 승인 통과율",
        s3_perf_punctuality: "마감일 준수율",
        s3_ai_panel: "AI 추천 협상 포지션",
        s3_ai_recommend: "갱신 권고",
        s3_ai_reasoning:
          "누적 Min 191% (5년 평균 + 91pt) · Compliance 88% · 마감 92%. 신규 라이센시 발굴 비용 대비 갱신이 합리적.",
        s3_ai_proposal: "제안 조건",
        s3_proposal_term: "5년 갱신 (2026.10 ~ 2031.10)",
        s3_proposal_royalty: "Royalty 5.0% → 5.5% (시장 표준 회복)",
        s3_proposal_min: "Minimum 연 €420k → €550k (+31%)",
        s3_proposal_brand: "Brand Elevation 가이드라인 추가 (소량 한정)",
        s3_decision_label: "BD 의사결정",
        s3_decision_renew: "갱신 의향 → 협상 시작",
        s3_decision_conditional: "조건부 갱신",
        s3_decision_terminate: "종료 검토",

        /* Step 4 — Negotiation Thread */
        s4_label: "Step 4 · 협상 thread",
        s4_title: "F&F Offer ↔ Licensee Counter (버전 관리)",
        s4_body:
          "모든 메시지·조건 변경이 영구 보존됩니다. 합의 시 신규 계약 발효.",
        s4_offer_v1: "F&F Offer v1",
        s4_counter_v1: "BBUK Counter v1",
        s4_offer_v2: "F&F Offer v2",
        s4_agreed: "양측 합의 ✓",
        s4_finalize: "신규 계약 등록 →",

        /* Step 5 — Renewed */
        s5_label: "✓ 신규 계약 발효",
        s5_title: "갱신 완료 · 영구 보존",
        s5_body:
          "신규 계약이 발효되었습니다. 이전 협상 메시지·조건 변경 이력 모두 영구 보존되며 감사 추적이 가능합니다.",
        s5_new_term: "신규 계약 기간",
        s5_new_royalty: "Royalty",
        s5_new_min: "Annual Minimum",
        s5_new_signed: "체결일",
        s5_signed_by: "체결 주체",
        s5_signed_by_value: "권은희 차장 (F&F · ST사업부) · James Whitfield (BBUK · CEO)",
        s5_history_preserved: "협상 이력 영구 보존 (12 messages · 3 versions)",
        s5_audit_trail: "감사 추적 가능",
        s5_done: "갱신 완료 ✓",
      },
    },

    /* ===== Studio (AI 디자인 생성) ===== */
    studio: {
      header_title: "Atelier Studio",
      header_subtitle:
        "AI 디자인 1차 생성 — 트렌드 크롤링 → ST DNA 필터 → 변형 디자인 생성",
      live_prototype: "LIVE PROTOTYPE",
      breadcrumb: "Atelier · Studio",
      total_in_session: (n: number) => `이번 세션 ${n} 디자인 생성`,
      back_to_inspector: "Inspector로 보내기",
      reset_flow: "↺ 새 브리프",

      /* Step indicators */
      step_brief: "1 · Brief",
      step_source: "2 · Source",
      step_filter: "3 · DNA Filter",
      step_curate: "4 · Pick References",
      step_generate: "5 · Generate",
      step_lineup: "6 · Lineup",

      /* Step 1 — Brief */
      step1_label: "Step 1 · Brief",
      step1_title: "시즌 디자인 브리프",
      step1_body:
        "이 시즌의 컨텍스트를 정의하세요. AI가 이 브리프를 바탕으로 트렌드를 수집하고 ST DNA에 맞게 정제합니다.",
      brief_season: "Season",
      brief_category: "Category",
      brief_subcategory: "Item",
      brief_gender: "Target",
      brief_mood: "Mood Keyword",
      brief_count: "Reference Count",
      brief_strictness: "DNA Strictness",
      brief_boldness: "Variant Boldness",
      strictness_low: "관대",
      strictness_high: "엄격",
      boldness_low: "보수",
      boldness_high: "실험",
      start_crawl: "트렌드 크롤링 시작 →",

      /* Step 2 — Source crawl */
      step2_label: "Step 2 · Source",
      step2_title: "마켓·트렌드 이미지 수집 중",
      step2_body: (n: number, sources: number) =>
        `${sources}개 데이터 소스에서 총 ${n}장 수집 중...`,
      step2_sources: "데이터 소스",
      crawled_count: (n: number) => `${n}장 수집 완료`,
      next_dna: "DNA Filter 진행 →",

      /* Step 3 — DNA Filter */
      step3_label: "Step 3 · DNA Filter",
      step3_title: "5 Pillars로 자동 필터링",
      step3_body: (n: number) =>
        `${n}장 모두에 5 Pillars 룰을 적용하여 ST 적합 레퍼런스만 선별합니다.`,
      filter_running: "Filtering...",
      filter_passed: "ST 통과",
      filter_rejected: "ST 미달",
      filter_summary: (passed: number, total: number) =>
        `${total}장 중 ${passed}장이 ST DNA 통과 (${Math.round((passed / total) * 100)}%)`,
      filter_pick_hint: "이미지를 클릭해 레퍼런스로 픽하세요",
      filter_picked_count: (n: number) => `픽 ${n}장`,
      filter_pick_required: "최소 1장 이상 픽하면 다음 단계로 이동할 수 있습니다",
      next_curate: "Pick References →",

      /* Step 4 — Curate */
      step4_label: "Step 4 · Pick References",
      step4_title: "픽한 레퍼런스 확정",
      step4_body:
        "카드를 클릭해 자동 디자인 생성에 사용할 이미지를 체크하세요. 체크된 이미지만 다음 단계에서 변형 생성됩니다.",
      curate_empty:
        "픽된 레퍼런스가 없습니다. Step 3 · DNA Filter로 돌아가 이미지를 픽하세요.",
      curate_check_required: "최소 1장 이상 체크하면 변형 생성으로 넘어갈 수 있습니다",
      checked_of_picked: (checked: number, picked: number) =>
        `체크 ${checked} / 픽 ${picked}장`,
      selected_count: (n: number, max: number) => `선택 ${n} / ${max}장`,
      ai_recommended: "AI 추천",
      pillar_radar: "Pillar Profile",
      generate_variants: "변형 디자인 생성 →",

      /* Step 5 — Generate */
      step5_label: "Step 5 · Generate",
      step5_title: "AI 변형 디자인 생성 중",
      step5_body:
        "선택된 레퍼런스를 ST 기준으로 변형합니다. 각 레퍼런스에서 3가지 변형(보수·균형·실험)이 생성됩니다.",
      generating: "Generating...",
      variant_conservative: "Conservative",
      variant_balanced: "Balanced",
      variant_experimental: "Experimental",
      transform_color: "Color",
      transform_fit: "Fit",
      transform_logo: "Logo",
      transform_fabric: "Fabric",
      transform_heritage: "Heritage",
      next_lineup: "최종 라인업 보기 →",

      /* Step 6 — Lineup */
      step6_label: "Step 6 · Lineup",
      step6_title: "최종 라인업 후보",
      step6_body:
        "생성된 디자인을 5 Pillars로 재검수한 결과입니다. A·B 등급은 라인업 후보로 추천됩니다.",
      lineup_distribution: "등급 분포",
      lineup_recommend_title: "27FW Polo Capsule — 라인업 추천",
      lineup_recommend_body:
        "A·B 등급 디자인을 묶어 시즌 컬렉션을 구성합니다. Inspector로 보내 추가 검수·실물 샘플 단계로 진행하세요.",
      send_to_inspector: "Inspector로 보내기",
      save_library: "라이브러리에 저장",

      /* Reset */
      reset_title: "다시 시작하시겠습니까?",
      reset_body: "현재 세션의 선택과 생성 결과가 초기화됩니다.",
      reset_confirm: "초기화",
      reset_cancel: "취소",
    },

    /* ===== 5 Pillars Guide 페이지 ===== */
    guide: {
      breadcrumb_guide: "Brand Codex · 검수 가이드",
      back_to_inspector: "← Inspector로 돌아가기",
      hero_eyebrow: "AI INSPECTION CRITERIA",
      hero_title: "5 Universal Pillars",
      hero_subtitle:
        "Sergio Tacchini Brandbook 2026 기반 객관 검수 기준. AI가 단계적·정량적으로 평가하는 5개 축.",
      hero_cta_explore: "5 Pillars 둘러보기",
      hero_cta_inspector: "라이브 데모 보기",

      why_label: "WHY THESE 5 PILLARS",
      why_title: "왜 이 5개 축인가?",
      why_body:
        "주관적 디자인 평가가 아닌, 60년 헤리티지 + Brandbook 2026의 모든 디자인 원칙을 5축으로 정량화했습니다. 라이센시·HQ·디자이너 누구나 같은 기준으로 같은 결론에 도달합니다.",
      why_stat_1_value: "26",
      why_stat_1_label: "Sub-Rules (Pillar 세부 검수 규정)",
      why_stat_2_value: "8",
      why_stat_2_label: "ABSOLUTE NO (브랜드북 명시 금지)",
      why_stat_3_value: "2026",
      why_stat_3_label: "Brandbook (글로벌 공식 기준)",
      why_stat_4_value: "100%",
      why_stat_4_label: "재현 가능성 (같은 디자인 → 같은 결과)",

      pillars_label: "THE 5 PILLARS",
      pillars_title: "검수의 5개 축",
      pillar_pass_threshold: "통과 기준",
      pillar_sub_rules_count: (n: number) => `${n}개 sub-rules`,
      pillar_weight: "가중치 ×2",
      pillar_brandbook_quote: "Brandbook 인용",
      pillar_expand: "세부 규정 보기",
      pillar_collapse: "접기",

      process_label: "AI INSPECTION PROCESS",
      process_title: "AI는 이렇게 검수합니다",
      process_body:
        "단순 AI 응답이 아닙니다. 각 단계는 명시적·정량적 룰을 거치며, 사람이 검토 가능한 근거를 남깁니다.",
      process_step1_title: "PDF Parsing",
      process_step1_body: "라이센시 CAD 패키지에서 SKU·소재·컬러 자동 추출",
      process_step2_title: "Composition Check",
      process_step2_body: "P2.4 성분 비율 정량 검증 (Brandbook p.6 표 기준)",
      process_step3_title: "Color Mapping",
      process_step3_body: "P5.1 TCX 컬러 → ST 허용 6색 자동 매핑",
      process_step4_title: "Pillar Scoring",
      process_step4_body: "5축 × sub-rules 적용 → SKU별 0-100점 산출",
      process_step5_title: "Verdict + Report",
      process_step5_body: "Verdict A/B/C/D 등급 → AI-Report 자동 생성",

      objectivity_label: "OBJECTIVITY",
      objectivity_title: "주관 아닌 객관",
      obj_card_1_title: "Brandbook 직접 인용",
      obj_card_1_body:
        "모든 위반에는 Brandbook 페이지·문장이 함께 표시됩니다. 라이센시가 검증·반론 가능.",
      obj_card_2_title: "정량 측정 우선",
      obj_card_2_body:
        "성분 비율(%), 컬러 HEX/HSV, 사이즈(cm) 등 측정 가능한 값으로 1차 판정.",
      obj_card_3_title: "그룹별 차등 임계값",
      obj_card_3_body:
        "G1(신규)·G2(격상)·G3(장기) 라이센시별로 검수 강도가 다릅니다. 일률 적용 ❌.",
      obj_card_4_title: "사람 게이트",
      obj_card_4_body:
        "AI 신뢰도 낮은 항목은 HQ 디자이너가 최종 판단. AI는 의견만 제시.",

      direction_label: "BRAND DIRECTION",
      direction_title: "5 Pillars가 만드는 ST의 미래",
      direction_body:
        "5축은 단순 검수 도구가 아닌, ST의 글로벌 일관성을 만드는 정합 시스템입니다. 라이센시 6개사가 같은 언어로 같은 브랜드를 만들도록.",
      direction_cta: "Inspector 라이브 데모",
    },
  },

  en: {
    common: {
      enter: "Enter",
      open: "Open",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      reset: "Reset",
      view_all: "View all",
      coming_soon: "Coming soon",
      live: "Live",
      preview: "Preview",
      soon: "Soon",
      welcome_back: "Welcome back",
      all_systems: "All systems",
      friday: "Friday",
      may: "May",
      year: "2026",
    },

    sidebar: {
      brand_subtitle: "GLOBAL LICENSEE HUB",
      tenant_org: "F&F HQ",
      tenant_dept: "STE Operations",
      group_operations: "Operations",
      group_atelier: "Atelier One · AI Agent",
      nav_dashboard: "Dashboard",
      nav_licensees: "Licensees",
      nav_royalty: "Royalty",
      nav_design: "Design Reviews",
      nav_calendar: "Season Calendar",
      nav_plans: "Plans",
      nav_contracts: "Contracts",
      nav_inspector: "Inspector",
      nav_studio: "Studio",
      nav_mirror: "Mirror",
      nav_codex: "Codex",
      user_role: "ST Business · License",
      version_label: "v0.4 · CONFERENCE PREVIEW",
      back_to_platform: "Back to TACCHINI ONE Platform",
    },

    door: {
      header_brand_subtitle: "GLOBAL LICENSEE PLATFORM",
      quick_search: "Quick search",
      welcome: "Welcome back",
      hero_line1: "One Voice.",
      hero_line2: "One Brand.",
      hero_line3: "Tacchini One.",
      hero_body:
        "Global licensee operating platform for Sergio Tacchini.\nChoose a module below to start working.",
      pill_active_licensees: "6 Active Licensees",
      pill_awaiting: "2 Awaiting Review",
      pill_q1_royalty: "€ 1.84M Q1 Royalty",
      pill_season: "26FW · D-180",

      workspaces_label: "Workspaces",
      workspaces_title: "Choose a module to enter",
      workspaces_summary: "4 of 6 modules live",

      mod_ops_subtitle: "Operations Console",
      mod_ops_title: "Operations",
      mod_ops_body:
        "Unified monitoring for 6 licensees. KPIs, season calendar D-day, licensee health matrix, and activity feed in one view.",
      mod_ops_stat_licensees: "Licensees",
      mod_ops_stat_compliance: "Compliance",
      mod_ops_stat_pending: "Pending",
      mod_ops_stat_pending_v: "2 reviews",

      mod_atelier_subtitle: "Atelier One — AI Design Agent",
      mod_atelier_title: "Atelier",
      mod_atelier_body:
        "Auto-inspect licensee designs against 5 Universal Pillars. Inspector · Studio · Mirror · Codex — four modules in one workspace.",
      mod_atelier_stat_week: "This week",
      mod_atelier_stat_week_v: "+5 reviews",
      mod_atelier_stat_avg: "Verdict avg",
      mod_atelier_stat_pending: "Awaiting",
      mod_atelier_stat_pending_v: "2 designs",

      mod_royalty_subtitle: "Royalty",
      mod_royalty_title: "Dual Verification",
      mod_royalty_body:
        "Auto-compare licensee report vs AI calculation · Auto-invoice on mutual approval.",
      mod_royalty_stat_q1: "Q1",
      mod_royalty_stat_pending: "Pending",
      mod_royalty_stat_pending_v: "3 awaiting",

      mod_calendar_subtitle: "Season Calendar",
      mod_calendar_title: "26FW · D-180",
      mod_calendar_body: "Season time axis. 11 milestones · per-licensee progress · auto-alerts.",
      mod_calendar_stat_progress: "Progress",
      mod_calendar_stat_next: "Next",

      mod_contracts_subtitle: "Contracts",
      mod_contracts_title: "Lifecycle",
      mod_contracts_body:
        "Expiry · renewal · termination. AI renewal insights (cumulative Min · compliance).",
      mod_contracts_stat_expiring: "Expiring",
      mod_contracts_stat_expiring_v: "2 in 12mo",
      mod_contracts_stat_renewals: "Renewals",
      mod_contracts_stat_renewals_v: "1 active",

      mod_codex_subtitle: "Brand Codex",
      mod_codex_title: "5 Pillars",
      mod_codex_body:
        "Universal Pillars · Category Codex · Licensee Annex — 3-tier RAG.",
      mod_codex_stat_pillars: "Pillars",
      mod_codex_stat_pillars_v: "5 · live",
      mod_codex_stat_annex: "Annex",

      activity_label: "Recent Activity",
      activity_atelier_flagged: "completed inspection",
      activity_benjamin_submitted: "submitted Q1 royalty",
      activity_bds_uploaded: "uploaded 12 designs",
      activity_kwon_drafted: "drafted renewal contract",

      quick_actions_label: "Quick Actions",
      qa_inspector: "Open Inspector Demo",
      qa_inspector_body: "Start the live design review demo",
      qa_apex: "View AI-Report",
      qa_apex_body: "Sugi France 26FW AI review report",
      qa_console: "Operations Console",
      qa_console_body: "Unified dashboard for 6 licensees",

      footer_legal: "© 2026 F&F Co., Ltd. · Sergio Tacchini Brand · Internal preview · Not for distribution.",
      footer_version: "v0.4 · Conference Preview",
    },

    console: {
      breadcrumb_platform: "Platform",
      breadcrumb_hq: "F&F HQ",
      breadcrumb_ste: "STE Operations",
      breadcrumb_dashboard: "Dashboard",
      title: "Global Operations",
      subtitle: "Unified operations for 6 licensees · 26FW season in progress",
      cta_new_review: "New Design Review",

      kpi_licensees: "Active Licensees",
      kpi_licensees_caption: "STE",
      kpi_licensees_delta: "G1·2 · G2·2 · G3·2",
      kpi_royalty: "Q1 Royalty",
      kpi_royalty_caption: "Dual Verified",
      kpi_reviews: "Design Reviews",
      kpi_reviews_caption: "2 awaiting HQ approval",
      kpi_reviews_delta: "+5 this week",
      kpi_compliance: "Pillar Compliance",
      kpi_compliance_caption: "ATELIER ONE avg.",
      kpi_compliance_delta: "+2.1 vs prev",

      season_label: "Season Calendar",
      season_title: "26FW · D-180",
      season_subtitle: "Master time axis · 11 milestones · Latest: F&F season direction published",
      season_open: "Open Calendar",
      season_next: "NEXT",

      pending_label: "Awaiting HQ",
      pending_title: "3 Reviews",
      pending_view_all: "View all",
      pending_open: "Open Inspector Demo →",

      atelier_label: "AI DESIGN AGENT",
      atelier_title: "ATELIER ONE",
      atelier_body:
        "5 Universal Pillars · §6 validated formulas · per-group thresholds. Auto-inspects designs and generates tacchini-style alternatives instantly.",
      atelier_cta: "Open Inspector Live Demo",

      matrix_label: "Operations",
      matrix_title: "6 Licensees · Health Matrix",
      matrix_filter: "Filter",
      matrix_export: "Export",
      th_licensee: "Licensee",
      th_group: "Group",
      th_region: "Region · Category",
      th_revenue: "Q1 Revenue",
      th_minimum: "Cum. Min %",
      th_compliance: "Compliance",
      th_status: "Status",

      revenue_label: "Signature Revenue",
      revenue_title: "Flying Skirt — Season Trend",
      revenue_subtitle: "KR cumulative ₩1.95B · ATELIER ONE validated formula ①",

      activity_label: "Activity",
      activity_title: "Recent Events",
      activity_all: "All",

      /* Season Calendar — 9 milestones */
      milestone_m1_direction:   "F&F season direction published",
      milestone_m2_competitor:  "Licensee competitor data + planning",
      milestone_m3_design:      "Design artifact submission deadline",
      milestone_m4_design_appr: "F&F design approval",
      milestone_m5_plan:        "Next season plan submission",
      milestone_m6_sample:      "Physical sample dispatch",
      milestone_m7_sample_appr: "Sample review + season plan approval",
      milestone_m8_launch:      "Season launch",
      milestone_m9_royalty:     "Quarterly royalty settlement",

      /* Pending Review items */
      review_movin_net:        "27SS Lifestyle Man · NET line (5 SKU)",
      review_movin_full:       "27SS Lifestyle Man · all 28 SKUs auto-inspected",
      review_heritage_demo:    "Heritage Hooded Jacket (prior season demo)",

      /* Time-ago labels */
      time_now:        "just now",
      time_2m:         "2 min ago",
      time_5m:         "5 min ago",
      time_30m:        "30 min ago",
      time_47m:        "47 min ago",
      time_2h:         "2 hrs ago",
      time_yesterday:  "yesterday",

      /* Activity actors + verbs */
      actor_atelier:   "ATELIER ONE",
      actor_benjamin:  "Benjamin",
      actor_bds:       "BDS",
      actor_kwon:      "Eunhee Kwon (F&F)",
      verb_completed_inspection: "completed inspection",
      verb_submitted_royalty:    "submitted Q1 royalty",
      verb_uploaded_designs:     "uploaded 12 designs",
      verb_renewed_draft:        "drafted renewal terms",
      verb_flagged_p5:           "flagged P5 violation",

      /* Licensee table */
      lic_bbuk_region:           "UK · Ireland",
      lic_bbuk_category:         "Apparel + Acc",
      lic_sugi_footwear_region:  "FR · IT · UK · DACH · ME",
      lic_sugi_footwear_category:"Footwear",
      lic_sugi_france_region:    "FR · DACH · Benelux · N. Africa",
      lic_sugi_france_category:  "Apparel",
      lic_benjamin_region:       "Europe · ME · N. Africa",
      lic_benjamin_category:     "Socks · UW · Sleepwear",
      lic_bds_region:            "16 Eastern EU · CIS",
      lic_bds_category:          "Apparel",
      lic_silver_region:         "Italy",
      lic_silver_category:       "Apparel",
      revenue_launching:         "(pre-launch)",

      /* Licensee status pills */
      lic_bbuk_status:           "Renewal in progress",
      lic_sugi_footwear_status:  "Brand Elevation",
      lic_sugi_france_status:    "26FW launch",
      lic_benjamin_status:       "5+5y extension requested",
      lic_bds_status:            "First contract year",
      lic_silver_status:         "Wind-down",
    },

    /* ===== Licensees full page ===== */
    licensees_page: {
      breadcrumb: "Licensees",
      title: "Licensee Directory",
      subtitle: "Unified view of 6 STE licensees · Per-group thresholds applied",
      search_placeholder: "Search licensee / region / category…",
      filter_all: "All",
      filter_g1: "G1 New",
      filter_g2: "G2 Elevate/Exit",
      filter_g3: "G3 Long-running",
      card_revenue: "Q1 Revenue",
      card_minimum: "Cum. Min %",
      card_compliance: "Compliance",
      card_open: "Open Licensee",
      summary_total: "6 licensees total",
    },

    /* ===== Calendar full page ===== */
    calendar_page: {
      breadcrumb: "Season Calendar",
      title: "26FW Season Calendar",
      subtitle: "Master time axis · D-180 to D+30 · 9 milestones",
      legend_done: "Done",
      legend_active: "Active",
      legend_pending: "Pending",
      today: "Today",
      summary_done: (n: number) => `${n} done`,
      summary_active: (n: number) => `${n} active`,
      summary_pending: (n: number) => `${n} pending`,
      view_table: "List",
      view_timeline: "Timeline",
    },

    inspector: {
      breadcrumb_atelier: "Atelier One",
      breadcrumb_inspector: "Inspector",
      title: "Design Review Workspace",
      subtitle: "Live demo · 5 Universal Pillars × §6 validated formulas × G1 thresholds",
      apex_button: "Full AI-Report",
      step: "Step",
      reset: "Reset Demo",

      step1_label: "Step 1 · Upload",
      step1_title: "Submit Design Artifact",
      step1_body:
        "When licensees upload CAD/3D/sketches, ATELIER ONE Inspector performs first-pass review against 5 Universal Pillars.",
      step1_drop_main: "Drop CAD · 3D · sketch · image files here",
      step1_drop_sub: "Supported: .png .jpg .pdf .ai .psd .obj .glb · max 50MB",
      step1_demo_intro: "To use a demo sample design",
      step1_start: "Start Demo →",
      step1_sample_label: "Sample Submission",
      step1_tenant: "Tenant",
      step1_rules: "Inspection Rules",
      step1_threshold: "G1 threshold:",
      step1_threshold_value: "All-design review · Brand Director gate",

      step2_title: "ATELIER ONE Inspector — Inspecting",
      step2_subtitle: "5 Universal Pillars × §6 formulas × G1 threshold applied",
      step2_phase1: "Forbidden Zones check",
      step2_phase2: "5 Pillars evaluation",
      step2_phase3: "Formula matching (§6 signature similarity)",
      step2_phase4: "Group-level threshold applied",
      step2_phase5: "Tacchini-style alternatives generation",
      step2_inprogress: "in progress",

      step3_label: "Step 3 · Verdict",
      step3_radar: "5 Pillars Score",
      step3_legend_pass: "Pass",
      step3_legend_fail: "Below",
      step3_legend_threshold: "60% threshold",
      step3_violations: "Violations",
      step3_violations_count: (n: number) => `${n} Violation${n === 1 ? "" : "s"}`,
      step3_view_full: "View Full Report",
      step3_open_apex: "Open Full AI-Report",
      step3_next: "View 3 Alternatives",
      step3_closest_signature: "Closest Signature",
      step3_axis_match: "Axis match",
      step3_inspected_at: "Inspected at",

      step4_label: "Step 4 · Alternatives",
      step4_title: "3 Tacchini-Style Alternatives",
      step4_body:
        "Auto-generated by ATELIER ONE Studio for each violation. With all three applied, axis match against the closest signature formula climbs from 3 → 5.",
      step4_before: "Before · Licensee submission",
      step4_after: "After · All 3 alternatives applied",
      step4_recovers: "Recovers:",
      step4_develop_notes: "Develop Notes",
      step4_next: "Ask Codex",

      step5_label: "Step 5 · Codex Q&A",
      step5_title: "F&F Reviewer + ATELIER ONE",
      step5_body:
        "Review results together while asking follow-up questions in natural language. CODEX retrieves answers from the 5 Pillars master · §6 formulas · Licensee Annex via RAG.",
      step5_reviewer: "F&F DESIGN REVIEWER",
      step5_codex: "ATELIER ONE · CODEX",
      step5_show_answer: "Show ATELIER ONE answer",
      step5_sources: "Sources:",
      step5_progress: (a: number, b: number) =>
        `Reveal all answers to proceed (${a}/${b})`,
      step5_done: "All answers reviewed ✓",
      step5_next: "Proceed to Decision",

      step6_label: "Step 6 · Decision",
      step6_title: "F&F Design Approval Decision",
      step6_body:
        "Combine inspection results, alternatives, and CODEX answers — auto-feedback is dispatched to the licensee.",
      step6_recommended: "RECOMMENDED",
      step6_approve_title: "Approve",
      step6_approve_ko: "Approve",
      step6_approve_body: "Proceed to physical sample stage as is",
      step6_revise_title: "Revise",
      step6_revise_ko: "Revise",
      step6_revise_body:
        "Apply all 3 alternatives, resubmit — re-inspect at Verdict B level",
      step6_reject_title: "Reject",
      step6_reject_ko: "Reject",
      step6_reject_body:
        "Re-enter design phase — exclude from core SKU, re-plan from scratch",
      step6_next_steps: "Auto Trigger · Next Steps",
      step6_open_apex: "Open AI-Report",
      step6_back: "Restart Demo ↺",
      step6_dashboard: "To Dashboard",
    },

    status: {
      negotiating: "Renewal in negotiation",
      brand_elevation: "Brand Elevation",
      launch: "26FW Launch",
      extension_request: "5+5y extension requested",
      first_year: "First contract year",
      ending: "De facto ending",
      group_g1: "G1 New",
      group_g2: "G2 Elevation/End",
      group_g3: "G3 Long-term",
    },

    /* ===== Login Gate ===== */
    login: {
      brand_subtitle: "GLOBAL LICENSEE PLATFORM",
      hero_line1: "One Voice.",
      hero_line2: "One Brand.",
      hero_line3: "Tacchini One.",
      hero_body:
        "Global licensee operating platform for Sergio Tacchini.\nSign in with the ID and Code assigned to your licensee.",
      demo_badge: "DEMO ENVIRONMENT · 6/9 Conference Preview",
      title: "Sign in",
      subtitle: "Enter your Licensee ID and Access Code.",
      field_id: "Licensee ID",
      field_id_placeholder: "e.g. roamin",
      field_code: "Access Code",
      field_code_placeholder: "•••••••",
      button_loading: "Signing in...",
      button_signin: "Sign in",
      err_no_user: "User ID not found",
      err_bad_code: "Access Code does not match",
      demo_section: "Demo Quick Login",
      demo_roamin_title: "Roamin · Sugi France",
      demo_roamin_subtitle: "Apparel Designer · Licensee view",
      demo_kwon_title: "Eunhee Kwon · F&F HQ",
      demo_kwon_subtitle: "ST Business · License (HQ view)",
    },

    /* ===== MOVIN Inspector (live data) ===== */
    movin: {
      breadcrumb_inspector: "Inspector",
      breadcrumb_licensee: "Sugi France · 27SS",
      header_title: "Sugi France · 27SS Lifestyle Man",
      header_subtitle:
        "6 licensee PDFs auto-parsed · 5 Pillars inspection rules · Brandbook 2026 based",
      live_prototype: "LIVE PROTOTYPE",
      step_upload: "1 · Upload",
      step_analyzing: "2 · Analyzing",
      step_result: "3 · Result",
      total_inspected: (n: number) => `${n} SKUs auto-inspected`,
      guide_button: "Inspection Criteria",
      back_to_lines: "← Back to Lines",
      reset_flow: "↺ Re-upload",

      /* Step 1 — Upload */
      step1_label: "Step 1 · Upload",
      step1_title: "Upload CAD Package",
      step1_body:
        "When a licensee uploads a season package (one PDF per line, multiple SKUs each), ATELIER ONE auto-extracts text → splits SKUs → runs 5 Pillars inspection.",
      drop_main: "Drop CAD · PDF · Image package here",
      drop_sub:
        "Supported: .pdf .png .jpg .ai .psd · 1 PDF per line recommended · max 1 GB per licensee",
      demo_intro: "Demo uses Sugi France's actual 27SS submission",
      start_button: "Start Inspection →",
      files_label: (n: number) => `Submitted Files — ${n} PDFs`,
      file_ready: "Ready",
      file_sku_unit: "SKUs",
      submission_label: "Submission",
      submission_season: "Season",
      submission_category: "Category",
      submission_group: "Group",
      submission_g1: "G1 New",
      submission_files: "Files",
      submission_size: "Total size",
      submission_skus: "Total SKUs",
      pdfs_unit: "PDFs",
      pieces: "",
      rules_label: "Auto-Inspection Rules",
      rules_p1: "Italian Tennis Heritage (5 sub)",
      rules_p2: "Elegant Functionalism (6 sub · ×2 weight)",
      rules_p3: "Court-to-Social Lifestyle (4 sub)",
      rules_p4: "Body-Lined Silhouette (5 sub)",
      rules_p5: "Quiet Performance (6 sub)",
      rules_total: "Total 26 sub-rules + 8 ABSOLUTE NO · Brandbook 2026 based",

      /* Step 2 — Analyzing */
      step2_title: "ATELIER ONE · Auto-Inspecting",
      step2_subtitle: (skus: number, lines: number) =>
        `Sugi France 27SS Lifestyle Man · ${skus} SKUs · ${lines} lines`,
      step2_phase1: (n: number) =>
        `Parsing ${n} PDFs (T1_ACE · T1_BAGEL · T1_NET · ...)`,
      step2_phase2: (n: number) =>
        `Extracting ${n} SKUs · Fabric composition · TCX colors`,
      step2_phase3: "Applying 5 Universal Pillars (26 sub-rules · Brandbook 2026)",
      step2_phase4: "Checking 8 ABSOLUTE NO · Computing per-SKU Verdict",
      step2_phase5: "Aggregating Line grades + Licensee overall grade",
      step2_inprogress: "in progress",

      /* Step 3 — Result */
      step3_overall_label: "Licensee Verdict · Submission Summary",
      step3_overall_caption: (skus: number, lines: number, time: string) =>
        `${skus} SKUs · ${lines} lines · Inspected at ${time}`,
      stat_avg_score: "Average Grade Point",
      stat_a_label: "A · Approve",
      stat_b_label: "B · Approve w/ Notes",
      stat_cd_label: "C / D · Need Revision",
      verdict_distribution: "Verdict Distribution",
      lines_label: "6 LINES · Click a line to see SKU details",
      line_stats_sku: "SKU",
      line_stats_avg: "Avg score",
      line_pillars_inspected: "5 Pillars inspected",
      line_detail_cta: "SKU Detail →",
      sku_score_label: "5 Pillars Score",
      sku_fabric: "fabric",
      sku_colors: "colors",
      sku_more: (n: number) => `+ ${n} more`,

      verdict_a_label: "Approve",
      verdict_b_label: "Approve w/ Notes",
      verdict_c_label: "Minor Revise",
      verdict_d_label: "Major Revise",
    },

    /* ===== 4 End-to-End Flows ===== */
    flows: {
      section_label: "ACTIVE FLOWS",
      section_title: "4 End-to-End Operations Flows",
      section_subtitle:
        "Each flow links automatic and manual steps as a sequence — from trigger to end state.",
      flow_a_title: "Sales → Royalty Settlement",
      flow_a_subtitle: "Excel upload → AI validate → Dual Verification → Auto invoice",
      flow_a_status: "Q1 2027 in progress · Awaiting Sugi France verification",
      flow_a_progress_label: "Step 4 / 5 — F&F verification",
      flow_b_title: "Season Design Approval",
      flow_b_subtitle: "F&F direction → Submission → AI review → Production code",
      flow_b_status: "27FW · Sugi France 28 SKUs reviewed",
      flow_b_progress_label: "Step 6 / 14 — F&F approval",
      flow_c_title: "Season Plan Submission",
      flow_c_subtitle: "3-C Sales/SKU → 3-A Marketing + 3-B Distribution parallel → Live",
      flow_c_status: "27FW · Sugi France 3-C in 1st review",
      flow_c_progress_label: "Phase 1 / 2 — 3-C revenue approval",
      flow_d_title: "Contract Lifecycle · Renewal",
      flow_d_subtitle: "Auto alert → AI insight → Negotiation thread → Renew/End",
      flow_d_status: "BBUK expiring D-180 · Renewal recommended",
      flow_d_progress_label: "Step 5 / 12 — Brand Director review",
      open_flow: "Open Flow →",
      already_live: "Live Demo",
      next_action: "Next action",
      trigger: "Trigger",
      involved_parties: "Involved parties",

      reset_flow: "↺ Restart",
      back_to_console: "← Back to Console",

      a: {
        breadcrumb: "Flow A · Royalty",
        header_title: "Sales → Royalty Settlement",
        header_subtitle:
          "Sugi France · Q1 2027 · From Sales Statement upload to auto invoice dispatch",
        live_prototype: "LIVE PROTOTYPE",
        step1: "1 · Upload",
        step2: "2 · Validate",
        step3: "3 · Submit",
        step4: "4 · Dual Verify",
        step5: "5 · Invoice",

        s1_label: "Step 1 · Sales Statement Upload",
        s1_title: "Upload Q1 2027 sales data",
        s1_body:
          "Licensee uploads Sales Statement Excel within 15 business days after quarter close. Demo uses Sugi France's Q1 2027 simulated data.",
        s1_quarter: "Quarter",
        s1_currency: "Reporting Currency",
        s1_drop_main: "Drop Excel file here (.xlsx · .xls)",
        s1_drop_sub: "Recommended: ST standard template v3 · max 10 MB · single sheet",
        s1_demo_intro: "Use Sugi France Q1 2027 demo data",
        s1_start: "Start AI Validation →",
        s1_template: "Download standard template",

        s2_label: "Step 2 · AI Auto Validation",
        s2_title: "AI validation engine running",
        s2_subtitle: (lines: number) => `Validating ${lines} lines automatically`,
        s2_phase1: "SKU matching (Licensee SKU ↔ ST Master DB)",
        s2_phase2: "ECB FX rate verification (quarter average rate)",
        s2_phase3: "Net check (Gross · Discount · Return reconciliation)",
        s2_phase4: "Royalty calculation (10% Net Sales)",
        s2_phase5: "Marketing · Advertising contribution (2% each)",

        s3_label: "Step 3 · Validation Result + Submit",
        s3_title: "Validation complete · Awaiting F&F submission",
        s3_lines: "Lines",
        s3_gross: "Gross Sales",
        s3_net: "Net Sales",
        s3_royalty: "Royalty (10%)",
        s3_marketing: "Marketing (2%)",
        s3_advertising: "Advertising (2%)",
        s3_errors: "Errors",
        s3_no_errors: "No errors · All checks passed",
        s3_submit: "Submit to F&F →",
        s3_lines_label: "Top SKU Sales (Top 5)",
        s3_validation_summary: "Validation Summary",
        s3_check_pass: "Pass",
        s3_check_fail: "Fail",

        s4_label: "Step 4 · F&F Dual Verification",
        s4_title: "Licensee report vs AI calculated comparison",
        s4_body:
          "F&F reviewer compares the licensee's reported figures against AI's independent calculation. Discrepancies enter a negotiation thread.",
        s4_compare_title: "Reported · Calculated Comparison",
        s4_reported: "Reported",
        s4_calculated: "AI Calc",
        s4_diff: "Diff",
        s4_within_tolerance: "Within tolerance (±0.5%) — Mutual agreement",
        s4_approve: "Approve Mutual Agreement →",

        s5_label: "Step 5 · Auto Invoice",
        s5_title: "Invoice auto-generated + AR registered",
        s5_body:
          "Mutual agreement complete. The system auto-generates the invoice PDF and registers it in the accounting system as AR.",
        s5_invoice_no: "Invoice No.",
        s5_issue_date: "Issue Date",
        s5_due_date: "Due Date",
        s5_total: "Total",
        s5_recipient: "Recipient",
        s5_breakdown: "Breakdown",
        s5_ar_registered: "Accounting AR registered",
        s5_payment_tracking: "Payment tracking started",
        s5_history_preserved: "Settlement history permanently preserved (audit-ready)",
        s5_done: "Settlement Complete ✓",
        s5_view_pdf: "Preview Invoice PDF",
      },

      c: {
        breadcrumb: "Flow C · Season Plan",
        header_title: "Season Plan Submission · Approval",
        header_subtitle:
          "Sugi France · 27FW · 3-C Sales/SKU → 3-A Marketing + 3-B Distribution parallel",
        live_prototype: "LIVE PROTOTYPE",
        step1: "1 · 3-C Brief",
        step2: "2 · AI Review",
        step3: "3 · F&F Approve",
        step4: "4 · 3-A + 3-B",
        step5: "5 · Plan Live",

        s1_label: "Phase 1 · 3-C Sales · SKU",
        s1_title: "Season Revenue + Category + SKU Plan",
        s1_body:
          "Licensee enters total revenue target + category/SKU allocation + price tier mix. The base for all season plans.",
        s1_total_revenue: "Total Revenue Target",
        s1_minimum: "vs Minimum",
        s1_categories: "Category Allocation",
        s1_sku_count: "SKU Count",
        s1_price_tier: "Price Tier Mix",
        s1_entry: "Entry",
        s1_mid: "Mid",
        s1_premium: "Premium",
        s1_submit_3c: "Submit 3-C → AI Review →",

        s2_label: "Phase 1 · AI Review",
        s2_title: "AI is reviewing the 3-C plan",
        s2_phase1: "Minimum analysis (contract Min vs proposed revenue)",
        s2_phase2: "Category allocation rationality (region market fit)",
        s2_phase3: "SKU capacity check (vs prior season)",
        s2_phase4: "Price tier distribution (Affordable Premium fit)",
        s2_phase5: "AI recommendations",

        s3_label: "Phase 1 · F&F ST Business + Brand Director Approval",
        s3_title: "Review Result + Decision",
        s3_ai_recommend: "AI Recommendation",
        s3_ai_signal_strong: "Strong pass signal",
        s3_decision_panel: "Decision",
        s3_approve: "✓ Approve (Activate 3-A · 3-B)",
        s3_revise: "Request Revision",
        s3_reject: "Reject",
        s3_signals: "Key signals",
        s3_signal_min: "Min 110% proposed — exceeds contract 105%",
        s3_signal_cat: "Category mix — Apparel 60% (market avg 65%)",
        s3_signal_sku: "78 SKUs — +11% vs prior season's 70",
        s3_signal_price: "Premium 38% — Affordable Premium fit",

        s4_label: "Phase 2 · 3-A Marketing + 3-B Distribution Parallel",
        s4_title: "Two streams running in parallel",
        s4_body:
          "3-C approval unlocked the dependency. Marketing and Distribution proceed independently.",
        s4_a_title: "3-A · Marketing",
        s4_a_budget: "Total Budget",
        s4_a_campaigns: "Campaigns",
        s4_a_review: "ROI · global coherence · region conflict review",
        s4_a_status: "F&F Marketing approved ✓",
        s4_b_title: "3-B · Distribution",
        s4_b_tier1: "Tier 1 Account",
        s4_b_tier2: "Tier 2 Account",
        s4_b_tier3: "Tier 3 Account",
        s4_b_review: "Tier distribution · rationality · vs prior season",
        s4_b_status: "F&F Distribution approved ✓",
        s4_continue: "Final Registration →",

        s5_label: "✓ Plan Live · Execution Phase",
        s5_title: "Full season plan approved",
        s5_body:
          "Auto-registered as Distribution Report · Marketing Report tracking targets. Quarterly Actual reports auto-compared against Plan.",
        s5_card_3c: "3-C Sales · SKU",
        s5_card_3a: "3-A Marketing",
        s5_card_3b: "3-B Distribution",
        s5_status_approved: "Approved",
        s5_milestone: "Next milestone",
        s5_milestone_q1: "Q1 Actual vs Plan report (after D-0 launch)",
        s5_done: "Plan Registered ✓",
      },

      d: {
        breadcrumb: "Flow D · Contract",
        header_title: "Contract Lifecycle · Renewal",
        header_subtitle:
          "BBUK · 2022~2026 · Expiring D-180 · From auto alert through negotiation to renewal",
        live_prototype: "LIVE PROTOTYPE",
        step1: "1 · Trigger",
        step2: "2 · AI Insight",
        step3: "3 · Decision",
        step4: "4 · Negotiation",
        step5: "5 · Renewed",

        s1_label: "Step 1 · Auto Alert Trigger",
        s1_title: "Contract expiry D-180 auto-triggered",
        s1_body:
          "AX Platform auto-triggers based on time. At 12·6·3·1 month marks, F&F finance/business/Brand Director all receive alerts with renewal insight package attached.",
        s1_licensee_card: "Licensee Card",
        s1_contract_no: "Contract No.",
        s1_period: "Contract Period",
        s1_region: "Region",
        s1_category: "Category",
        s1_status: "Current Status",
        s1_expiring: "Expiring Soon",
        s1_alert_log: "Alert History",
        s1_alert_d365: "D-365 (12 months)",
        s1_alert_d180: "D-180 (6 months) · Now",
        s1_alert_d90: "D-90 (3 months) · Pending",
        s1_alert_d30: "D-30 (1 month) · Pending",
        s1_alert_sent: "Sent",
        s1_alert_pending: "Pending",
        s1_run_ai: "Generate AI Renewal Insights →",

        s2_label: "Step 2 · AI Renewal Insights",
        s2_title: "AI generating renewal negotiation insights",
        s2_phase1: "Cumulative Minimum achievement (3-year)",
        s2_phase2: "Revenue growth trend (per season · per year)",
        s2_phase3: "Design approval rate + Compliance score",
        s2_phase4: "Peer licensee comparison (anonymized)",
        s2_phase5: "Recommended negotiation position",

        s3_label: "Step 3 · Insight Review + Decision",
        s3_title: "AI Recommendation + Brand Director Decision",
        s3_perf_label: "Performance (3-year cumulative)",
        s3_perf_min: "Cumulative Minimum %",
        s3_perf_growth: "Annual revenue growth",
        s3_perf_compliance: "Design approval rate",
        s3_perf_punctuality: "Deadline adherence",
        s3_ai_panel: "AI Recommended Negotiation Position",
        s3_ai_recommend: "Renew Recommended",
        s3_ai_reasoning:
          "Cumulative Min 191% (5-year average + 91pt) · Compliance 88% · Punctuality 92%. Renewal is rational vs new licensee discovery cost.",
        s3_ai_proposal: "Proposed Terms",
        s3_proposal_term: "5-year renewal (2026.10 ~ 2031.10)",
        s3_proposal_royalty: "Royalty 5.0% → 5.5% (market standard recovery)",
        s3_proposal_min: "Minimum €420k → €550k annually (+31%)",
        s3_proposal_brand: "Brand Elevation guidelines (limited edition)",
        s3_decision_label: "BD Decision",
        s3_decision_renew: "Renew → Start Negotiation",
        s3_decision_conditional: "Conditional Renewal",
        s3_decision_terminate: "Consider Termination",

        s4_label: "Step 4 · Negotiation Thread",
        s4_title: "F&F Offer ↔ Licensee Counter (Versioned)",
        s4_body:
          "All messages and condition changes are permanently preserved. Agreement triggers new contract activation.",
        s4_offer_v1: "F&F Offer v1",
        s4_counter_v1: "BBUK Counter v1",
        s4_offer_v2: "F&F Offer v2",
        s4_agreed: "Mutual Agreement ✓",
        s4_finalize: "Register New Contract →",

        s5_label: "✓ New Contract Activated",
        s5_title: "Renewal Complete · Permanently Preserved",
        s5_body:
          "New contract is now active. All prior negotiation messages and condition changes are permanently preserved with full audit trail.",
        s5_new_term: "New Contract Period",
        s5_new_royalty: "Royalty",
        s5_new_min: "Annual Minimum",
        s5_new_signed: "Signed Date",
        s5_signed_by: "Signed By",
        s5_signed_by_value: "Eunhee Kwon (F&F · ST Business Div.) · James Whitfield (BBUK · CEO)",
        s5_history_preserved: "Negotiation history preserved (12 messages · 3 versions)",
        s5_audit_trail: "Audit trail available",
        s5_done: "Renewal Complete ✓",
      },
    },

    /* ===== Studio (AI design generation) ===== */
    studio: {
      header_title: "Atelier Studio",
      header_subtitle:
        "AI design first-pass — Trend crawl → ST DNA filter → Variant generation",
      live_prototype: "LIVE PROTOTYPE",
      breadcrumb: "Atelier · Studio",
      total_in_session: (n: number) => `${n} designs generated this session`,
      back_to_inspector: "Send to Inspector",
      reset_flow: "↺ New brief",

      step_brief: "1 · Brief",
      step_source: "2 · Source",
      step_filter: "3 · DNA Filter",
      step_curate: "4 · Pick References",
      step_generate: "5 · Generate",
      step_lineup: "6 · Lineup",

      /* Step 1 */
      step1_label: "Step 1 · Brief",
      step1_title: "Season Design Brief",
      step1_body:
        "Define this season's context. AI will use this brief to crawl trends and refine them to match ST DNA.",
      brief_season: "Season",
      brief_category: "Category",
      brief_subcategory: "Item",
      brief_gender: "Target",
      brief_mood: "Mood Keyword",
      brief_count: "Reference Count",
      brief_strictness: "DNA Strictness",
      brief_boldness: "Variant Boldness",
      strictness_low: "Inclusive",
      strictness_high: "Strict",
      boldness_low: "Conservative",
      boldness_high: "Experimental",
      start_crawl: "Start Trend Crawl →",

      /* Step 2 */
      step2_label: "Step 2 · Source",
      step2_title: "Crawling Market & Trend Images",
      step2_body: (n: number, sources: number) =>
        `Collecting ${n} images from ${sources} data sources...`,
      step2_sources: "Data Sources",
      crawled_count: (n: number) => `${n} images collected`,
      next_dna: "Proceed to DNA Filter →",

      /* Step 3 */
      step3_label: "Step 3 · DNA Filter",
      step3_title: "Auto-filtering by 5 Pillars",
      step3_body: (n: number) =>
        `Applying 5 Pillars rules to all ${n} images to select ST-aligned references.`,
      filter_running: "Filtering...",
      filter_passed: "ST Passed",
      filter_rejected: "ST Rejected",
      filter_summary: (passed: number, total: number) =>
        `${passed} of ${total} passed ST DNA filter (${Math.round((passed / total) * 100)}%)`,
      filter_pick_hint: "Click images to pick as references",
      filter_picked_count: (n: number) => `${n} picked`,
      filter_pick_required: "Pick at least one image to continue",
      next_curate: "Pick References →",

      /* Step 4 */
      step4_label: "Step 4 · Pick References",
      step4_title: "Confirm Picked References",
      step4_body:
        "Click cards to check the images you want to use for auto design generation. Only checked images will be sent to the next step.",
      curate_empty:
        "No references picked yet. Go back to Step 3 · DNA Filter to pick images.",
      curate_check_required: "Check at least one image to proceed to variant generation",
      checked_of_picked: (checked: number, picked: number) =>
        `${checked} checked / ${picked} picked`,
      selected_count: (n: number, max: number) => `Selected ${n} / ${max}`,
      ai_recommended: "AI Recommended",
      pillar_radar: "Pillar Profile",
      generate_variants: "Generate Variants →",

      /* Step 5 */
      step5_label: "Step 5 · Generate",
      step5_title: "AI Generating Variants",
      step5_body:
        "Transforming selected references against ST criteria. Three variants (Conservative · Balanced · Experimental) per reference.",
      generating: "Generating...",
      variant_conservative: "Conservative",
      variant_balanced: "Balanced",
      variant_experimental: "Experimental",
      transform_color: "Color",
      transform_fit: "Fit",
      transform_logo: "Logo",
      transform_fabric: "Fabric",
      transform_heritage: "Heritage",
      next_lineup: "See Final Lineup →",

      /* Step 6 */
      step6_label: "Step 6 · Lineup",
      step6_title: "Final Lineup Candidates",
      step6_body:
        "Generated designs re-inspected against 5 Pillars. A/B grades are recommended for the season capsule.",
      lineup_distribution: "Grade Distribution",
      lineup_recommend_title: "27FW Polo Capsule — Lineup Recommendation",
      lineup_recommend_body:
        "A/B grade designs bundled into a season collection. Send to Inspector for further review and physical sampling.",
      send_to_inspector: "Send to Inspector",
      save_library: "Save to Library",

      reset_title: "Start over?",
      reset_body: "Selections and generated results in this session will be reset.",
      reset_confirm: "Reset",
      reset_cancel: "Cancel",
    },

    /* ===== 5 Pillars Guide page ===== */
    guide: {
      breadcrumb_guide: "Brand Codex · Inspection Guide",
      back_to_inspector: "← Back to Inspector",
      hero_eyebrow: "AI INSPECTION CRITERIA",
      hero_title: "5 Universal Pillars",
      hero_subtitle:
        "Objective inspection criteria based on Sergio Tacchini Brandbook 2026. AI evaluates 5 axes step-by-step, quantitatively.",
      hero_cta_explore: "Explore the 5 Pillars",
      hero_cta_inspector: "See Live Demo",

      why_label: "WHY THESE 5 PILLARS",
      why_title: "Why these 5 axes?",
      why_body:
        "Not subjective design judgment — 60 years of heritage + every design principle in Brandbook 2026, quantified into 5 axes. Licensees, HQ, and designers reach the same conclusion from the same criteria.",
      why_stat_1_value: "26",
      why_stat_1_label: "Sub-Rules (Pillar detailed inspection rules)",
      why_stat_2_value: "8",
      why_stat_2_label: "ABSOLUTE NO (Brandbook explicit prohibitions)",
      why_stat_3_value: "2026",
      why_stat_3_label: "Brandbook (Global official baseline)",
      why_stat_4_value: "100%",
      why_stat_4_label: "Reproducibility (same design → same result)",

      pillars_label: "THE 5 PILLARS",
      pillars_title: "The 5 Inspection Axes",
      pillar_pass_threshold: "Pass threshold",
      pillar_sub_rules_count: (n: number) => `${n} sub-rules`,
      pillar_weight: "Weight ×2",
      pillar_brandbook_quote: "Brandbook quote",
      pillar_expand: "View sub-rules",
      pillar_collapse: "Collapse",

      process_label: "AI INSPECTION PROCESS",
      process_title: "Here's how AI inspects",
      process_body:
        "Not just an AI response — each step passes through explicit, quantitative rules and leaves a human-reviewable trail.",
      process_step1_title: "PDF Parsing",
      process_step1_body: "Auto-extract SKUs, fabric, colors from licensee CAD package",
      process_step2_title: "Composition Check",
      process_step2_body: "P2.4 composition % quantitative check (Brandbook p.6 table)",
      process_step3_title: "Color Mapping",
      process_step3_body: "P5.1 TCX color → auto-map to ST 6 allowed colors",
      process_step4_title: "Pillar Scoring",
      process_step4_body: "Apply 5 axes × sub-rules → per-SKU 0-100 score",
      process_step5_title: "Verdict + Report",
      process_step5_body: "Verdict A/B/C/D grade → auto-generate AI-Report",

      objectivity_label: "OBJECTIVITY",
      objectivity_title: "Objective, not subjective",
      obj_card_1_title: "Direct Brandbook citation",
      obj_card_1_body:
        "Every violation includes the Brandbook page and sentence. Licensees can verify and contest.",
      obj_card_2_title: "Quantitative first",
      obj_card_2_body:
        "Composition %, color HEX/HSV, size (cm) — measurable values for first-pass judgment.",
      obj_card_3_title: "Group-tiered thresholds",
      obj_card_3_body:
        "G1 (new) · G2 (elevation) · G3 (long-term) — inspection strictness differs by licensee group. No one-size-fits-all.",
      obj_card_4_title: "Human gate",
      obj_card_4_body:
        "Low-confidence items go to HQ designer for final judgment. AI provides opinion only.",

      direction_label: "BRAND DIRECTION",
      direction_title: "Where 5 Pillars take ST",
      direction_body:
        "More than inspection — a coherence system that builds ST's global consistency. 6 licensees, one language, one brand.",
      direction_cta: "Inspector Live Demo",
    },
  },
};

export type Dictionary = typeof dictionary.ko;
