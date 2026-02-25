<template>
  <main
    class="mx-auto max-w-screen-lg px-4 pb-20 md:pb-0 pt-6 md:pt-14 "
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
        <div class="hidden sm:flex sm:flex-row sm:space-x-2 items-center" v-if="projectButtons.length">
          <Button
            v-for="(btn, i) in projectButtons"
            :key="`top-btn-${i}`"
            :href="btn.url"
            :label="btn.label"
            target="_blank"
            :color="btn.color || 'mint'"
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
              <!-- replace $SELECTION_PLACEHOLDER$ with this -->
              <div v-if="isYouTubeUrl(img)">
                <iframe
                  :src="getYouTubeEmbedUrl(img)"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full rounded-xl border border-gray-200"
                  style="height:auto; max-height:60vh; aspect-ratio:1867 / 1272;"
                ></iframe>
              </div>

              <div v-else-if="isVideoFile(img)">
                <video
                  controls
                  :src="readImg(img)"
                  style="display:block; margin:0 auto; width:100%; height:auto; aspect-ratio:1867 / 1272; object-fit:contain; border-radius:12px;"
                ></video>
              </div>

              <div v-else>
                <img
                  :src="readImg(img)"
                  :alt="project.title"
                  style="display: block; margin: 0 auto; max-width: 100%; max-height: 60vh; object-fit: contain; border-radius: 12px;"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- prev / next buttons -->
        <button v-if="project.images.length > 1"
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

        <button v-if="project.images.length > 1"
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
          <button v-if="project.images.length > 1"
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
      <div class="flex sm:hidden flex-wrap justify-center items-center gap-2 mt-6" v-if="projectButtons.length">
        <Button
          v-for="(btn, i) in projectButtons"
          :key="`mobile-btn-${i}`"
          :href="btn.url"
          :label="btn.label"
          target="_blank"
          :color="btn.color || 'mint'"
          :external="true"
          class="whitespace-nowrap"
        />
      </div>
             
   <!-- Use v-html to render markup stored in the project's description (e.g. <br/>). 
     CAUTION: v-html renders raw HTML — sanitize if any content could come from users. -->
  <div class="mt-6 project-description" v-html="project.description" style="line-height:1.5;"></div>
  <div v-if="project.info" class="text-sm text-gray-600 pt-5 ">
      <hr class="my-6 border-t border-gray-200" style="height:1px; background:transparent;"/>

    <p>{{ project.info }}</p>
      <hr class="my-6 border-t border-gray-200" style="height:1px; background:transparent;"/>

  </div>
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
      <div v-if="similarProjects.length" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        <Card
          v-for="(p, index) in similarProjects"
          :key="`similar-${p.id}-${index}`"
          :title="p.title"
          :description="p.description"
          :image="getFirstImage(p)"
          :projectId="p.id.toString()"
        />
      </div>
      <p v-else class="text-sm text-gray-600">No similar projects.</p>
    </div>
  </main>
</template>

