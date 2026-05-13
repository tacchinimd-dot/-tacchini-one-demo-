"use client";

/* ============================================================
 * AuthProvider — TACCHINI ONE 데모 로그인 시스템
 *
 * 데모 mock 사용자:
 *   · roamin / sugifrance27   →  Roamin · Sugi France · Designer  (라이센시)
 *   · kwon   / ff2026         →  권은희 차장 · F&F HQ · ST사업부 (본사)
 *
 * 영속화: localStorage("tacchini-one-auth")
 * 사용: const { user, login, logout } = useAuth();
 * ============================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "HQ" | "Licensee";

export interface AuthUser {
  username: string;
  displayName: string;
  initials: string;
  licensee: string;
  role: UserRole;
  jobTitle: string;
}

export type LoginErrorReason = "no_user" | "bad_code";

interface AuthCtx {
  user: AuthUser | null;
  hydrated: boolean;
  login: (
    id: string,
    code: string,
  ) => { ok: true } | { ok: false; reason: LoginErrorReason };
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

const STORAGE_KEY = "tacchini-one-auth";

/* ============================================================
 * 데모용 mock 사용자
 * ============================================================ */
const DEMO_USERS: Record<
  string,
  { code: string; user: AuthUser }
> = {
  roamin: {
    code: "sugifrance27",
    user: {
      username: "roamin",
      displayName: "Roamin",
      initials: "RA",
      licensee: "Sugi France",
      role: "Licensee",
      jobTitle: "Apparel Designer",
    },
  },
  kwon: {
    code: "ff2026",
    user: {
      username: "kwon",
      displayName: "권은희 차장",
      initials: "EK",
      licensee: "F&F HQ",
      role: "HQ",
      jobTitle: "ST사업부 · 라이센스 담당",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  /* hydrate from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.username && parsed.role) {
          setUser(parsed);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const login = useCallback((id: string, code: string) => {
    const normalized = id.trim().toLowerCase();
    const record = DEMO_USERS[normalized];
    if (!record) {
      return { ok: false as const, reason: "no_user" as LoginErrorReason };
    }
    if (record.code !== code.trim()) {
      return { ok: false as const, reason: "bad_code" as LoginErrorReason };
    }
    setUser(record.user);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record.user));
    } catch {
      /* ignore */
    }
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({ user, hydrated, login, logout }),
    [user, hydrated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
