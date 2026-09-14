<template>
  <router-link
    :to="{ name: 'Project', params: { id: projectId } }"
    class="pcard group"
    :aria-label="`${$t('card.viewOf')} ${title}`"
    :style="{ '--accent': meta.accent }"
  >
    <div class="pcard-frame">
      <img
        :src="image"
        alt=""
        class="pcard-img"
        :class="loading ? 'opacity-0' : 'opacity-100'"
        @load="onLoad"
        @error="onError"
      />

      <!-- loading spinner -->
      <div v-if="loading" class="pcard-state">
        <div class="pcard-spinner" aria-hidden="true"></div>
      </div>
      <!-- error state -->
      <div v-if="errored && !loading" class="pcard-state pcard-state--err">
        <svg class="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- top-right voiced teaser -->
      <span v-if="meta.voiced" class="pcard-voiced" aria-hidden="true">🎧</span>

      <!-- always-visible title -->
      <div class="pcard-titlebar">
        <h2 class="pcard-title">{{ title }}</h2>
      </div>

      <!-- simple hover overlay -->
      <div class="pcard-hover-overlay" aria-hidden="true">
        <span class="pcard-cta">{{ $t('card.view') }} <span aria-hidden="true">→</span></span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { getCardMeta } from "../data/projectMeta.js";

export default {
  props: {
    title: String,
    description: String,
    image: String,
    projectId: {
      type: String,
      required: true,
    },
    // full project object (optional) — enables hooks + badges
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      errored: false,
    };
  },
  computed: {
    meta() {
      return getCardMeta(
        this.project || { id: this.projectId, title: this.title }
      );
    },
  },
  methods: {
    onLoad() {
      this.loading = false;
      this.errored = false;
    },
    onError() {
      this.loading = false;
      this.errored = true;
    },
  },
};
</script>

<style scoped>
.pcard {
  display: block;
  border-radius: 0.9rem;
  overflow: hidden;
  outline: none;
  transition: box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
.pcard:hover {
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
}
.pcard:focus-visible {
  box-shadow: 0 0 0 3px var(--accent), 0 10px 22px rgba(0, 0, 0, 0.18);
}

.pcard-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #efe9f7;
  overflow: hidden;
}
.pcard-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.pcard-state {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 250, 251, 0.6);
}
.pcard-state--err {
  background: #f3f4f6;
}
.pcard-spinner {
  width: 2.4rem;
  height: 2.4rem;
  border: 4px solid #e5e7eb;
  border-top-color: #422d79;
  border-radius: 9999px;
  animation: pcard-spin 0.8s linear infinite;
}
@keyframes pcard-spin {
  to { transform: rotate(360deg); }
}

.pcard-voiced {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 9999px;
  width: 1.9rem;
  height: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.pcard-titlebar {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  z-index: 2;
  padding: 0.5rem 0.6rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0));
}
.pcard-title {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
@media (min-width: 768px) {
  .pcard-title { font-size: 1rem; }
}

/* Simple hover: a dark overlay with a "view project" cue, nothing else moves */
.pcard-hover-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.38);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.pcard:hover .pcard-hover-overlay,
.pcard:focus-within .pcard-hover-overlay {
  opacity: 1;
}
.pcard-cta {
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

@media (prefers-reduced-motion: reduce) {
  .pcard,
  .pcard-img,
  .pcard-hover-overlay {
    transition: none;
  }
  .pcard-spinner {
    animation: none;
  }
}
</style>