<script>
import projectsData from "../data/projects-resolved.js";
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
    // NEW
    sameProjectProjects() {
      if (!this.project) return [];

      const currentId = String(this.project.id);

      // Direct links from current project: inthesameprojectas: [33, 7]
      const directIds = Array.isArray(this.project.inthesameprojectas)
        ? this.project.inthesameprojectas.map((v) => String(v))
        : [];

      // Reverse links: other projects that include current project id
      const reverseIds = projectsData
        .filter((p) => String(p.id) !== currentId)
        .filter((p) => Array.isArray(p.inthesameprojectas))
        .filter((p) => p.inthesameprojectas.map((v) => String(v)).includes(currentId))
        .map((p) => String(p.id));

      const wantedIds = [...new Set([...directIds, ...reverseIds])];

      return wantedIds
        .map((id) => projectsData.find((p) => String(p.id) === id))
        .filter(Boolean)
        .filter((p) => String(p.id) !== currentId)
        .slice(0, 8);
    },

    similarProjects() {
      if (!this.project) return [];

      // 1) Same-project items first
      const same = this.sameProjectProjects || [];
      const sameIds = new Set(same.map((p) => String(p.id)));

      // 2) Then tag-based similar (excluding already included same-project items)
      const baseTags = (this.project.tags || []).map((t) => t.toString().toLowerCase());

      const candidates = this.otherProjects.filter(
        (p) => !sameIds.has(String(p.id))
      );

      let tagMatches = [];
      if (baseTags.length) {
        tagMatches = candidates.filter((p) => {
          const ptags = (p.tags || []).map((t) => t.toString().toLowerCase());
          return ptags.some((t) => baseTags.includes(t));
        });
      }

      return [...same, ...tagMatches].slice(0, 8);
    },
    projectButtons() {
      if (!this.project) return [];

      // accepte buttons ET boutons (tolérant)
      const rawButtons = Array.isArray(this.project.buttons)
        ? this.project.buttons
        : Array.isArray(this.project.boutons)
        ? this.project.boutons
        : [];

      if (rawButtons.length) {
        return rawButtons
          .filter((b) => b && b.label && b.url)
          .map((b) => ({
            label: String(b.label),
            url: String(b.url),
            color: b.color || "mint",
          }));
      }

      // fallback ancien format
      const out = [];
      if (this.project.figma) {
        out.push({ label: "View Figma", url: this.project.figma, color: "lavender" });
      }
      if (this.project.website) {
        out.push({ label: "View Website", url: this.project.website, color: "mint" });
      }
      return out;
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
   
    getFirstImage (p) {
      // try common fields: images array, thumbnail, image
      const img = (p.images && p.images[0]) || p.thumbnail || p.image
      if (img) {
        // if relative path to assets, make sure it's resolved by Vite
        try { return new URL(img, import.meta.url).href } catch { return img }
      }
      // fallback placeholder
      return new URL('../assets/project-1-placeholder.jpg', import.meta.url).href
    }
    ,
    readImg(img) {
      // if no image provided, return placeholder
      if (!img) {
        return new URL('../assets/project-1-placeholder.jpg', import.meta.url).href;
      }

      // if it's already an absolute URL (http(s) or protocol-relative), return as-is
      if (typeof img === 'string' && /^(https?:)?\/\//i.test(img.trim())) {
        return img.trim();
      }

      // try resolving a local/relative path via Vite; if that fails, return original value
      try {
        return new URL(img, import.meta.url).href;
      } catch {
        return img;
      }
    },

    // --- Helper functions for media handling used in the template ---

    isYouTubeUrl(url) {
      if (!url || typeof url !== "string") return false;
      const s = url.trim();
      return /(?:youtube\.com|youtu\.be)/i.test(s);
    },

    getYouTubeEmbedUrl(url) {
      if (!url || typeof url !== "string") return url;
      const s = url.trim();

      // Try to extract video id using several common YouTube URL patterns
      let id = null;

      // direct patterns: youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
      const shortMatch = s.match(/(?:youtu\.be\/|youtube\.com\/(?:embed|shorts)\/)([A-Za-z0-9_-]{11})/i);
      if (shortMatch && shortMatch[1]) id = shortMatch[1];

      // watch?v=ID or &v=ID in query string
      if (!id) {
        try {
          const parsed = new URL(s, "https://example.com"); // base to allow relative input
          const v = parsed.searchParams.get("v");
          if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) id = v;
        } catch (e) {
          // fallback: regex search for v= or v/ style
          const qMatch = s.match(/[?&]v=([A-Za-z0-9_-]{11})/i);
          if (qMatch && qMatch[1]) id = qMatch[1];
        }
      }

      // final fallback: attempt general regex for 11-char id anywhere
      if (!id) {
        const anyMatch = s.match(/([A-Za-z0-9_-]{11})/);
        if (anyMatch && anyMatch[1]) id = anyMatch[1];
      }

      if (id) {
        // Return canonical embed URL; disable related videos for a cleaner embed
        return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
      }

      // If we couldn't extract an id, return the original string (might still work)
      return s;
    },

    isVideoFile(path) {
      if (!path || typeof path !== "string") return false;
      // consider both remote and local file names
      const extMatch = path.split('?')[0].split('#')[0].match(/\.(mp4|webm|ogg|mov|m4v)$/i);
      return !!extMatch;
    }
  },
};
</script>
