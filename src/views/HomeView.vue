<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import projects from "../data/projects-resolved.js";
import Button from "../components/Button.vue";
import GuidedTour from "../components/GuidedTour.vue";
import Card from "../components/Card.vue";
import StatsBand from "../components/StatsBand.vue";
import { t } from "../i18n";

const projectsList = Array.isArray(projects) ? projects : [];

// At-a-glance stats, derived from real data.
const earliestYear = projectsList.reduce((min, p) => {
  const y = p && p.date ? new Date(p.date).getFullYear() : NaN;
  return !Number.isNaN(y) && y < min ? y : min;
}, new Date().getFullYear());
const statItems = computed(() => [
  { value: projectsList.length, suffix: "+", label: t("stats.projects") },
  { value: 6, label: t("stats.disciplines") },
  { value: new Date().getFullYear() - earliestYear, suffix: "+", label: t("stats.years") },
]);

const tourOpen = ref(false);

// Rotating hero tagline — shows Elodie's range at a glance (localized).
const roleWords = computed(() => t("home.roleWords"));
const roleIndex = ref(0);
const reduceMotion = ref(false);
let roleTimer = null;

onMounted(() => {
  if (typeof window !== "undefined" && window.matchMedia) {
    reduceMotion.value = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }
  if (!reduceMotion.value) {
    roleTimer = setInterval(() => {
      roleIndex.value = (roleIndex.value + 1) % roleWords.value.length;
    }, 2200);
  }
});
onBeforeUnmount(() => {
  if (roleTimer) clearInterval(roleTimer);
});

// Curated "best work" to surface on the landing page (spread across disciplines).
const featuredIds = [36, 8, 1, 11, 5, 35];
const featuredProjects = featuredIds
  .map((id) => projectsList.find((p) => Number(p.id) === id))
  .filter(Boolean);

