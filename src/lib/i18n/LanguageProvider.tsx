"use client";

/* ============================================================
 * LanguageProvider — App-wide i18n context
 *
 * 사용:
 *   const { lang, setLang, t } = useLang();
 *   <h1>{t.door.hero_line1}</h1>
 *
 * 영속화: localStorage("tacchini-one-lang") · 기본값 "ko"
 * SSR safe: 첫 렌더 ko → 클라이언트에서 localStorage 값으로 hydrate
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
import { dictionary, type Dictionary, type Lang } from "./dictionary";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "tacchini-one-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  /* hydrate from localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ko" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      /* localStorage 비활성 환경 무시 */
    }
  }, []);

  /* sync html lang attribute */
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "ko" ? "en" : "ko");
  }, [lang, setLang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: dictionary[lang],
    }),
    [lang, setLang, toggleLang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within <LanguageProvider>");
  }
  return ctx;
}
