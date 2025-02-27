<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <header class="bg-gray-800 text-white p-4 flex space-x-4 items-center rounded-box">
    <img src="../assets/logo.svg" alt="Vue logo" class="w-12 h-12" />
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box space-x-4">
      <li><RouterLink to="/">Mon parcours</RouterLink></li>
      <li><RouterLink to="/projects">Mes projets</RouterLink></li>
      <li><RouterLink to="/tailwind">Me contacter</RouterLink></li>
    </ul>
  </header>
</template>