const getFirstImage = (p) => {
  // try common fields: images array, thumbnail, image
  const img = (p.images && p.images[0]) || p.thumbnail || p.image;

  // fallback placeholder
  const placeholder = new URL(
    "../assets/project-1-placeholder.jpg",
    import.meta.url,
  ).href;
  if (!img) return placeholder;

  // If it's already a resolved URL (import.meta.glob produced), return as-is
  if (
    typeof img === "string" &&
    (img.startsWith("http") ||
      img.startsWith("blob:") ||
      img.startsWith("data:") ||
      img.startsWith("//"))
  )
    return img;

  // If it's a public-root path (e.g. /assets/...), return as-is
  if (typeof img === "string" && img.startsWith("/")) return img;

  // Try to resolve relative paths via Vite
  try {
    return new URL(img, import.meta.url).href;
  } catch {
    return img;
  }
};
const scrollToCollaboration = () => {
  if (typeof document === "undefined") return;
  const el = document.getElementById("collaboration");
  if (el && typeof el.scrollIntoView === "function") {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
// Capability cards are localized and static (no hover reveal).
const caps = computed(() => t("home.caps"));
</script>

<template>
  <div
    class="mx-auto max-w-screen-lg px-4 md:pt-10 pb-20 md:pb-0 pt-0 sm:pt-0"
  >
    <div class="flex flex-col md:flex-row items-center gap-10 pt-10">
      <h1 class="md:hidden text-5xl font-semibold text-brand pt-8 text-center">
        Elodie Perring
      </h1>

      <img
        src="../assets/elodie_logo_portfolio.svg"
        alt="Portfolio logo"
        class="w-60 h-60 md:w-500 md:h-500 rounded-sm object-contain"
      />
      <div>
        <h1 class="hidden md:block text-5xl font-semibold text-brand pb-4">
          Elodie Perring
        </h1>

        <!-- Rotating tagline: shows the range at a glance -->
        <p class="hero-tag text-2xl md:text-3xl font-semibold mb-3">
          <span>{{ $locale === 'fr' ? 'Je ' : 'I ' }}</span>
          <!-- Static, screen-reader-friendly full statement -->
          <span class="sr-only">{{ t('home.roleFull') }}</span>
          <span class="hero-rotator" aria-hidden="true">
            <transition :name="reduceMotion ? '' : 'roll'" mode="out-in">
              <span :key="roleIndex" class="hero-word" :style="{ color: 'var(--accent)' }">{{ roleWords[roleIndex] }}</span>
            </transition>
          </span><span aria-hidden="true">.</span>
        </p>

        <p>{{ t('home.passion') }}</p>
        <p>{{ t('home.practice') }}</p>
        <p class="mt-2 text-sm text-gray-600">{{ t('home.bio') }}</p>

        <div
          class="mt-6 w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-4"
        >
          <Button :color="'accent'" class="w-full md:w-auto" @click="$router.push('/projects')"
            >{{ t('home.seeAllProjects') }}</Button
          >

          <Button
            :color="'mint'"
            class="w-full md:w-auto"
            @click="tourOpen = true"
          >
            {{ t('home.takeTour') }}
          </Button>

          <Button
            :color="'peach'"
            class="w-full md:w-auto"
            @click="scrollToCollaboration()"
          >
            {{ t('home.startProject') }}
          </Button>
        </div>
      </div>
    </div>

    <!-- At-a-glance stats -->
    <StatsBand :items="statItems" />

    <!-- Selected work: sell the best projects right on the landing page -->
    <section v-reveal class="mt-12 w-full">
      <div class="flex items-end justify-between mb-4 gap-3">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold text-brand">{{ t('home.selectedWork') }}</h2>
          <p class="text-sm text-gray-600">{{ t('home.selectedWorkSub') }}</p>
        </div>
        <RouterLink
          to="/projects"
          class="shrink-0 text-sm font-semibold underline-offset-2 hover:underline"
          :style="{ color: 'var(--accent)' }"
        >
          {{ t('home.seeAll') }}
        </RouterLink>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <Card
          v-for="p in featuredProjects"
          :key="p.id"
          :title="p.title"
          :description="p.description"
          :image="getFirstImage(p)"
          :projectId="p.id.toString()"
          :project="p"
        />
      </div>
    </section>

    <section v-reveal class="mt-10 w-full">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand mb-1">{{ t('home.whatIDo') }}</h2>
      <p class="mb-4 text-sm text-gray-600">{{ t('home.whatIDoSub') }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Static info cards (no hover reveal): title + description always visible -->
        <div
          v-for="(cap, i) in caps"
          :key="i"
          class="relative overflow-hidden rounded-lg shadow-lg"
        >
          <svg
            class="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
          >
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              :fill="['#FDE8D9', '#DFF7E6', '#FBD5E1', '#FFF4CC'][i % 4]"
            />
          </svg>

          <div class="relative z-10 h-full flex flex-col p-6 text-[#3b2418]">
            <h3 class="text-lg md:text-xl font-semibold leading-tight">
              {{ cap.title }}
            </h3>
            <p class="mt-2 text-sm md:text-base" v-html="cap.desc"></p>
            <Button
              class="mt-4 w-full sm:w-auto sm:self-start text-center"
              color="lavender"
              @click="$router.push({ path: '/projects', query: { tags: cap.tag } })"
            >
              {{ t('home.seeProjects') }}
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section
      v-reveal
      id="collaboration"
      class="mt-12 rounded-lg p-8 bg-gray-800 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div class="flex-1">
        <h2 class="text-2xl md:text-3xl font-semibold text-accent mb-2">
          {{ t('home.collabTitle') }}
        </h2>
        <p class="text-sm md:text-base text-gray-300">
          {{ t('home.collabIntro1a') }}
          <b class="text-accent"
            ><a href="/projects?tags=clothing">{{ t('home.collabClothing') }}</a></b
          >
          {{ t('home.collabAnd') }}
          <b class="text-accent"
            ><a href="/projects?tags=painting">{{ t('home.collabArtwork') }}</a></b
          >.
        </p>
        <p class="text-sm md:text-base text-gray-300">
          {{ t('home.collabIntro2') }}
        </p>
      </div>

      <div
        class="flex-shrink-0 flex w-full sm:w-auto gap-3 flex-col sm:flex-row"
      >
        <Button
          :color="'accent'"
          class="w-full sm:w-auto"
          @click="$router.push('/contact')"
          >{{ t('home.collabContact') }}</Button
        >

        <Button
          :color="'mint'"
          class="w-full sm:w-auto"
          @click="$router.push('/projects')"
          >{{ t('home.collabSeeWork') }}</Button
        >
      </div>
    </section>

    <!-- Guided tour overlay -->
    <GuidedTour :open="tourOpen" @close="tourOpen = false" />
  </div>
</template>
<style>
/* Rotating hero tagline */
.hero-tag {
  color: #241a3a;
  min-height: 1.6em;
}
.hero-rotator {
  display: inline-block;
}
.hero-word {
  display: inline-block;
  font-weight: 700;
}
.roll-enter-active,
.roll-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.roll-enter-from {
  opacity: 0;
  transform: translateY(0.5em);
}
.roll-leave-to {
  opacity: 0;
  transform: translateY(-0.5em);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

</style>
