"use client";

/* ============================================================
 * Sidebar — Console primary navigation
 *
 * SaaS 콘솔 톤: deep navy gradient + 워드마크 + 섹션 그룹
 * Linear · Vercel Dashboard 톤 정합 + i18n + ghost language toggle in footer
 * ============================================================ */

import Link from "next/link";
import TacchiniSymbol from "@/components/brand/TacchiniSymbol";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/lib/auth/AuthProvider";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  active?: string;
}

const ICONS = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
  ),
  licensees: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21V8a2 2 0 0 0-1-1.7L13 2.4a2 2 0 0 0-2 0L4 6.3A2 2 0 0 0 3 8v13" /><path d="M9 21V12h6v9" /></svg>
  ),
  royalty: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
  ),
  design: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
  ),
  plan: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 5-7" /></svg>
  ),
  contract: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>
  ),
  atelier: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  inspector: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  studio: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
  ),
  mirror: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M2 12h20" /></svg>
  ),
  codex: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
};

export default function Sidebar({ active = "dashboard" }: SidebarProps) {
  const { t, lang } = useLang();
  const { user, logout } = useAuth();

  const groups: NavGroup[] = [
    {
      label: t.sidebar.group_operations,
      items: [
        { label: t.sidebar.nav_dashboard, href: "/console", icon: ICONS.dashboard, active: active === "dashboard" },
        { label: t.sidebar.nav_licensees, href: "/licensees", icon: ICONS.licensees, badge: 6 },
        { label: t.sidebar.nav_royalty, href: "/royalty", icon: ICONS.royalty, badge: "3" },
        { label: t.sidebar.nav_calendar, href: "/calendar", icon: ICONS.calendar },
        { label: t.sidebar.nav_plans, href: "/plans", icon: ICONS.plan },
        { label: t.sidebar.nav_contracts, href: "/contracts", icon: ICONS.contract },
      ],
    },
    {
      label: t.sidebar.group_atelier,
      items: [
        { label: t.sidebar.nav_inspector, href: "/atelier/inspector/movin", icon: ICONS.inspector, active: active === "inspector" },
        { label: t.sidebar.nav_studio, href: "/atelier/studio", icon: ICONS.studio },
        { label: t.sidebar.nav_mirror, href: "/atelier/mirror", icon: ICONS.mirror },
        { label: t.sidebar.nav_codex, href: "/atelier/codex", icon: ICONS.codex },
      ],
    },
  ];

  return (
    <aside
      className="flex flex-col"
      style={{
        background: `linear-gradient(180deg, var(--sidebar-bg-from) 0%, var(--sidebar-bg-to) 100%)`,
        color: "#fff",
        borderRight: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Brand header — click to return to platform door (/) */}
      <Link
        href="/"
        className="flex items-center gap-3 px-5 py-5 transition-colors"
        style={{ borderBottom: "1px solid var(--sidebar-divider)", textDecoration: "none", color: "inherit" }}
        title="Back to TACCHINI ONE Platform"
      >
        <span
          aria-hidden
          className="inline-flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--color-cream-white)",
          }}
        >
          <TacchiniSymbol size={18} color="currentColor" />
        </span>
        <div className="flex flex-col leading-tight">
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.4 }}>
            TACCHINI <span style={{ opacity: 0.85 }}>ONE</span>
          </span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "var(--sidebar-section-label)", letterSpacing: 1 }}>
            {t.sidebar.brand_subtitle}
          </span>
        </div>
      </Link>

      {/* Tenant selector */}
      <div className="px-3 pt-4 pb-2">
        <button
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span className="flex items-center gap-2">
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: "var(--color-accent-red)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              ST
            </span>
            <span className="flex flex-col items-start">
              <span style={{ fontSize: 12, fontWeight: 700 }}>
                {user?.licensee || t.sidebar.tenant_org}
              </span>
              <span style={{ fontSize: 10, color: "var(--sidebar-section-label)", fontWeight: 500 }}>
                {user?.role === "Licensee" ? "Licensee · STE" : t.sidebar.tenant_dept}
              </span>
            </span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {groups.map((g) => (
          <div key={g.label}>
            <div
              className="px-3 mb-2"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "var(--sidebar-section-label)",
                textTransform: "uppercase",
              }}
            >
              {g.label}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors"
                    style={{
                      background: it.active ? "var(--sidebar-link-active-bg)" : "transparent",
                      color: it.active ? "var(--sidebar-link-active-fg)" : "var(--sidebar-link)",
                      fontSize: 13,
                      fontWeight: it.active ? 600 : 500,
                      borderLeft: it.active ? "2px solid var(--color-accent-red)" : "2px solid transparent",
                      paddingLeft: it.active ? 10 : 12,
                    }}
                  >
                    <span style={{ opacity: it.active ? 1 : 0.85 }}>{it.icon}</span>
                    <span className="flex-1">{it.label}</span>
                    {it.badge && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          background: "rgba(228, 0, 43, 0.18)",
                          color: "#ff6b8a",
                          padding: "1px 7px",
                          borderRadius: 9999,
                          minWidth: 18,
                          textAlign: "center",
                        }}
                      >
                        {it.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer (settings + version) */}
      <div
        className="px-4 py-4"
        style={{ borderTop: "1px solid var(--sidebar-divider)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                background:
                  user?.role === "Licensee"
                    ? "linear-gradient(135deg, var(--color-accent-red), #7a0019)"
                    : "linear-gradient(135deg, #5b8fd1, #002C5F)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {user?.initials || "?"}
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.displayName || "Guest"}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--sidebar-section-label)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.jobTitle || t.sidebar.user_role}
              </span>
            </div>
          </div>
          <LanguageToggle variant="ghost" size="sm" />
        </div>

        {/* Logout 버튼 */}
        {user && (
          <button
            onClick={logout}
            className="mt-3 w-full flex items-center justify-center gap-2 transition-colors"
            style={{
              padding: "7px 10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "var(--sidebar-link)",
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Logout
          </button>
        )}
        <div
          className="mt-3 t-fine flex items-center justify-between gap-2"
          style={{ color: "var(--sidebar-section-label)", letterSpacing: 1.5 }}
        >
          <span>{t.sidebar.version_label}</span>
          <button
            aria-label="Settings"
            style={{
              color: "var(--sidebar-link)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: 0.6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" /></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
