/* ============================================================
 * movin-data.ts — AUTO-GENERATED · DO NOT EDIT BY HAND
 *
 * Source: LIFESTYLE MAN / 6 CAD PDFs
 * Built:  2026-05-13T07:48:32.138Z
 * Lines:  6
 * Total SKUs: 28
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

export const MOVIN_LINES: MovinLine[] = [
  {
    "file": "T1_ACE.pdf",
    "sizeMB": 4.4,
    "line": "ACE",
    "season": "SPRING SUMMER 2027",
    "seasonCode": "27SS",
    "gender": "MAN",
    "skuCount": 5,
    "skus": [
      {
        "code": "42020",
        "name": "ACE TRACK JACKET",
        "fabricRaw": "NYLON STRETCH DRY TOUCH 88% PA 12% EA · LINING JERSEY",
        "composition": {
          "PA": 88,
          "EA": 12
        },
        "colors": [],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 75,
          "P2": 100,
          "P3": 75,
          "P4": 75,
          "P5": 83
        },
        "violations": [],
        "verdict": "B",
        "weightedAvg": 84.7
      },
      {
        "code": "42021",
        "name": "ACE SHIRT",
        "fabricRaw": "COTTON PIQUET 40/2",
        "composition": {},
        "colors": [],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 83
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          }
        ],
        "verdict": "C",
        "weightedAvg": 73
      },
      {
        "code": "42019",
        "name": "ACE PANTS",
        "fabricRaw": "NYLON STRETCH DRY TOUCH 88% PA 12% EA · LINING JERSEY",
        "composition": {
          "PA": 88,
          "EA": 12
        },
        "colors": [
          "GARDENIA",
          "NAVY PEONY",
          "FOREST BIOME",
          "NAVY",
          "ADRENALINE RUSH"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 92,
          "P3": 75,
          "P4": 75,
          "P5": 78
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: 합성섬유 40-75% / 실제 88% (브랜드북 가이드 — 의무 아님)"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: ADRENALINE RUSH"
          },
          {
            "rule": "P5.2 No Strong/Bright",
            "severity": "mid",
            "issue": "Bright/Neon 위험 컬러 1건: ADRENALINE RUSH"
          }
        ],
        "verdict": "B",
        "weightedAvg": 77.8,
        "colorClassification": [
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "NAVY PEONY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "FOREST BIOME",
            "stCategory": "FOREST GREEN",
            "isAllowed": true
          },
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "ADRENALINE RUSH",
            "stCategory": null,
            "isAllowed": false,
            "risk": "ADRENALINE"
          }
        ]
      },
      {
        "code": "42018",
        "name": "ACE BERMUDA",
        "fabricRaw": "NYLON STRETCH DRY TOUCH 88% PA 12% EA · LINING JERSEY",
        "composition": {
          "PA": 88,
          "EA": 12
        },
        "colors": [
          "ADRENALINE RUSH",
          "GARDENIA",
          "NAVY PEONY",
          "FOREST BIOME",
          "NAVY"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 92,
          "P3": 75,
          "P4": 75,
          "P5": 78
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: 합성섬유 40-75% / 실제 88% (브랜드북 가이드 — 의무 아님)"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: ADRENALINE RUSH"
          },
          {
            "rule": "P5.2 No Strong/Bright",
            "severity": "mid",
            "issue": "Bright/Neon 위험 컬러 1건: ADRENALINE RUSH"
          }
        ],
        "verdict": "B",
        "weightedAvg": 77.8,
        "colorClassification": [
          {
            "raw": "ADRENALINE RUSH",
            "stCategory": null,
            "isAllowed": false,
            "risk": "ADRENALINE"
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "NAVY PEONY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "FOREST BIOME",
            "stCategory": "FOREST GREEN",
            "isAllowed": true
          },
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42022",
        "name": "ACE GILET",
        "fabricRaw": "TRICOT - JX ELTON CS 2063",
        "composition": {},
        "colors": [
          "NAVY"
        ],
        "inferredCore": "Active Classic",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          }
        ],
        "verdict": "C",
        "weightedAvg": 74.7,
        "colorClassification": [
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          }
        ]
      }
    ],
    "grade": "B",
    "averagePoint": 2.6,
    "distribution": {
      "A": 0,
      "B": 3,
      "C": 2,
      "D": 0
    },
    "totalSKU": 5
  },
  {
    "file": "T1_BAGEL.pdf",
    "sizeMB": 2.1,
    "line": "BAGEL",
    "season": "SPRING SUMMER 2027",
    "seasonCode": "27SS",
    "gender": "MAN",
    "skuCount": 3,
    "skus": [
      {
        "code": "42015",
        "name": "BAGEL SHIRT",
        "fabricRaw": "71% COTTON 25% NYLON 4% SPANDEX · 330 GSM - EFA-AK-000085",
        "composition": {
          "CO": 71,
          "PA": 25,
          "EA": 4
        },
        "colors": [],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 82,
          "P3": 75,
          "P4": 75,
          "P5": 83
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: 합성섬유 40-75% / 실제 25% (브랜드북 가이드 — 의무 아님)"
          },
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: Cotton 15-50% / 실제 71%"
          },
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Athleisure 권장: Elastane 5-15% / 실제 4%"
          }
        ],
        "verdict": "B",
        "weightedAvg": 75.3
      },
      {
        "code": "42016",
        "name": "BAGEL TRICOT TRACKTOP",
        "fabricRaw": null,
        "composition": {},
        "colors": [
          "GARDENIA",
          "FOREST BIOME"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 75,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          }
        ],
        "verdict": "B",
        "weightedAvg": 78,
        "colorClassification": [
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "FOREST BIOME",
            "stCategory": "FOREST GREEN",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42017",
        "name": "BAGEL BERMUDA",
        "fabricRaw": "71% COTTON 25% NYLON 4% SPANDEX · 330 GSM - EFA-AK-000085",
        "composition": {
          "CO": 71,
          "PA": 25,
          "EA": 4
        },
        "colors": [
          "GARDENIA",
          "FOREST BIOME",
          "GARDENIA \t\u001f\u001a\u001e\u001b\u001d\u0018\u001a TCX",
          "NAVY PEONY"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 82,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: 합성섬유 40-75% / 실제 25% (브랜드북 가이드 — 의무 아님)"
          },
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: Cotton 15-50% / 실제 71%"
          },
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Athleisure 권장: Elastane 5-15% / 실제 4%"
          }
        ],
        "verdict": "B",
        "weightedAvg": 77,
        "colorClassification": [
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "FOREST BIOME",
            "stCategory": "FOREST GREEN",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA \t\u001f\u001a\u001e\u001b\u001d\u0018\u001a TCX",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "NAVY PEONY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          }
        ]
      }
    ],
    "grade": "B",
    "averagePoint": 3,
    "distribution": {
      "A": 0,
      "B": 3,
      "C": 0,
      "D": 0
    },
    "totalSKU": 3
  },
  {
    "file": "T1_NET.pdf",
    "sizeMB": 8,
    "line": "NET",
    "season": "SPRING SUMMER 2027",
    "seasonCode": "27SS",
    "gender": "MAN",
    "skuCount": 5,
    "skus": [
      {
        "code": "42023",
        "name": "NET TRACK JACKET",
        "fabricRaw": "FABRIC 1 : CRINCKLE NYLON 66GSM - WM1514 (89%PA 11%PL) · FABRIC 2 : POLY DIAMOND RIPSTOP · FABRIC3 : MESH · LINING : LIGHT POLY: HH-JTY-20241023-4",
        "composition": {
          "PA": 89,
          "PL": 11
        },
        "colors": [
          "BLACK",
          "TURBULENCE",
          "FONDUE FUDGE",
          "DIJON",
          "GARDENIA",
          "SILVER BIRCH"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 75,
          "P2": 96,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Court 권장: Elastane 5-15% / 실제 0%"
          }
        ],
        "verdict": "A",
        "weightedAvg": 85,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "TURBULENCE",
            "stCategory": "QUIET LIGHT BLUE",
            "isAllowed": true
          },
          {
            "raw": "FONDUE FUDGE",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "DIJON",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "SILVER BIRCH",
            "stCategory": "ECRU",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42026",
        "name": "NET VEST JACKET",
        "fabricRaw": "FABRIC 1 : CRINCKLE NYLON 66GSM - WM1514 (89%PA 11%PL) · FABRIC 2 : POLY DIAMOND RIPSTOP · FABRIC3 : MESH · LINING : LIGHT POLY: HH-JTY-20241023-4",
        "composition": {
          "PA": 89,
          "PL": 11
        },
        "colors": [],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 55,
          "P2": 96,
          "P3": 75,
          "P4": 75,
          "P5": 83
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Court 권장: Elastane 5-15% / 실제 0%"
          }
        ],
        "verdict": "B",
        "weightedAvg": 80
      },
      {
        "code": "42027",
        "name": "NET T-SHIRT",
        "fabricRaw": "HEAVY JERSEY 26S",
        "composition": {},
        "colors": [
          "BLACK",
          "TURBULENCE",
          "FONDUE FUDGE",
          "DIJON",
          "GARDENIA",
          "SILVER BIRCH",
          "TURBULENCE \t\u001f\u001e\u001d\u001f\u001a\u001a\u001b TCX"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          }
        ],
        "verdict": "C",
        "weightedAvg": 74.7,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "TURBULENCE",
            "stCategory": "QUIET LIGHT BLUE",
            "isAllowed": true
          },
          {
            "raw": "FONDUE FUDGE",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "DIJON",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "SILVER BIRCH",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "TURBULENCE \t\u001f\u001e\u001d\u001f\u001a\u001a\u001b TCX",
            "stCategory": "QUIET LIGHT BLUE",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42024",
        "name": "NET PANTS",
        "fabricRaw": "FABRIC 1 : CRINCKLE NYLON 66GSM - WM1514 (89%PA 11%PL) · FABRIC 2 : POLY DIAMOND RIPSTOP · FABRIC3 : MESH · LINING : LIGHT POLY: HH-JTY-20241023-4",
        "composition": {
          "PA": 89,
          "PL": 11
        },
        "colors": [
          "BLACK",
          "TURBULENCE",
          "FONDUE FUDGE",
          "DIJON",
          "GARDENIA",
          "SILVER BIRCH"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 55,
          "P2": 96,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Court 권장: Elastane 5-15% / 실제 0%"
          }
        ],
        "verdict": "B",
        "weightedAvg": 81.7,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "TURBULENCE",
            "stCategory": "QUIET LIGHT BLUE",
            "isAllowed": true
          },
          {
            "raw": "FONDUE FUDGE",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "DIJON",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "SILVER BIRCH",
            "stCategory": "ECRU",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42025",
        "name": "NET SHORT",
        "fabricRaw": "FABRIC 1 : CRINCKLE NYLON 66GSM - WM1514 (89%PA 11%PL) · FABRIC 2 : POLY DIAMOND RIPSTOP · FABRIC3 : MESH · LINING : LIGHT POLY: HH-JTY-20241023-4",
        "composition": {
          "PA": 89,
          "PL": 11
        },
        "colors": [
          "BLACK",
          "TURBULENCE",
          "FONDUE FUDGE",
          "DIJON",
          "GARDENIA",
          "SILVER BIRCH",
          "WISTFUL MAUVE",
          "CAMEO BROWN"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 55,
          "P2": 96,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Court 권장: Elastane 5-15% / 실제 0%"
          }
        ],
        "verdict": "B",
        "weightedAvg": 81.7,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "TURBULENCE",
            "stCategory": "QUIET LIGHT BLUE",
            "isAllowed": true
          },
          {
            "raw": "FONDUE FUDGE",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "DIJON",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "SILVER BIRCH",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "WISTFUL MAUVE",
            "stCategory": "MUTED BURGUNDY",
            "isAllowed": true
          },
          {
            "raw": "CAMEO BROWN",
            "stCategory": "BROWN",
            "isAllowed": true
          }
        ]
      }
    ],
    "grade": "B",
    "averagePoint": 3,
    "distribution": {
      "A": 1,
      "B": 3,
      "C": 1,
      "D": 0
    },
    "totalSKU": 5
  },
  {
    "file": "T1_ARCHIVIO.pdf",
    "sizeMB": 10.7,
    "line": "ARCHIVIO",
    "season": "SPRING SUMMER 2027",
    "seasonCode": "27SS",
    "gender": "MAN",
    "skuCount": 4,
    "skus": [
      {
        "code": "42005",
        "name": "DISCOBOLO POLO",
        "fabricRaw": "COTTON PIQUET 40/2 · PLACID BLUE · BEETROT PURPLE · PLACID BLUE · BEETROT PURPLE · BEETROT PURPLE · POPCORN · POPCORN",
        "composition": {},
        "colors": [
          "SPRING BOUQUET",
          "PLACID BLUE",
          "AFRICAN VIOLET",
          "BEETROT PURPLE",
          "NAVY",
          "DRESDEN BLUE",
          "GARDENIA",
          "POPCORN",
          "SKYWAY"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 67
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "high",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: SPRING BOUQUET, PLACID BLUE, AFRICAN VIOLET, BEETROT PURPLE, DRESDEN BLUE, POPCORN, SKYWAY"
          }
        ],
        "verdict": "C",
        "weightedAvg": 70.3,
        "colorClassification": [
          {
            "raw": "SPRING BOUQUET",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "PLACID BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "AFRICAN VIOLET",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "BEETROT PURPLE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "DRESDEN BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "POPCORN",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "SKYWAY",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          }
        ]
      },
      {
        "code": "42008",
        "name": "ALLEYOOP TRACK JKT",
        "fabricRaw": "WRINKLED NYLON (CAPODIMONTE) · LINING MESH",
        "composition": {},
        "colors": [],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 75,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 83
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          }
        ],
        "verdict": "B",
        "weightedAvg": 76.3
      },
      {
        "code": "42007",
        "name": "ALLEYOOP TANK",
        "fabricRaw": "POLY MESH STRETCH FF287 · + POLY INTERLOCK",
        "composition": {},
        "colors": [],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 83
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          }
        ],
        "verdict": "C",
        "weightedAvg": 73
      },
      {
        "code": "42009",
        "name": "ALLEYOOP BERMUDA",
        "fabricRaw": "POLY MESH STRETCH FF287 · + POLY INTERLOCK",
        "composition": {},
        "colors": [
          "ADRENALINE RUSH",
          "GARDENIA",
          "FOREST BIOME",
          "MISTLETOE",
          "NAVY",
          "CAMEO BROWN"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 74
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: ADRENALINE RUSH, MISTLETOE"
          },
          {
            "rule": "P5.2 No Strong/Bright",
            "severity": "mid",
            "issue": "Bright/Neon 위험 컬러 1건: ADRENALINE RUSH"
          }
        ],
        "verdict": "C",
        "weightedAvg": 71.5,
        "colorClassification": [
          {
            "raw": "ADRENALINE RUSH",
            "stCategory": null,
            "isAllowed": false,
            "risk": "ADRENALINE"
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "FOREST BIOME",
            "stCategory": "FOREST GREEN",
            "isAllowed": true
          },
          {
            "raw": "MISTLETOE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "CAMEO BROWN",
            "stCategory": "BROWN",
            "isAllowed": true
          }
        ]
      }
    ],
    "grade": "C",
    "averagePoint": 2.25,
    "distribution": {
      "A": 0,
      "B": 1,
      "C": 3,
      "D": 0
    },
    "totalSKU": 4
  },
  {
    "file": "T1_CHALLENGE.pdf",
    "sizeMB": 85.6,
    "line": "CHALLENGE",
    "season": "SPRING SUMMER 2027",
    "seasonCode": "27SS",
    "gender": "MAN",
    "skuCount": 6,
    "skus": [
      {
        "code": "42011",
        "name": "CHALLENGE PANTS",
        "fabricRaw": "74% POLYESTERE - 15% RAYON · 4% TENCEL - 4% WOOL - 3% SPANDEX",
        "composition": {
          "EA": 3
        },
        "colors": [
          "GARDENIA"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 88,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: 합성섬유 40-75% / 실제 0% (브랜드북 가이드 — 의무 아님)"
          },
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Athleisure 권장: Elastane 5-15% / 실제 3%"
          }
        ],
        "verdict": "B",
        "weightedAvg": 79,
        "colorClassification": [
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42012",
        "name": "CHALLENGE JACKET",
        "fabricRaw": "74% POLYESTERE - 15% RAYON - 4% TENCEL · 4% WOOL - 3% SPANDEX + JERSEY LINING",
        "composition": {
          "EA": 3
        },
        "colors": [
          "GARDENIA"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 88,
          "P3": 75,
          "P4": 75,
          "P5": 93
        },
        "violations": [
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "low",
            "issue": "Active Athleisure 권장: 합성섬유 40-75% / 실제 0% (브랜드북 가이드 — 의무 아님)"
          },
          {
            "rule": "P2.4 Composition — 권장 범위 외",
            "severity": "info",
            "issue": "Active Athleisure 권장: Elastane 5-15% / 실제 3%"
          }
        ],
        "verdict": "B",
        "weightedAvg": 79,
        "colorClassification": [
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42010",
        "name": "CHALLENGE SWEATER HALF ZIP",
        "fabricRaw": "70/30 BRUSHED FLEECE RECYCLED · POPCORN",
        "composition": {},
        "colors": [
          "GARDENIA",
          "MISTLETOE",
          "NAVY",
          "FOREST BIOME",
          "NAVY PEONY",
          "CAMEO BROWN",
          "POPCORN",
          "BLACK"
        ],
        "inferredCore": "Active Classic",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 85
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: MISTLETOE, POPCORN"
          }
        ],
        "verdict": "C",
        "weightedAvg": 73.3,
        "colorClassification": [
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "MISTLETOE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "FOREST BIOME",
            "stCategory": "FOREST GREEN",
            "isAllowed": true
          },
          {
            "raw": "NAVY PEONY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "CAMEO BROWN",
            "stCategory": "BROWN",
            "isAllowed": true
          },
          {
            "raw": "POPCORN",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "42055",
        "name": "CHALLENGE RAYON SHIRT",
        "fabricRaw": "70% RAYON 30% POLYAMMIDE 180 GSM",
        "composition": {},
        "colors": [
          "BLACK",
          "MOJAVE DESERT"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 77
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: MOJAVE DESERT"
          }
        ],
        "verdict": "C",
        "weightedAvg": 72,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "MOJAVE DESERT",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          }
        ]
      },
      {
        "code": "42057",
        "name": "CHALLENGE RAYON TRACK JACKET",
        "fabricRaw": "70% RAYON 30% POLYAMMIDE 180 GSM",
        "composition": {},
        "colors": [
          "BLACK",
          "MOJAVE DESERT"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 75,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 77
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: MOJAVE DESERT"
          }
        ],
        "verdict": "B",
        "weightedAvg": 75.3,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "MOJAVE DESERT",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          }
        ]
      },
      {
        "code": "42056",
        "name": "CHALLENGE RAYON PANTS",
        "fabricRaw": "70% RAYON 30% POLYAMMIDE 180 GSM · ZINFANDEL · ZINFANDEL · ZINFANDEL",
        "composition": {},
        "colors": [
          "BLACK",
          "MOJAVE DESERT",
          "NAVY",
          "ZINFANDEL",
          "CAMEO BROWN"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 80
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: MOJAVE DESERT, ZINFANDEL"
          }
        ],
        "verdict": "C",
        "weightedAvg": 72.5,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "MOJAVE DESERT",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "ZINFANDEL",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "CAMEO BROWN",
            "stCategory": "BROWN",
            "isAllowed": true
          }
        ]
      }
    ],
    "grade": "B",
    "averagePoint": 2.5,
    "distribution": {
      "A": 0,
      "B": 3,
      "C": 3,
      "D": 0
    },
    "totalSKU": 6
  },
  {
    "file": "T1_ESSENTIALS PLUS.pdf",
    "sizeMB": 319.7,
    "line": "ESSENTIALS PLUS",
    "season": "SPRING SUMMER 2027",
    "seasonCode": "27SS",
    "gender": "MAN",
    "skuCount": 5,
    "skus": [
      {
        "code": "42002",
        "name": "COURT T-SHIRT",
        "fabricRaw": "HEAVY JERSEY 26S",
        "composition": {},
        "colors": [],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 83
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          }
        ],
        "verdict": "C",
        "weightedAvg": 73
      },
      {
        "code": "42003",
        "name": "GRAFFITI T-SHIRT",
        "fabricRaw": "HEAVY JERSEY 26S \t42004 MOKA T-SHIRT · HEAVY JERSEY 26S · PEACH MELBA · PLACID BLUE · ZINFANDEL · SIMBA CO T-SHIRT · Recycled Fleece · PEACH MELBA \t\u001f\u001d\u001b\u001e\u0016\u001d\u0017 TCX · POPCORN · POPCORN · SPRING SUMMER 2027 \tESSENTIALS PLUS",
        "composition": {},
        "colors": [
          "BLACK",
          "BLACK \t\u001f\u001c\u001b\u001a\u001c\u001f\u001f TCX",
          "GARDENIA",
          "OLD GOLD",
          "FOREST BIOME",
          "PEACH MELBA",
          "VERMILLION",
          "NAVY PEONY",
          "PLACID BLUE",
          "NAVY",
          "DRESDEN BLUE",
          "ZINFANDEL",
          "SALSA",
          "NAVY \t\u001f\u001e\u001d\u001d",
          "GARDENIA \t\u001f\u001f\u001b\u001e\u0019\u001e\u0018 TCX",
          "LAVENDER BLUE",
          "PEACH MELBA \t\u001f\u001d\u001b\u001e\u0016\u001d\u0017 TCX",
          "POPCORN",
          "MISTLETOE",
          "SUN ORANGE"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 65
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "high",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: OLD GOLD, PEACH MELBA, VERMILLION, PLACID BLUE, DRESDEN BLUE, ZINFANDEL, SALSA, LAVENDER BLUE, PEACH MELBA \t\u001f\u001d\u001b\u001e\u0016\u001d\u0017 TCX, POPCORN, MISTLETOE, SUN ORANGE"
          },
          {
            "rule": "P5.2 No Strong/Bright",
            "severity": "mid",
            "issue": "Bright/Neon 위험 컬러 1건: SUN ORANGE"
          }
        ],
        "verdict": "C",
        "weightedAvg": 70,
        "colorClassification": [
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "BLACK \t\u001f\u001c\u001b\u001a\u001c\u001f\u001f TCX",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "OLD GOLD",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "FOREST BIOME",
            "stCategory": "FOREST GREEN",
            "isAllowed": true
          },
          {
            "raw": "PEACH MELBA",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "VERMILLION",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY PEONY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "PLACID BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "DRESDEN BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "ZINFANDEL",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "SALSA",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY \t\u001f\u001e\u001d\u001d",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA \t\u001f\u001f\u001b\u001e\u0019\u001e\u0018 TCX",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "LAVENDER BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "PEACH MELBA \t\u001f\u001d\u001b\u001e\u0016\u001d\u0017 TCX",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "POPCORN",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "MISTLETOE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "SUN ORANGE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "ORANGE"
          }
        ]
      },
      {
        "code": "40842",
        "name": "NAYLA 024 CAP",
        "fabricRaw": "Nylon Wrinkle",
        "composition": {},
        "colors": [
          "NAVY",
          "GARDENIA",
          "BLACK",
          "MYKONOS BLUE"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 85
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: MYKONOS BLUE"
          }
        ],
        "verdict": "C",
        "weightedAvg": 73.3,
        "colorClassification": [
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "MYKONOS BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          }
        ]
      },
      {
        "code": "40843",
        "name": "NAYLA 024 TRACKTOP",
        "fabricRaw": "Nylon Wrinkle",
        "composition": {},
        "colors": [
          "NAVY",
          "GARDENIA",
          "BLACK",
          "LAVENDER BLUE",
          "NAVY PEONY"
        ],
        "inferredCore": "Active Court",
        "pillarScores": {
          "P1": 75,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 87
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "mid",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: LAVENDER BLUE"
          }
        ],
        "verdict": "B",
        "weightedAvg": 77,
        "colorClassification": [
          {
            "raw": "NAVY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "LAVENDER BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "NAVY PEONY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          }
        ]
      },
      {
        "code": "40844",
        "name": "NAYLA 024 PANTS",
        "fabricRaw": "Nylon Wrinkle · MAGENTA PURPLE · MAGENTA PURPLE · POPCORN · POPCORN · MAGENTA PURPLE \t\u001f\u001e\u001d\u001d · POPCORN · SPRING SUMMER 2027 \tESSENTIALS PLUS · Recycled Fleece · SIMBA SWEATER · Recycled Fleece · SIMBA HOODIE SWEATER · Recycled Fleece\tSIMBA FLEECE PANTS · Recycled Fleece · SIMBA FLEECE BERMUDA · PEACH MELBA · POPCORN · PEACH MELBA · POPCORN · PEACH MELBA · POPCORN · PEACH MELBA · POPCORN",
        "composition": {},
        "colors": [
          "MAGENTA PURPLE",
          "WISTFUL MAUVE",
          "NAVY PEONY",
          "MISTLETOE",
          "POPCORN",
          "LAVENDER BLUE",
          "MAGENTA PURPLE \t\u001f\u001e\u001d\u001d",
          "GARDENIA",
          "BLACK",
          "LAVENDER BLUE \t\u001f\u001f\u001b\u001e\u0019\u001e\u0018 TCX",
          "PEACH MELBA"
        ],
        "inferredCore": "Active Athleisure",
        "pillarScores": {
          "P1": 55,
          "P2": 75,
          "P3": 75,
          "P4": 75,
          "P5": 55
        },
        "violations": [
          {
            "rule": "P2.4 Composition Std.",
            "severity": "info",
            "issue": "소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 권장"
          },
          {
            "rule": "P5.1 Quiet Luxury Color",
            "severity": "high",
            "issue": "ST 허용 6색군에 매칭되지 않는 컬러: MAGENTA PURPLE, MISTLETOE, POPCORN, LAVENDER BLUE, MAGENTA PURPLE \t\u001f\u001e\u001d\u001d, LAVENDER BLUE \t\u001f\u001f\u001b\u001e\u0019\u001e\u0018 TCX, PEACH MELBA"
          },
          {
            "rule": "P5.2 No Strong/Bright",
            "severity": "high",
            "issue": "Bright/Neon 위험 컬러 2건: MAGENTA PURPLE, MAGENTA PURPLE \t\u001f\u001e\u001d\u001d"
          }
        ],
        "verdict": "D",
        "weightedAvg": 68.3,
        "colorClassification": [
          {
            "raw": "MAGENTA PURPLE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "MAGENTA"
          },
          {
            "raw": "WISTFUL MAUVE",
            "stCategory": "MUTED BURGUNDY",
            "isAllowed": true
          },
          {
            "raw": "NAVY PEONY",
            "stCategory": "DEEP NAVY",
            "isAllowed": true
          },
          {
            "raw": "MISTLETOE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "POPCORN",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "LAVENDER BLUE",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "MAGENTA PURPLE \t\u001f\u001e\u001d\u001d",
            "stCategory": null,
            "isAllowed": false,
            "risk": "MAGENTA"
          },
          {
            "raw": "GARDENIA",
            "stCategory": "ECRU",
            "isAllowed": true
          },
          {
            "raw": "BLACK",
            "stCategory": "BLACK",
            "isAllowed": true
          },
          {
            "raw": "LAVENDER BLUE \t\u001f\u001f\u001b\u001e\u0019\u001e\u0018 TCX",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          },
          {
            "raw": "PEACH MELBA",
            "stCategory": null,
            "isAllowed": false,
            "risk": "unclassified"
          }
        ]
      }
    ],
    "grade": "C",
    "averagePoint": 1.8,
    "distribution": {
      "A": 0,
      "B": 1,
      "C": 3,
      "D": 1
    },
    "totalSKU": 5
  }
];

export const MOVIN_OVERALL = {
  "licensee": "Sugi France",
  "licenseeNote": "Apparel · G1 라이센시 · 27SS 시즌 패키지 (이전 MOVIN 명칭)",
  "season": "27SS",
  "category": "Lifestyle Man",
  "generatedAt": "2026-05-13T07:48:32.139Z",
  "totalLines": 6,
  "totalSKU": 28,
  "grade": "B",
  "averagePoint": 2.5,
  "distribution": {
    "A": 1,
    "B": 14,
    "C": 12,
    "D": 1
  }
};
