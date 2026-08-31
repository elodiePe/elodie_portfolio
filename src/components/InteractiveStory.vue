<template>
  <Teleport to="body">
    <Transition name="story-fade">
      <div
        v-if="open"
        class="story-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="`Interactive story: ${project?.title || 'project'}`"
        ref="overlayRef"
        @keydown.esc.prevent="close"
        @keydown.tab="trapFocus"
      >
        <div class="story-backdrop" @click="close" aria-hidden="true"></div>

        <div class="story-panel" role="document">
          <!-- Header -->
          <div class="story-header">
            <div>
              <p class="story-eyebrow">Interactive description</p>
              <h2 :id="titleId" class="story-title">{{ project?.title }}</h2>
            </div>
            <button
              type="button"
              class="story-close"
              aria-label="Close interactive description"
              ref="closeBtnRef"
              @click="close"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div class="story-body">
            <!-- Images -->
            <div class="story-media" v-if="displayImages.length">
              <div class="story-stage">
                <img
                  v-for="(img, idx) in displayImages"
                  :key="idx"
                  :src="img"
                  :alt="`${project?.title} — image ${idx + 1} of ${displayImages.length}`"
                  class="story-slide"
                  :class="{ 'is-active': idx === imageIndex }"
                />
              </div>
              <div v-if="displayImages.length > 1" class="story-dots">
                <button
                  v-for="(img, idx) in displayImages"
                  :key="idx"
                  type="button"
                  class="story-dot"
                  :class="{ 'is-active': idx === imageIndex }"
                  :aria-label="`Show image ${idx + 1}`"
                  :aria-current="idx === imageIndex ? 'true' : undefined"
                  @click="imageIndex = idx"
                ></button>
              </div>
            </div>

            <!-- Narration -->
            <div class="story-narration">
              <!-- Recorded audio path -->
              <div v-if="story?.audio" class="story-audio">
                <audio
                  ref="audioRef"
                  :src="story.audio"
                  controls
                  class="w-full"
                  @play="onAudioPlay"
                  @pause="playing = false"
                  @ended="onAudioEnded"
                ></audio>
                <p class="story-hint">🎧 Narrated by Elodie's chosen voice.</p>
              </div>

              <!-- Browser-voice controls -->
              <div v-else class="story-controls">
                <button
                  type="button"
                  class="story-play"
                  @click="togglePlay"
                  :aria-label="playing ? 'Pause narration' : 'Play narration'"
                >
                  <span aria-hidden="true">{{ playing ? '❚❚ Pause' : '▶ Play the story' }}</span>
                </button>
                <button
                  type="button"
                  class="story-restart"
                  @click="restart"
                  aria-label="Restart narration from the beginning"
                >
                  <span aria-hidden="true">↺</span>
                </button>

                <label class="story-voice" v-if="voices.length">
                  <span class="sr-only">Choose a voice</span>
                  <select v-model="selectedVoiceURI" @change="onVoiceChange" aria-label="Choose a narration voice">
                    <option v-for="v in voices" :key="v.voiceURI" :value="v.voiceURI">
                      {{ v.name }}
                    </option>
                  </select>
                </label>
              </div>

              <p v-if="!speechSupported && !story?.audio" class="story-warning" role="status">
                Your browser can't read this aloud, but you can enjoy the story below. 📖
              </p>

              <!-- Transcript (doubles as captions) -->
              <div class="story-transcript" aria-live="off">
                <span
                  v-for="(sentence, idx) in sentences"
                  :key="idx"
                  class="story-sentence"
                  :class="{ 'is-speaking': idx === activeSentence }"
                >{{ sentence }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: "InteractiveStory",
  props: {
    open: { type: Boolean, default: false },
    project: { type: Object, default: null },
    story: { type: Object, default: null },
  },
  emits: ["close"],
  data() {
    return {
      titleId: `story-title-${Math.random().toString(36).slice(2, 8)}`,
      playing: false,
      activeSentence: -1,
      imageIndex: 0,
      voices: [],
      selectedVoiceURI: "",
      utterances: [],
      imageTimer: null,
      speechSupported:
        typeof window !== "undefined" && "speechSynthesis" in window,
      lastFocused: null,
    };
  },
  computed: {
    scriptText() {
      return (this.story && this.story.script) || "";
    },
    sentences() {
      if (!this.scriptText) return [];
      // Split on sentence boundaries but keep it readable
      return this.scriptText
        .replace(/\s+/g, " ")
        .match(/[^.!?…]+[.!?…]*/g)
        ?.map((s) => s.trim())
        .filter(Boolean) || [this.scriptText];
    },
    displayImages() {
      const imgs = (this.project && this.project.images) || [];
      // Only real image URLs (skip youtube / video files in the story stage)
      return imgs.filter(
        (u) =>
          typeof u === "string" &&
          !/youtube\.com|youtu\.be/i.test(u) &&
          !/\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(u)
      );
    },
  },
  watch: {
    open(isOpen) {
      if (isOpen) this.onOpen();
      else this.onClose();
    },
  },
  mounted() {
    if (this.speechSupported) {
      this.loadVoices();
      // Voices load asynchronously in most browsers
      window.speechSynthesis.onvoiceschanged = this.loadVoices;
    }
  },
  beforeUnmount() {
    this.stopSpeech();
    this.clearImageTimer();
    if (this.speechSupported) window.speechSynthesis.onvoiceschanged = null;
  },
  methods: {
    onOpen() {
      this.lastFocused = document.activeElement;
      this.activeSentence = -1;
      this.imageIndex = 0;
      document.body.style.overflow = "hidden";
      this.$nextTick(() => {
        if (this.$refs.closeBtnRef) this.$refs.closeBtnRef.focus();
      });
    },
    onClose() {
      this.stopSpeech();
      this.clearImageTimer();
      document.body.style.overflow = "";
      // Return focus to whatever opened the dialog
      if (this.lastFocused && typeof this.lastFocused.focus === "function") {
        this.lastFocused.focus();
      }
    },
    close() {
      this.$emit("close");
    },
    loadVoices() {
      if (!this.speechSupported) return;
      const all = window.speechSynthesis.getVoices() || [];
      // Prefer English voices; fall back to everything
      const en = all.filter((v) => /^en(-|_|$)/i.test(v.lang));
      this.voices = en.length ? en : all;
      if (!this.selectedVoiceURI && this.voices.length) {
        this.selectedVoiceURI = this.pickHappyVoice(this.voices).voiceURI;
      }
    },
    pickHappyVoice(list) {
      // Prefer richer / more natural voices when available
      const prefer = [
        /natural/i,
        /google/i,
        /samantha/i,
        /aria|jenny|zira|libby/i,
      ];
      for (const rx of prefer) {
        const hit = list.find((v) => rx.test(v.name));
        if (hit) return hit;
      }
      return list[0];
    },
    currentVoice() {
      return (
        this.voices.find((v) => v.voiceURI === this.selectedVoiceURI) ||
        this.voices[0] ||
        null
      );
    },
    buildUtterances() {
      this.utterances = this.sentences.map((sentence, idx) => {
        const u = new SpeechSynthesisUtterance(sentence);
        const v = this.currentVoice();
        if (v) {
          u.voice = v;
          u.lang = v.lang;
        }
        u.rate = 1.0;
        u.pitch = 1.15; // a touch brighter / happier
        u.onstart = () => {
          this.activeSentence = idx;
          // advance images roughly with the story
          if (this.displayImages.length > 1) {
            this.imageIndex = Math.min(
              this.displayImages.length - 1,
              Math.floor((idx / this.sentences.length) * this.displayImages.length)
            );
          }
        };
        u.onend = () => {
          if (idx === this.sentences.length - 1) {
            this.playing = false;
            this.activeSentence = -1;
          }
        };
        return u;
      });
    },
    togglePlay() {
      if (!this.speechSupported) return;
      const synth = window.speechSynthesis;
      if (this.playing) {
        synth.pause();
        this.playing = false;
        return;
      }
      // Resume if we were mid-way through
      if (synth.paused && synth.speaking) {
        synth.resume();
        this.playing = true;
        return;
      }
      this.startSpeech();
    },
    startSpeech() {
      const synth = window.speechSynthesis;
      synth.cancel();
      this.buildUtterances();
      this.playing = true;
      this.utterances.forEach((u) => synth.speak(u));
    },
    restart() {
      this.stopSpeech();
      this.activeSentence = -1;
      this.imageIndex = 0;
      this.$nextTick(() => this.startSpeech());
    },
    stopSpeech() {
      if (this.speechSupported) window.speechSynthesis.cancel();
      this.playing = false;
    },
    onVoiceChange() {
      // If currently playing, restart with the new voice
      if (this.playing) this.restart();
    },
    onAudioPlay() {
      this.playing = true;
      this.startImageTimer();
    },
    onAudioEnded() {
      this.playing = false;
      this.clearImageTimer();
    },
    startImageTimer() {
      this.clearImageTimer();
      if (this.displayImages.length < 2) return;
      this.imageTimer = setInterval(() => {
        this.imageIndex = (this.imageIndex + 1) % this.displayImages.length;
      }, 4000);
    },
    clearImageTimer() {
      if (this.imageTimer) {
        clearInterval(this.imageTimer);
        this.imageTimer = null;
      }
    },
    trapFocus(e) {
      const focusables = this.$refs.overlayRef.querySelectorAll(
        'button, [href], select, audio, input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
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

.story-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.story-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(17, 12, 34, 0.7);
  backdrop-filter: blur(3px);
}
.story-panel {
  position: relative;
  width: 100%;
  max-width: 60rem;
  max-height: 92vh;
  overflow-y: auto;
  background: #fffdf7;
  color: #241a3a;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}
.story-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, var(--color-brand), #6b21a8);
  color: var(--color-accent);
  border-radius: 1rem 1rem 0 0;
}
.story-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
  margin: 0;
}
.story-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.15rem 0 0;
  line-height: 1.2;
}
.story-close {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-accent);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.15s ease;
}
.story-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
.story-close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.story-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .story-body {
    grid-template-columns: 1.1fr 1fr;
  }
}

