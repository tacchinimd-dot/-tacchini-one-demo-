/* ============================================================
 * ApparelIcon — 카테고리별 단순화된 실루엣 SVG
 * Studio mock 디자인 카드에서 사용 (실제 이미지 대용)
 * ============================================================ */

export type ApparelType =
  | "polo"
  | "track-jacket"
  | "pants"
  | "skirt"
  | "vest"
  | "dress"
  | "t-shirt"
  | "shorts";

interface Props {
  type: ApparelType;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function ApparelIcon({
  type,
  size = 80,
  color = "currentColor",
  strokeWidth = 1.5,
}: Props) {
  const stroke = color;
  const fill = "none";

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill,
    stroke,
    strokeWidth,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };

  switch (type) {
    case "polo":
      return (
        <svg {...common}>
          <path d="M 25 30 L 35 22 L 42 28 L 50 22 L 58 28 L 65 22 L 75 30 L 80 50 L 75 55 L 75 90 L 25 90 L 25 55 L 20 50 Z" />
          <line x1="50" y1="22" x2="50" y2="55" />
          <line x1="45" y1="35" x2="50" y2="45" />
          <line x1="55" y1="35" x2="50" y2="45" />
        </svg>
      );
    case "track-jacket":
      return (
        <svg {...common}>
          <path d="M 25 25 L 35 18 L 42 24 L 50 22 L 58 24 L 65 18 L 75 25 L 82 50 L 76 56 L 76 92 L 24 92 L 24 56 L 18 50 Z" />
          <line x1="50" y1="22" x2="50" y2="92" />
          <line x1="44" y1="35" x2="44" y2="78" />
          <line x1="56" y1="35" x2="56" y2="78" />
          <circle cx="50" cy="40" r="1.5" fill={stroke} />
          <circle cx="50" cy="55" r="1.5" fill={stroke} />
          <circle cx="50" cy="70" r="1.5" fill={stroke} />
        </svg>
      );
    case "t-shirt":
      return (
        <svg {...common}>
          <path d="M 25 28 L 35 22 L 42 28 L 58 28 L 65 22 L 75 28 L 80 48 L 75 53 L 75 90 L 25 90 L 25 53 L 20 48 Z" />
          <path d="M 42 28 Q 50 36 58 28" />
        </svg>
      );
    case "vest":
      return (
        <svg {...common}>
          <path d="M 30 25 L 38 22 L 50 26 L 62 22 L 70 25 L 72 50 L 70 92 L 30 92 L 28 50 Z" />
          <line x1="50" y1="26" x2="50" y2="92" />
          <line x1="44" y1="35" x2="44" y2="80" />
        </svg>
      );
    case "dress":
      return (
        <svg {...common}>
          <path d="M 30 25 L 38 22 L 42 26 L 58 26 L 62 22 L 70 25 L 73 45 L 80 92 L 20 92 L 27 45 Z" />
          <line x1="40" y1="55" x2="40" y2="92" strokeDasharray="2 3" />
          <line x1="50" y1="55" x2="50" y2="92" strokeDasharray="2 3" />
          <line x1="60" y1="55" x2="60" y2="92" strokeDasharray="2 3" />
        </svg>
      );
    case "skirt":
      return (
        <svg {...common}>
          <path d="M 30 30 L 70 30 L 80 90 L 20 90 Z" />
          <line x1="35" y1="40" x2="30" y2="88" strokeDasharray="2 3" />
          <line x1="45" y1="40" x2="42" y2="88" strokeDasharray="2 3" />
          <line x1="55" y1="40" x2="58" y2="88" strokeDasharray="2 3" />
          <line x1="65" y1="40" x2="70" y2="88" strokeDasharray="2 3" />
        </svg>
      );
    case "pants":
      return (
        <svg {...common}>
          <path d="M 30 20 L 70 20 L 72 30 L 68 60 L 65 92 L 55 92 L 52 55 L 48 55 L 45 92 L 35 92 L 32 60 L 28 30 Z" />
          <line x1="50" y1="20" x2="50" y2="55" />
        </svg>
      );
    case "shorts":
      return (
        <svg {...common}>
          <path d="M 28 28 L 72 28 L 74 38 L 70 70 L 60 70 L 55 50 L 50 50 L 45 70 L 30 70 L 26 38 Z" />
          <line x1="50" y1="28" x2="50" y2="50" />
        </svg>
      );
    default:
      return null;
  }
}
