// Lightweight, dependency-free i18n for the portfolio.
// - `locale` is a reactive ref (persisted; defaults to the browser language).
// - `t(key)` returns a UI string in the current locale (English fallback).
// - `tf(obj)` picks the current locale from a content object like { en, fr }.
// Both read `locale.value`, so calling them in a template is reactive.

import { ref } from "vue";
import { messages } from "./messages.js";

const STORAGE_KEY = "locale";

function detectLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  if (
    typeof navigator !== "undefined" &&
    /^fr\b/i.test(navigator.language || navigator.userLanguage || "")
  ) {
    return "fr";
  }
  return "en";
}

export const locale = ref(detectLocale());

export function setLocale(l) {
  if (l !== "fr" && l !== "en") return;
  locale.value = l;
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = l;
  }
}

export function toggleLocale() {
  setLocale(locale.value === "fr" ? "en" : "fr");
}

// UI string lookup: dot-path into messages, English fallback, key as last resort.
export function t(key) {
  const lookup = (dict) =>
    key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), dict);
  const val = lookup(messages[locale.value]);
  if (val != null) return val;
  const fallback = lookup(messages.en);
  return fallback != null ? fallback : key;
}

// Content-field picker for objects shaped like { en: "...", fr: "..." }.
// A plain string is returned as-is (handy for untranslated content).
export function tf(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[locale.value] ?? obj.en ?? Object.values(obj)[0] ?? "";
}
