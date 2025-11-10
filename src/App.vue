<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
<div class="sm:hidden fixed inset-x-0 top-0 bg-brand shadow-md z-50 ">
  <div class="max-w-4xl mx-auto flex items-center h-14 px-4">
    <RouterLink to="/" class="flex items-center">

      <img src="./assets/elodie_logo_portfolio_white.svg" alt="Logo" class="h-10 w-auto" />
      <span class="ml-2 font-semibold text-md text-accent">My portfolio - Elodie Perring</span>
    </RouterLink>
  </div>
</div>
<div class="pt-10 sm:pt-0"></div>
       <Nav></Nav>


  <!-- <div class="w-3/4 mx-auto mt-4 "> -->


<RouterView />
  <!-- </div> -->

  <Footer></Footer>

</template>