.story-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #efe9f7;
  border-radius: 0.75rem;
  overflow: hidden;
}
.story-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.story-slide.is-active {
  opacity: 1;
}
.story-dots {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.6rem;
}
.story-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  border: none;
  background: #cbb9e6;
  cursor: pointer;
  padding: 0;
}
.story-dot.is-active {
  background: var(--color-brand);
}
.story-dot:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

.story-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.9rem;
}
.story-play {
  background: var(--color-brand);
  color: var(--color-accent);
  border: none;
  border-radius: 9999px;
  padding: 0.55rem 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}
.story-play:hover {
  background: #6b21a8;
}
.story-restart {
  background: #efe9f7;
  color: var(--color-brand);
  border: none;
  border-radius: 9999px;
  width: 2.4rem;
  height: 2.4rem;
  font-size: 1.1rem;
  cursor: pointer;
}
.story-play:focus-visible,
.story-restart:focus-visible,
.story-voice select:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
.story-voice select {
  max-width: 12rem;
  padding: 0.4rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #cbb9e6;
  background: #fff;
  color: #241a3a;
  font-size: 0.85rem;
}
.story-audio {
  margin-bottom: 0.9rem;
}
.story-hint,
.story-warning {
  font-size: 0.8rem;
  color: #6b5b8a;
  margin-top: 0.4rem;
}
.story-transcript {
  font-size: 1.05rem;
  line-height: 1.7;
}
.story-sentence {
  transition: background 0.2s ease, color 0.2s ease;
  border-radius: 0.25rem;
  margin-right: 0.3em;
}
.story-sentence.is-speaking {
  background: #fde68a;
  color: #241a3a;
  box-shadow: 0 0 0 3px #fde68a;
}

/* Transitions */
.story-fade-enter-active,
.story-fade-leave-active {
  transition: opacity 0.25s ease;
}
.story-fade-enter-from,
.story-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .story-slide,
  .story-sentence,
  .story-fade-enter-active,
  .story-fade-leave-active {
    transition: none;
  }
}
</style>
