<template>
  <main
    class="mx-auto max-w-screen-lg px-4 md:pt-20 pb-20 md:pb-0 pt-8 sm:pt-0"
  >
    <nav aria-label="Breadcrumb" class="mb-4 text-sm">
      <ol class="flex items-center space-x-2">

<li>
          <router-link to="/" class="text-gray-600 hover:underline"
            >Home</router-link
          >
        </li>
        <li class="text-gray-400">/</li>
        <li>
          <router-link to="/projects" class="text-gray-600 hover:underline"
            >Projects</router-link
          >
        </li>
               <li class="text-gray-400">/</li>
        <li aria-current="page" class="text-gray-900">
          {{ project ? project.title : "..." }}
        </li>
      </ol>
    </nav>
    <div v-if="project">
      <div class="flex items-center justify-between mb-4">
        <h1 class="font-bold text-2xl">{{ project.title }}</h1>
        <div class="hidden sm:flex sm:flex-row sm:space-x-2 items-center">
              <Button
          v-if="project && project.figma"
          :href="project.figma"
          :label="'View Figma'"
          target="_blank"
          :color="'lavender'"
          :external="true"
        />
        <Button
          v-if="project && project.website"
          :href="project.website"
          :label="'View Website'"
          target="_blank"
          :color="'mint'"
          :external="true"
        />
        </div>
    
      </div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3 text-sm text-gray-600">
          <time
            v-if="project && project.date"
            :datetime="project.date"
            class="text-gray-600"
          >
            {{ new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </time>
          <span v-else class="text-gray-400">Date unavailable</span>
        </div>

        <div v-if="project && project.tags && project.tags.length" class="hidden md:flex items-center space-x-2">
          <span v-for="(tag, idx) in project.tags" :key="idx">
            <Tag :label="tag" />
          </span>
        </div>
      </div>

      <div
        class="relative"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
        style="max-width: 100%; margin-top: 1rem"
      >
        <!-- viewport -->
        <div style="overflow: hidden">
          <!-- slides row -->
          <div
            class="slides-row"
            :style="{
              display: 'flex',
              width: project.images.length * 100 + '%',
              transform: `translateX(-${
                currentIndex * (100 / project.images.length)
              }%)`,
              transition: 'transform 600ms ease',
            }"
          >
            <div
              v-for="(img, idx) in project.images"
              :key="idx"
              :style="{ width: 100 / project.images.length + '%' }"
            >
              <img
                :src="img"
                :alt="project.title"
                style="width: 100%; height: auto; display: block"
              />
            </div>
          </div>
        </div>

        <!-- prev / next buttons -->
        <button
          @click="prev"
          aria-label="Previous"
          style="
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          &lt;
        </button>

        <button
          @click="next"
          aria-label="Next"
          style="
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          &gt;
        </button>

        <!-- indicators -->
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 8px;
            position: relative;
            bottom: -8px;
          "
        >
          <button
            v-for="(img, idx) in project.images"
            :key="idx"
            @click="goTo(idx)"
            :aria-label="`Go to slide ${idx + 1}`"
            :style="{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: 'none',
              padding: 0,
              background: currentIndex === idx ? '#111' : '#ddd',
              cursor: 'pointer',
            }"
          ></button>
          <!-- count -->
          <div
            style="
              margin-left: 10px;
              align-self: center;
              font-size: 12px;
              color: #555;
            "
          ></div>
        </div>
      </div>
      <div class="flex sm:hidden justify-center items-center space-x-2 mt-6">
        <Button
          v-if="project && project.figma"
          :href="project.figma"
          :label="'View Figma'"
          target="_blank"
          :color="'lavender'"
          :external="true"
        />
        <Button
          v-if="project && project.website"
          :href="project.website"
          :label="'View Website'"
          target="_blank"
          :color="'mint'"
          :external="true"
        />
      </div>
             
      <p class="mt-6">{{ project.description }}</p>
      <div v-if="project && project.tags && project.tags.length" class="md:hidden md:flex items-center space-x-2 ">
        <span v-for="(tag, idx) in project.tags" :key="idx">
          <Tag :label="tag" />
        </span>
      </div>
      </div>
      <div v-else>
        <p>Project not found.</p>
      </div>
      <div class="mt-8">
        <h2 class="text-xl font-bold mb-4">Similar Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="(project, index) in similarProjects"
            :key="index"
            :title="project.title"
            :description="project.description"
            :image="project.images[0]"
            :projectId="project.id.toString()"
          />
        </div>
      </div>


  </main>
</template>

<script>
import projectsData from "../assets/projects.json";
import Button from "../components/Button.vue";
import Tag from "../components/Tag.vue";
import Card from "../components/Card.vue";

export default {
  components: { Button, Tag, Card },
  props: ["id"],
  data() {
    return {
      project: null,
      currentIndex: 0,
      autoplayInterval: null,
      otherProjects: [],
    };
  },
  mounted() {
    this.project = projectsData.find(
      (project) => project.id.toString() === this.id.toString()
    );
    // populate other projects excluding the current one
    this.otherProjects = projectsData.filter(
      (p) => p.id.toString() !== (this.project && this.project.id.toString())
    );
    this.startAutoplay();
  },
  beforeDestroy() {
    // Vue 2
    this.stopAutoplay();
  },
  beforeUnmount() {
    // Vue 3
    this.stopAutoplay();
  },
  watch: {
    // when the route param (id) changes, update the displayed project
    id(newId) {
      this.project = projectsData.find(
        (project) => project.id.toString() === newId.toString()
      );
      // update other projects list
      this.otherProjects = projectsData.filter(
        (p) => p.id.toString() !== (this.project && this.project.id.toString())
      );
      // reset carousel and restart autoplay
      this.currentIndex = 0;
      this.startAutoplay();
    }
  },
  computed: {
    similarProjects() {
      // return projects that share at least one tag with the current project
      if (!this.project) return [];
      const baseTags = (this.project.tags || []).map((t) => t.toString().toLowerCase());
      if (!baseTags.length) return this.otherProjects.slice(0, 8);

      const matches = this.otherProjects.filter((p) => {
        const ptags = (p.tags || []).map((t) => t.toString().toLowerCase());
        return ptags.some((t) => baseTags.includes(t));
      });

      return (matches.length ? matches : this.otherProjects).slice(0, 8);
    }
  },
  methods: {
    prev() {
      if (!this.project || !this.project.images || !this.project.images.length)
        return;
      const len = this.project.images.length;
      this.currentIndex = (this.currentIndex - 1 + len) % len;
    },
    next() {
      if (!this.project || !this.project.images || !this.project.images.length)
        return;
      const len = this.project.images.length;
      this.currentIndex = (this.currentIndex + 1) % len;
    },
    goTo(idx) {
      if (!this.project || !this.project.images || !this.project.images.length)
        return;
      const len = this.project.images.length;
      if (idx < 0) idx = 0;
      if (idx >= len) idx = len - 1;
      this.currentIndex = idx;
    },
    startAutoplay() {
      this.stopAutoplay();
      // Only start if we have images
      if (
        this.project &&
        this.project.images &&
        this.project.images.length > 1
      ) {
        this.autoplayInterval = setInterval(() => {
          this.next();
        }, 3000);
      }
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    },
  },
};
</script>
