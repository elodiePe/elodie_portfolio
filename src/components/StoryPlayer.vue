<template>
  <div class="story-player">
    <!-- Trigger -->
    <button
      v-if="!opened"
      type="button"
      class="story-trigger"
      @click="open"
    >
      <span aria-hidden="true">🎧</span>
      <span>Let me tell you the story</span>
    </button>

    <!-- Inline player -->
    <div v-else class="sp-panel" role="group" aria-label="Spoken description">
      <div class="sp-row">
        <!-- Speaking icon -->
        <div class="sp-avatar" :class="{ 'is-speaking': playing }" aria-hidden="true">
          <img :src="avatarSrc" class="sp-face" alt="" />
          <div class="sp-waves">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <!-- Play / pause -->
        <button
          type="button"
          class="sp-play"
          @click="toggle"
          :aria-label="playing ? 'Pause narration' : 'Play narration'"
        >
          <span aria-hidden="true">{{ playing ? '❚❚' : '▶' }}</span>
        </button>

        <!-- Progress (audio only) -->
        <div v-if="audioSrc" class="sp-progress">
          <input
            type="range"
            class="sp-bar"
            min="0"
            :max="duration || 0"
            step="0.1"
            :value="currentTime"
            @input="seek($event.target.value)"
            aria-label="Seek narration"
          />
          <div class="sp-time">{{ fmt(currentTime) }} / {{ fmt(duration) }}</div>
        </div>
        <!-- Browser-voice mode: no seekable duration -->
        <div v-else class="sp-progress">
          <span class="sp-status">{{ playing ? 'Telling the story…' : 'Ready when you are.' }}</span>
        </div>

        <!-- Close -->
        <button
          type="button"
          class="sp-close"
          @click="close"
          aria-label="Close narration"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      <audio
        v-if="audioSrc"
        ref="audioRef"
        :src="audioSrc"
        preload="metadata"
        @loadedmetadata="onMeta"
        @timeupdate="onTime"
        @play="playing = true"
        @pause="playing = false"
        @ended="onEnded"
      ></audio>

      <!-- Voice picker (browser-voice mode only) -->
      <div v-if="!audioSrc && voices.length" class="sp-voice-row">
        <label class="sp-voice">
          <span class="sr-only">Choose a voice</span>
          <select v-model="selectedVoiceURI" @change="onVoiceChange" aria-label="Choose a narration voice">
            <option v-for="v in voices" :key="v.voiceURI" :value="v.voiceURI">{{ v.name }}</option>
          </select>
        </label>
      </div>

      <p v-if="!speechSupported && !audioSrc" class="sp-warning" role="status">
        Your browser can't read this aloud — here's the transcript instead. 📖
      </p>

      <!-- Transcript, collapsed (accessible captions on demand) -->
      <details v-if="scriptText" class="sp-transcript">
        <summary>Show transcript</summary>
        <p>{{ scriptText }}</p>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoryPlayer",
  props: {
    project: { type: Object, default: null },
    story: { type: Object, default: null },
  },
  data() {
    return {
      opened: false,
      playing: false,
      currentTime: 0,
      duration: 0,
      voices: [],
      selectedVoiceURI: "",
      utterances: [],
      speechSupported:
        typeof window !== "undefined" && "speechSynthesis" in window,
    };
  },
  computed: {
    audioSrc() {
      return (
        (this.story && this.story.audio) ||
        (this.project && this.project.audio) ||
        null
      );
    },
    avatarSrc() {
      return new URL("../assets/elodie_logo_portfolio.svg", import.meta.url).href;
    },
    scriptText() {
      return (this.story && this.story.script) || "";
    },
  },
  mounted() {
    if (this.speechSupported) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = this.loadVoices;
    }
  },
  beforeUnmount() {
    this.stopAll();
    if (this.speechSupported) window.speechSynthesis.onvoiceschanged = null;
  },
  methods: {
    open() {
      this.opened = true;
      this.$nextTick(() => this.startPlayback());
    },
    close() {
      this.stopAll();
      this.opened = false;
    },
    startPlayback() {
      if (this.audioSrc) {
        const a = this.$refs.audioRef;
        if (a) a.play().catch(() => {});
      } else {
        this.startSpeech();
      }
    },
    toggle() {
      if (this.audioSrc) {
        const a = this.$refs.audioRef;
        if (!a) return;
        if (a.paused) a.play().catch(() => {});
        else a.pause();
      } else {
        this.toggleSpeech();
      }
    },
    seek(val) {
      const a = this.$refs.audioRef;
      if (a) a.currentTime = Number(val);
      this.currentTime = Number(val);
    },
    onMeta(e) {
      this.duration = e.target.duration || 0;
    },
    onTime(e) {
      this.currentTime = e.target.currentTime || 0;
    },
    onEnded() {
      this.playing = false;
      this.currentTime = 0;
    },
    fmt(sec) {
      if (!sec || Number.isNaN(sec)) return "0:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${String(s).padStart(2, "0")}`;
    },
    // --- Browser speech fallback ---
    loadVoices() {
      if (!this.speechSupported) return;
      const all = window.speechSynthesis.getVoices() || [];
      const en = all.filter((v) => /^en(-|_|$)/i.test(v.lang));
      this.voices = en.length ? en : all;
      if (!this.selectedVoiceURI && this.voices.length) {
        this.selectedVoiceURI = this.pickVoice(this.voices).voiceURI;
      }
    },
    pickVoice(list) {
      const prefer = [/natural/i, /google/i, /samantha/i, /aria|jenny|zira|libby/i];
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
    startSpeech() {
      if (!this.speechSupported || !this.scriptText) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(this.scriptText);
      const v = this.currentVoice();
      if (v) {
        u.voice = v;
        u.lang = v.lang;
      }
      u.rate = 1.0;
      u.pitch = 1.15;
      u.onend = () => {
        this.playing = false;
      };
      this.utterances = [u];
      this.playing = true;
      synth.speak(u);
    },
    toggleSpeech() {
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
    },
    onVoiceChange() {
      if (this.playing && !this.audioSrc) this.startSpeech();
    },
    stopAll() {
      if (this.speechSupported) window.speechSynthesis.cancel();
      const a = this.$refs.audioRef;
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
      this.playing = false;
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

/* Trigger */
.story-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-radius: 9999px;
  border: 2px solid var(--accent);
  background: var(--accent);
  color: var(--color-accent);
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}
.story-trigger:hover {
  transform: translateY(-1px);
  background: #6b21a8;
}
.story-trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.story-trigger-sub {
  font-weight: 400;
  font-size: 0.8rem;
  opacity: 0.85;
}

/* Inline player */
.sp-panel {
  border: 2px solid var(--accent);
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  background: #fffdf7;
  width: 100%;
}
.sp-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

/* Speaking icon */
.sp-avatar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.sp-face {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: contain;
  background: #fff;
  border: 2px solid var(--accent);
  padding: 3px;
}
.sp-avatar.is-speaking .sp-face {
  animation: sp-bob 0.6s ease-in-out infinite;
}
@keyframes sp-bob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-2px) rotate(-2.5deg); }
  75% { transform: translateY(1px) rotate(2.5deg); }
}
.sp-waves {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 22px;
}
.sp-waves span {
  width: 3px;
  height: 5px;
  border-radius: 3px;
  background: var(--accent);
  opacity: 0.8;
}
.sp-avatar.is-speaking .sp-waves span {
  animation: sp-wave 0.9s ease-in-out infinite;
}
.sp-waves span:nth-child(1) { animation-delay: 0s; }
.sp-waves span:nth-child(2) { animation-delay: 0.18s; }
.sp-waves span:nth-child(3) { animation-delay: 0.36s; }
.sp-waves span:nth-child(4) { animation-delay: 0.12s; }
.sp-waves span:nth-child(5) { animation-delay: 0.28s; }
@keyframes sp-wave {
  0%, 100% { height: 5px; }
  50% { height: 20px; }
}

