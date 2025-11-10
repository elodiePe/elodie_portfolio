<template>
  <main class="mx-auto max-w-screen-lg px-4 md:pt-20 pb-20 pt-8 text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">404 — Page not found</h1>
    <p class="text-gray-600 mb-6">The page you are looking for does not exist or has been moved.</p>
    <div class="flex justify-center gap-4">
      <router-link to="/" class="btn btn-outline">Go back home</router-link>
      <router-link to="/projects" class="btn btn-primary">View projects</router-link>
    </div>
  </main>
</template>

<script setup>
// simple static not-found page — no script logic required
</script>

<style scoped>
/* small visual tweaks */
</style>
