<template>
  <Teleport to="body">
    <transition name="tour-fade">
      <div
        v-if="open"
        class="tour"
        role="dialog"
        aria-modal="true"
        aria-label="Guided tour of Elodie's projects"
        ref="root"
        @keydown.esc.prevent="close"
        @keydown.tab="trapFocus"
      >
        <div class="tour-backdrop" @click="close" aria-hidden="true"></div>

        <div class="tour-panel" v-if="current">
          <!-- header -->
          <div class="tour-head">
            <div class="tour-progress-wrap">
              <p class="tour-eyebrow">{{ $t('tour.eyebrow') }}</p>
              <p class="tour-count">{{ $t('tour.project') }} {{ index + 1 }} {{ $t('tour.of') }} {{ featured.length }}</p>
              <div class="tour-progress" aria-hidden="true">
                <span
                  v-for="(f, i) in featured"
                  :key="i"
                  class="tour-tick"
                  :class="{ done: i < index, active: i === index }"
                ></span>
              </div>
            </div>
            <button
              type="button"
              class="tour-close"
              ref="closeBtn"
              :aria-label="$t('tour.close')"
              @click="close"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <!-- stage -->
          <div class="tour-stage">
            <img
              v-for="(img, i) in currentImages"
              :key="current.id + '-' + i"
              :src="img"
              :alt="`${current.title} — image ${i + 1} of ${currentImages.length}`"
              class="tour-slide"
              :class="{ 'is-active': i === imageIndex }"
            />
            <div class="tour-avatar" :class="{ 'is-speaking': playing }" aria-hidden="true">
              <img :src="avatarSrc" class="tour-face" alt="" />
              <div class="tour-waves"><span></span><span></span><span></span><span></span><span></span></div>
            </div>
          </div>

          <!-- caption -->
          <div class="tour-caption">
            <h2 class="tour-title">{{ current.title }}</h2>
            <p v-if="current.hook" class="tour-hook">{{ current.hook }}</p>
          </div>

          <!-- hidden audio driver -->
          <audio
            v-if="current.audioSrc"
            ref="audio"
            :src="current.audioSrc"
            @ended="onEnded"
            @play="playing = true"
            @pause="playing = false"
          ></audio>

          <!-- controls -->
          <div class="tour-controls">
            <button type="button" class="tour-nav" :disabled="index === 0" @click="prev" :aria-label="$t('tour.prevProject')">
              <span aria-hidden="true">{{ $t('tour.prev') }}</span>
            </button>

            <button type="button" class="tour-play" @click="togglePlay" :aria-label="playing ? $t('story.pause') : $t('story.play')">
              <span aria-hidden="true">{{ playing ? $t('tour.pause') : $t('tour.play') }}</span>
            </button>

            <button type="button" class="tour-nav" @click="next" :aria-label="$t('tour.nextProject')">
              <span aria-hidden="true">{{ index === featured.length - 1 ? $t('tour.finish') : $t('tour.next') }}</span>
            </button>
          </div>

          <details v-if="current.script" class="tour-transcript">
            <summary>{{ $t('tour.transcript') }}</summary>
            <p>{{ current.script }}</p>
          </details>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import projectsData from "../data/projects-resolved.js";
import { getStory } from "../data/stories.js";
import { getCardMeta } from "../data/projectMeta.js";

