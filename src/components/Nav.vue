<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import IconCommunity from './icons/IconCommunity.vue'
import IconDocumentation from './icons/IconDocumentation.vue'
import IconTooling from './icons/IconTooling.vue'

const route = useRoute()
const router = useRouter()

function isActive(pathOrName) {
  // Accept either route name or path
  return route.name === pathOrName || route.path.startsWith(pathOrName)
}
</script>

<template>
  <!-- visible on md+ screens only, hidden on small screens -->
  <nav
    class="hidden md:block fixed top-0 left-0 right-0 z-50"
    role="navigation"
    aria-label="Top navigation"
    :style="{ paddingTop: `calc(env(safe-area-inset-top, 0px))` }"
  >
    <div class="mx-auto max-w-screen-lg">
      <div class="flex items-center justify-between bg-brand border-b shadow py-2 px-4 text-accent rounded-b-lg">
<RouterLink
          to="/"
          class="flex items-center gap-3 px-2 py-1 rounded transform transition-transform duration-150 hover:scale-110 font"
          :aria-current="isActive('home') ? 'page' : null"
          :class="{ 'underline decoration-2 underline-offset-2': isActive('home') }"
        >
          <img src="../assets/elodie_logo_portfolio_white.svg" alt="Portfolio logo" class="w-10 h-10 rounded-sm" />
        </RouterLink>
        <div class="flex items-center gap-2 font-poppins font-semibold text-lg">
          
          
          <RouterLink
            to="/"
            class="flex items-center gap-2 px-3 py-2 rounded transform transition-transform duration-150 hover:scale-110"
            :aria-current="isActive('home') ? 'page' : null"
            :class="{ 'flex items-center gap-3 px-2 py-2 rounded-md transition-colors duration-150 bg-accent text-brand shadow-md': isActive('home') }"
          >
            <!-- <IconCommunity class="w-5 h-5" /> -->
            <span class="hidden sm:inline text-lg">My profile</span>
          </RouterLink>

          <RouterLink
            to="/projects"
            class="flex items-center gap-2 px-3 py-2 rounded transform transition-transform duration-150 hover:scale-110"
            :aria-current="isActive('projects') ? 'page' : null"
            :class="{ 'flex items-center gap-3 px-2 py-2 rounded-md transition-colors duration-150 bg-accent text-brand shadow-md': isActive('projects') }"
          >
            <!-- <IconDocumentation class="w-5 h-5" /> -->
            <span class="hidden sm:inline text-lg">Projects</span>
          </RouterLink>

          <RouterLink
            to="/tailwind"
            class="flex items-center gap-2 px-3 py-2 rounded transform transition-transform duration-150 hover:scale-110"
            :aria-current="isActive('tailwind') ? 'page' : null"
            :class="{ 'flex items-center gap-3 px-2 py-2 rounded-md transition-colors duration-150 bg-accent text-brand shadow-md': isActive('tailwind') }"
          >
            <!-- <IconTooling class="w-5 h-5" /> -->
            <span class="hidden sm:inline text-lg">Contact me</span>
          </RouterLink>
        </div>

        <!-- right side placeholder (logo / actions) - optional -->
        <div class="flex items-center gap-2">
          <!-- keep empty or add desktop-only actions here -->
        </div>
      </div>
    </div>
  </nav>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    role="navigation"
    aria-label="Mobile bottom navigation"
    :style="{ paddingBottom: `calc(env(safe-area-inset-bottom, 0px))` }"
  >
    <div class="mx-auto max-w-screen-lg">
      <div class="flex justify-between items-center bg-brand border-t shadow-lg py-2 px-4 rounded-t-lg">
        <!-- Home / Community -->
        <RouterLink
          to="/"
          class="flex-1 flex flex-col items-center gap-1 text-xs py-1"
          :aria-current="isActive('home') ? 'page' : null"
          :class="{ 'bg-accent text-brand shadow-md rounded-md': isActive('home') }"
        >
          <button
            class="btn btn-ghost btn-circle p-2"
            :class="{ 'text-accent': !isActive('home'), 'text-brand': isActive('home') }"
            aria-label="Home"
            title="Home"
          >
            <span class="material-icons" role="img" aria-label="Home">person</span>
          </button>
          <span class="font-sm" :class="{ 'text-accent': !isActive('home'), 'text-brand': isActive('home') }">Profile</span>
        </RouterLink>

        <!-- Projects -->
        <RouterLink
          to="/projects"
          class="flex-1 flex flex-col items-center gap-1 text-xs py-1"
          :aria-current="isActive('projects') ? 'page' : null"
          :class="{ 'bg-accent text-brand shadow-md rounded-md': isActive('projects') }"
        >
          <button
            class="btn btn-ghost btn-circle p-2"
            :class="{ 'text-accent': !isActive('projects'), 'text-brand': isActive('projects') }"
            aria-label="Projects"
            >
            <span class="material-icons" role="img" aria-label="Home">cases</span>
            
          </button>
          <span class="font-sm" :class="{ 'text-accent': !isActive('projects'), 'text-brand': isActive('projects') }">Projects</span>
        </RouterLink>

        <!-- Tailwind / About -->
        <RouterLink
          to="/contact"
          class="flex-1 flex flex-col items-center gap-1 text-xs py-1"
          :aria-current="isActive('contact') ? 'page' : null"
          :class="{ 'bg-accent text-brand shadow-md rounded-md': isActive('contact') }"
        >
          <button
            class="btn btn-ghost btn-circle p-2"
            :class="{ 'text-accent': !isActive('contact'), 'text-brand': isActive('contact') }"
            aria-label="Contact"
            title="Contact"
          >
            <span class="material-icons" role="img" aria-label="Contact">mail</span>
          </button>
          <span :class="{ 'text-accent': !isActive('contact'), 'text-brand': isActive('contact') }">Contact</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* enlarge touch target if needed */
.btn-circle {
  min-width: 44px;
  min-height: 44px;
}
/* optional: slightly raised look, avoid overlap with other fixed UI */
nav { pointer-events: auto; }
</style>