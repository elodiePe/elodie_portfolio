<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Nav from './components/Nav.vue'
</script>

<template>
  <div class="w-3/4 mx-auto mt-4 ">
    <Nav></Nav>
  


<RouterView />
  </div>

</template>

