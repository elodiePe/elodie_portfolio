<template>
  <button
    type="button"
    class="lang-toggle"
    @click="toggleLocale"
    :aria-label="t('nav.switchTo')"
    :title="t('nav.switchTo')"
  >
    <span>{{ t("nav.langLabel") }}</span>
  </button>
</template>

<script setup>
import { t, toggleLocale } from "../i18n";
</script>

<style scoped>
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.55rem;
  border-radius: 9999px;
  border: 1px solid var(--color-accent);
  background: transparent;
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.lang-toggle:hover {
  background: var(--color-accent);
  color: var(--color-brand);
}
.lang-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
