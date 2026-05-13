"use client";

/* ============================================================
 * LoginGate — 비인증 사용자에게 로그인 화면 표시
 *
 * 인증 후: children (도어) 그대로 표시
 * 비인증:  로그인 폼만 표시
 * ============================================================ */

import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import TacchiniSymbol from "@/components/brand/TacchiniSymbol";
import LanguageToggle from "@/components/common/LanguageToggle";

export default function LoginGate({ children }: { children: ReactNode }) {
  const { user, hydrated, login } = useAuth();
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* hydration 전엔 빈 화면 (SSR/CSR 일관성) */
  if (!hydrated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#001428",
        }}
      />
    );
  }

  /* 인증된 사용자 → children (도어) */
  if (user) {
    return <>{children}</>;
  }

  /* 비인증 → 로그인 화면 */
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const r = login(id, code);
      setLoading(false);
      if (!r.ok) setError(r.reason);
    }, 400); /* 작은 로딩 시뮬레이션 */
  }

  function loginAsDemo(demoId: string, demoCode: string) {
    setId(demoId);
    setCode(demoCode);
    setError("");
    setLoading(true);
    setTimeout(() => {
      const r = login(demoId, demoCode);
      setLoading(false);
      if (!r.ok) setError(r.reason);
    }, 400);
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at top right, #0a4585 0%, transparent 50%), radial-gradient(ellipse at bottom left, #2a1a3a 0%, transparent 55%), linear-gradient(180deg, #001428 0%, #001a3a 50%, #000814 100%)",
        color: "#fff",
        padding: 20,
      }}
    >
      {/* 배경 효과 */}
      <div
        aria-hidden
        className="absolute inset-0 hero-grid pointer-events-none"
        style={{ opacity: 0.35 }}
      />
      <span
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(228, 0, 43, 0.14), transparent 65%)",
        }}
      />
      <span
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-25%",
          left: "-10%",
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(201, 154, 58, 0.12), transparent 70%)",
        }}
      />

      {/* 상단 우측 i18n */}
      <div className="absolute top-5 right-5 z-10">
        <LanguageToggle variant="dark" />
      </div>

      {/* 중앙 카드 */}
      <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 max-w-[1100px] w-full items-center">
        {/* 좌측 — 브랜드 hero */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-4 mb-8">
            <span
              aria-hidden
              className="inline-flex items-center justify-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "var(--color-cream-white)",
              }}
            >
              <TacchiniSymbol size={32} color="currentColor" />
            </span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 0.4 }}>
                TACCHINI <span style={{ opacity: 0.85 }}>ONE</span>
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.42)",
                  letterSpacing: 1.5,
                  marginTop: 2,
                }}
              >
                GLOBAL LICENSEE PLATFORM
              </div>
            </div>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -0.025 * 44,
            }}
          >
            One Voice.
            <br />
            One Brand.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent-red), var(--color-accent-gold), var(--color-cream-white))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tacchini One.
            </span>
          </h1>

          <p
            className="mt-5"
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 460,
            }}
          >
            Sergio Tacchini의 글로벌 라이센시 운영 플랫폼.
            라이센시별 발급된 ID와 Code로 로그인하세요.
          </p>

          <div
            className="mt-8 inline-flex items-center gap-2"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              padding: "6px 14px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.62)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
              }}
            />
            DEMO ENVIRONMENT · 6/9 Conference Preview
          </div>
        </div>

        {/* 우측 — 로그인 폼 */}
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 22,
            padding: 32,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* 모바일에서만 보이는 미니 브랜드 */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <span
              aria-hidden
              className="inline-flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "var(--color-cream-white)",
              }}
            >
              <TacchiniSymbol size={22} color="currentColor" />
            </span>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.4 }}>
              TACCHINI <span style={{ opacity: 0.85 }}>ONE</span>
            </div>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -0.3,
              color: "#fff",
            }}
          >
            Sign in
          </h2>
          <p
            className="mt-2"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
          >
            라이센시 ID와 Code를 입력하세요.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field
              label="Licensee ID"
              value={id}
              onChange={setId}
              placeholder="e.g. roamin"
              autoFocus
            />
            <Field
              label="Access Code"
              type="password"
              value={code}
              onChange={setCode}
              placeholder="•••••••"
            />

            {error && (
              <div
                style={{
                  padding: "10px 12px",
                  background: "rgba(228, 0, 43, 0.12)",
                  border: "1px solid rgba(228, 0, 43, 0.35)",
                  borderRadius: 8,
                  color: "#ffb3c1",
                  fontSize: 12,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !id || !code}
              style={{
                width: "100%",
                padding: "12px 18px",
                background: loading || !id || !code
                  ? "rgba(255,255,255,0.15)"
                  : "linear-gradient(135deg, var(--color-primary), var(--color-primary-soft))",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 10,
                border: "none",
                cursor: loading || !id || !code ? "not-allowed" : "pointer",
                transition: "all 200ms ease",
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* 데모 빠른 로그인 */}
          <div
            className="mt-7 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "rgba(255,255,255,0.42)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Demo Quick Login
            </div>
            <div className="space-y-2">
              <DemoLoginButton
                title="Roamin · Sugi France"
                subtitle="Apparel Designer · Licensee 뷰"
                onClick={() => loginAsDemo("roamin", "sugifrance27")}
                disabled={loading}
                primary
              />
              <DemoLoginButton
                title="권은희 차장 · F&F HQ"
                subtitle="ST사업부 · 라이센스 담당 (본사 뷰)"
                onClick={() => loginAsDemo("kwon", "ff2026")}
                disabled={loading}
              />
            </div>
            <div
              className="mt-4 t-mono"
              style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", lineHeight: 1.5 }}
            >
              roamin / sugifrance27  ·  kwon / ff2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: "rgba(255,255,255,0.55)",
          textTransform: "uppercase",
          marginBottom: 6,
          display: "block",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        spellCheck={false}
        autoComplete={type === "password" ? "current-password" : "username"}
        style={{
          width: "100%",
          padding: "11px 14px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          color: "#fff",
          fontSize: 14,
          outline: "none",
          fontFamily: type === "password" ? "var(--font-mono)" : "inherit",
          letterSpacing: type === "password" ? "0.3em" : "normal",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-primary-on-dark)";
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
      />
    </label>
  );
}

function DemoLoginButton({
  title,
  subtitle,
  onClick,
  disabled,
  primary,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left transition-colors"
      style={{
        padding: "10px 12px",
        background: primary
          ? "rgba(0, 44, 95, 0.30)"
          : "rgba(255,255,255,0.03)",
        border: primary
          ? "1px solid rgba(91, 143, 209, 0.40)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        color: "#fff",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.55)",
              marginTop: 1,
            }}
          >
            {subtitle}
          </div>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
      </div>
    </button>
  );
}