export default {
  name: "GuidedTour",
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ["close"],
  data() {
    return {
      index: 0,
      playing: false,
      imageIndex: 0,
      imageTimer: null,
      lastFocused: null,
      speechSupported:
        typeof window !== "undefined" && "speechSynthesis" in window,
    };
  },
  computed: {
    avatarSrc() {
      return new URL("../assets/elodie_logo_portfolio.svg", import.meta.url).href;
    },
    // Featured = every project that has a spoken story or an audio file.
    featured() {
      return projectsData
        .filter((p) => getStory(p.id) || p.audio)
        .map((p) => {
          const story = getStory(p.id);
          const meta = getCardMeta(p);
          const images = (p.images || []).filter(
            (u) =>
              typeof u === "string" &&
              !/youtube\.com|youtu\.be/i.test(u) &&
              !/\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(u)
          );
          return {
            id: p.id,
            title: p.title,
            hook: meta.hook,
            images,
            script: (story && story.script) || "",
            audioSrc: (story && story.audio) || p.audio || null,
          };
        });
    },
    current() {
      return this.featured[this.index] || null;
    },
    currentImages() {
      return (this.current && this.current.images) || [];
    },
  },
  watch: {
    open(v) {
      if (v) this.onOpen();
      else this.onClose();
    },
  },
  beforeUnmount() {
    this.stopMedia();
    this.clearImageTimer();
  },
  methods: {
    onOpen() {
      this.lastFocused = document.activeElement;
      this.index = 0;
      this.imageIndex = 0;
      document.body.style.overflow = "hidden";
      this.$nextTick(() => {
        if (this.$refs.closeBtn) this.$refs.closeBtn.focus();
        this.startCurrent();
      });
    },
    onClose() {
      this.stopMedia();
      this.clearImageTimer();
      document.body.style.overflow = "";
      if (this.lastFocused && this.lastFocused.focus) this.lastFocused.focus();
    },
    close() {
      this.$emit("close");
    },
    startCurrent() {
      this.stopMedia();
      this.imageIndex = 0;
      this.startImageTimer();
      if (this.current && this.current.audioSrc) {
        this.$nextTick(() => {
          const a = this.$refs.audio;
          if (a) {
            a.load();
            a.play().catch(() => {});
          }
        });
      } else {
        this.startSpeech();
      }
    },
    togglePlay() {
      if (this.current && this.current.audioSrc) {
        const a = this.$refs.audio;
        if (!a) return;
        if (a.paused) a.play().catch(() => {});
        else a.pause();
      } else if (this.speechSupported) {
        const synth = window.speechSynthesis;
        if (this.playing) {
          synth.pause();
          this.playing = false;
        } else if (synth.paused && synth.speaking) {
          synth.resume();
          this.playing = true;
        } else {
          this.startSpeech();
        }
      }
    },
    startSpeech() {
      if (!this.speechSupported || !this.current || !this.current.script) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(this.current.script);
      const v = (synth.getVoices() || []).find((x) => /^en/i.test(x.lang));
      if (v) {
        u.voice = v;
        u.lang = v.lang;
      }
      u.rate = 1.0;
      u.pitch = 1.15;
      u.onend = () => {
        if (this.playing) this.onEnded();
      };
      this.playing = true;
      synth.speak(u);
    },
    stopMedia() {
      if (this.speechSupported) window.speechSynthesis.cancel();
      const a = this.$refs.audio;
      if (a) {
        a.pause();
        try { a.currentTime = 0; } catch { /* ignore */ }
      }
      this.playing = false;
    },
    onEnded() {
      // auto-advance to the next project, or stop at the end
      if (this.index < this.featured.length - 1) {
        this.next();
      } else {
        this.playing = false;
        this.clearImageTimer();
      }
    },
    next() {
      if (this.index < this.featured.length - 1) {
        this.index += 1;
        this.startCurrent();
      } else {
        this.close();
      }
    },
    prev() {
      if (this.index > 0) {
        this.index -= 1;
        this.startCurrent();
      }
    },
    startImageTimer() {
      this.clearImageTimer();
      if (this.currentImages.length < 2) return;
      this.imageTimer = setInterval(() => {
        this.imageIndex = (this.imageIndex + 1) % this.currentImages.length;
      }, 3500);
    },
    clearImageTimer() {
      if (this.imageTimer) {
        clearInterval(this.imageTimer);
        this.imageTimer = null;
      }
    },
    trapFocus(e) {
      const f = this.$refs.root.querySelectorAll(
        'button, [href], select, audio, summary, [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
  },
};
</script>

<style scoped>
.tour {
  position: fixed;
  inset: 0;
  z-index: 210;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.tour-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(17, 12, 34, 0.78);
  backdrop-filter: blur(3px);
}
.tour-panel {
  position: relative;
  width: 100%;
  max-width: 46rem;
  max-height: 92vh;
  overflow-y: auto;
  background: #fffdf7;
  border-radius: 1rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  padding: 1.1rem 1.2rem 1.3rem;
}
.tour-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
}
.tour-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
}
.tour-count {
  font-size: 0.85rem;
  color: #6b5b8a;
  margin-top: 2px;
}
.tour-progress {
  display: flex;
  gap: 4px;
  margin-top: 6px;
}
.tour-tick {
  height: 4px;
  width: 22px;
  border-radius: 9999px;
  background: #e0d7f0;
}
.tour-tick.done { background: var(--accent); opacity: 0.5; }
.tour-tick.active { background: var(--accent); }
.tour-close {
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 9999px;
  border: none;
  background: #efe9f7;
  color: var(--accent);
  cursor: pointer;
}

