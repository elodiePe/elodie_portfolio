<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import ChameleonMascot from './components/ChameleonMascot.vue'
import LangToggle from './components/LangToggle.vue'
import { t } from './i18n'
</script>

<template>
  <div class="flex flex-col min-h-screen min-h-dvh">
    <!-- skip link: first focusable element, lets keyboard users bypass nav -->
    <a href="#main-content" class="skip-link">{{ t('nav.skip') }}</a>
    <!-- top mobile bar -->
    <div class="md:hidden fixed inset-x-0 top-0 bg-brand shadow-md z-50">
      <div class="max-w-4xl mx-auto flex items-center justify-between h-14 px-4">
        <RouterLink to="/" class="flex items-center">

          <img src="./assets/elodie_logo_portfolio_white.svg" :alt="t('nav.logo')" class="h-10 w-auto" />
          <span class="ml-2 font-semibold text-md text-accent">Elodie Perring</span>
        </RouterLink>
        <div class="flex items-center gap-2">
          <LangToggle />
          <a href="https://linkedin.com/in/elodie-perring" target="_blank" rel="noopener noreferrer" class="inline-block">
            <img src="./assets/img/linkedin.svg" alt="LinkedIn" class="w-8 h-8 hover:opacity-80 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
    <!-- /top mobile bar -->

    <Nav />

    <!-- add top padding for fixed bars -->
    <main id="main-content" tabindex="-1" class="flex-1 pt-12 md:pt-5">
      <RouterView />
    </main>

    <Footer class="mt-auto" />

    <!-- Signature chameleon: tap to recolour the site accent -->
    <ChameleonMascot />
  </div>
</template>

<style>
/* Skip link: visually hidden until focused, then revealed on top of everything */
.skip-link {
  position: fixed;
  top: 0;
  left: 0;
  transform: translateY(-120%);
  z-index: 100;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-brand);
  color: var(--color-accent);
  border-radius: 0.375rem;
  font-weight: 600;
  transition: transform 150ms ease;
}
.skip-link:focus {
  transform: translateY(0);
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
/* Remove the focus ring that tabindex="-1" would otherwise show on the main region */
#main-content:focus {
  outline: none;
}
</style>

