/* ============================================================
 * KpiCard — Dashboard 헤드라인 KPI
 * ============================================================ */

interface Props {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean; neutral?: boolean };
  caption?: string;
  accent?: string;
  spark?: number[]; // tiny sparkline
  icon?: React.ReactNode;
}

export default function KpiCard({ label, value, delta, caption, accent, spark, icon }: Props) {
  return (
    <div
      className="card"
      style={{ padding: 20, position: "relative", overflow: "hidden" }}
    >
      {accent && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: accent,
          }}
        />
      )}

      <div className="flex items-start justify-between">
        <div className="t-label">{label}</div>
        {icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--color-canvas-soft)",
              border: "1px solid var(--color-hairline)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: accent || "var(--color-primary)",
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="kpi-value mt-3">{value}</div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {delta && (
            <span
              className="t-mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: delta.neutral
                  ? "var(--color-ink-muted-48)"
                  : delta.positive
                  ? "var(--status-ok)"
                  : "var(--status-bad)",
                background: delta.neutral
                  ? "var(--color-canvas-soft)"
                  : delta.positive
                  ? "rgba(22, 163, 74, 0.10)"
                  : "rgba(220, 38, 38, 0.10)",
                padding: "2px 7px",
                borderRadius: 9999,
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {!delta.neutral && (delta.positive ? "▲" : "▼")} {delta.value}
            </span>
          )}
          {caption && (
            <span style={{ fontSize: 11, color: "var(--color-ink-muted-48)" }}>
              {caption}
            </span>
          )}
        </div>
        {spark && <Sparkline values={spark} accent={accent || "var(--color-primary)"} />}
      </div>
    </div>
  );
}

function Sparkline({ values, accent }: { values: number[]; accent: string }) {
  if (values.length < 2) return null;
  const w = 80;
  const h = 26;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const pts = values
    .map((v, i) => `${(i * step).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`)
    .join(" ");
  const last = values[values.length - 1];
  const lastX = (values.length - 1) * step;
  const lastY = h - ((last - min) / range) * h;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline
        fill="none"
        stroke={accent}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        points={pts}
      />
      <circle cx={lastX} cy={lastY} r={2.5} fill={accent} />
    </svg>
  );
}