.tour-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #efe9f7;
  border-radius: 0.75rem;
  overflow: hidden;
}
.tour-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.tour-slide.is-active { opacity: 1; }

.tour-avatar {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px 5px 5px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 9999px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
.tour-face {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: contain;
  background: #fff;
  border: 2px solid var(--accent);
  padding: 3px;
}
.tour-avatar.is-speaking .tour-face {
  animation: tour-bob 0.6s ease-in-out infinite;
}
@keyframes tour-bob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-2px) rotate(-2.5deg); }
  75% { transform: translateY(1px) rotate(2.5deg); }
}
.tour-waves { display: flex; align-items: center; gap: 3px; height: 22px; }
.tour-waves span { width: 3px; height: 5px; border-radius: 3px; background: var(--accent); opacity: 0.8; }
.tour-avatar.is-speaking .tour-waves span { animation: tour-wave 0.9s ease-in-out infinite; }
.tour-waves span:nth-child(1) { animation-delay: 0s; }
.tour-waves span:nth-child(2) { animation-delay: 0.18s; }
.tour-waves span:nth-child(3) { animation-delay: 0.36s; }
.tour-waves span:nth-child(4) { animation-delay: 0.12s; }
.tour-waves span:nth-child(5) { animation-delay: 0.28s; }
@keyframes tour-wave { 0%, 100% { height: 5px; } 50% { height: 20px; } }

.tour-caption { margin-top: 0.8rem; }
.tour-title { font-size: 1.25rem; font-weight: 700; color: #241a3a; }
.tour-hook { color: #4b3e63; margin-top: 2px; }

.tour-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1rem;
}
.tour-nav, .tour-play {
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 600;
}
.tour-nav {
  padding: 0.5rem 0.9rem;
  background: #efe9f7;
  color: var(--accent);
}
.tour-nav:disabled { opacity: 0.4; cursor: default; }
.tour-play {
  padding: 0.55rem 1.4rem;
  background: var(--accent);
  color: #fff;
}
.tour-close:focus-visible,
.tour-nav:focus-visible,
.tour-play:focus-visible,
.tour-transcript summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.tour-transcript { margin-top: 0.8rem; font-size: 0.9rem; }
.tour-transcript summary { cursor: pointer; color: var(--accent); font-weight: 600; width: fit-content; }
.tour-transcript p { margin-top: 0.5rem; line-height: 1.7; color: #241a3a; }

.tour-fade-enter-active, .tour-fade-leave-active { transition: opacity 0.25s ease; }
.tour-fade-enter-from, .tour-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .tour-slide,
  .tour-fade-enter-active,
  .tour-fade-leave-active { transition: none; }
  .tour-avatar.is-speaking .tour-face,
  .tour-avatar.is-speaking .tour-waves span { animation: none; }
}
</style>
