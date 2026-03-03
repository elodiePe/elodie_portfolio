<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen min-h-dvh">
    <!-- top mobile bar -->
    <div class="md:hidden fixed inset-x-0 top-0 bg-brand shadow-md z-50">
      <div class="max-w-4xl mx-auto flex items-center justify-between h-14 px-4">
        <RouterLink to="/" class="flex items-center">

          <img src="./assets/elodie_logo_portfolio_white.svg" alt="Logo" class="h-10 w-auto" />
          <span class="ml-2 font-semibold text-md text-accent">Elodie Perring</span>
        </RouterLink>
         <a href="https://linkedin.com/in/elodie-perring" target="_blank" rel="noopener noreferrer" class="inline-block">
            <img src="./assets/img/linkedin.svg" alt="LinkedIn" class="w-8 h-8 hover:opacity-80 transition-opacity" />
          </a>
      </div>
    </div>
    <!-- /top mobile bar -->

    <Nav />

    <main class="flex-1">
      <RouterView />
    </main>

    <Footer class="mt-auto" />
  </div>
</template>