/* Play/pause */
.sp-play {
  flex-shrink: 0;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 9999px;
  border: none;
  background: var(--accent);
  color: var(--color-accent);
  font-size: 0.9rem;
  cursor: pointer;
}
.sp-play:hover { background: #6b21a8; }

/* Progress */
.sp-progress {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sp-bar {
  width: 100%;
  accent-color: var(--accent);
  cursor: pointer;
}
.sp-time {
  font-size: 0.75rem;
  color: #6b5b8a;
  font-variant-numeric: tabular-nums;
}
.sp-status {
  font-size: 0.85rem;
  color: #6b5b8a;
}

.sp-close {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: none;
  background: #efe9f7;
  color: var(--accent);
  cursor: pointer;
}

.sp-play:focus-visible,
.sp-close:focus-visible,
.sp-bar:focus-visible,
.sp-voice select:focus-visible,
.sp-transcript summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.sp-voice-row { margin-top: 0.5rem; }
.sp-voice select {
  max-width: 14rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #cbb9e6;
  background: #fff;
  color: #241a3a;
  font-size: 0.8rem;
}
.sp-warning {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #6b5b8a;
}
.sp-transcript {
  margin-top: 0.6rem;
  font-size: 0.9rem;
}
.sp-transcript summary {
  cursor: pointer;
  color: var(--accent);
  font-weight: 600;
  width: fit-content;
}
.sp-transcript p {
  margin-top: 0.5rem;
  line-height: 1.7;
  color: #241a3a;
}

@media (prefers-reduced-motion: reduce) {
  .story-trigger { transition: none; }
  .sp-avatar.is-speaking .sp-face,
  .sp-avatar.is-speaking .sp-waves span {
    animation: none;
  }
}
</style>
