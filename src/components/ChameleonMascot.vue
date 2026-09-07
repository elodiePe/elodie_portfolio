<template>
  <div class="cham" :class="{ 'is-idle': !reduceMotion }">
    <!-- little speech bubble hint (first visit) -->
    <transition name="cham-tip">
      <div v-if="showTip" class="cham-tip" role="note">
        {{ $t('cham.tip') }} <span aria-hidden="true">🦎</span>
      </div>
    </transition>

    <button
      type="button"
      class="cham-btn"
      @click="cycle"
      :aria-label="`${$t('cham.change')} ${palette[index].name}`"
    >
      <span class="sr-only" aria-live="polite">{{ $t('cham.current') }} {{ palette[index].name }}</span>
      <svg viewBox="0 0 72 64" class="cham-svg" aria-hidden="true" focusable="false">
        <g class="cham-inner">
          <!-- curled tail -->
          <path
            class="cham-body"
            d="M18 42 c -9 1 -13 9 -8 14 c 4 4 11 3 12 -3 c 1 -4 -3 -7 -6 -5 c -2 1 -2 4 0 5"
            fill="none"
            :stroke="accent"
            stroke-width="5"
            stroke-linecap="round"
          />
          <!-- body -->
          <path
            class="cham-body"
            d="M17 41
               C 10 39, 9 30, 15 26
               C 22 21, 33 21, 41 24
               C 45 20, 47 15, 52 15
               C 58 15, 61 21, 58 27
               C 63 27, 66 24, 68 25
               C 66 30, 61 31, 57 30
               C 55 37, 46 43, 34 43
               C 27 43, 21 43, 17 41 Z"
            :fill="accent"
          />
          <!-- belly highlight -->
          <path
            d="M20 41 C 27 44, 42 43, 52 35 C 46 41, 34 43, 24 42 Z"
            fill="rgba(255,255,255,0.18)"
          />
          <!-- crest -->
          <path
            d="M45 18 q4 -6 9 -4 q-3 1 -4 5 z"
            fill="rgba(0,0,0,0.15)"
          />
          <!-- legs -->
          <path d="M26 42 l-2 8 m8 -8 l1 8" :stroke="accent" stroke-width="4" stroke-linecap="round" />
          <!-- eye -->
          <circle class="cham-eye" cx="53" cy="24" r="5" fill="#fffdf7" />
          <circle class="cham-pupil" cx="54" cy="24" r="2.2" fill="#241a3a" />
          <!-- tongue -->
          <g class="cham-tongue" :class="{ out: tongueOut }">
            <line x1="62" y1="26" x2="70" y2="26" stroke="#e11d63" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="70" cy="26" r="2.4" fill="#e11d63" />
          </g>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
const STORE_KEY = "cham-accent-index";
const TIP_KEY = "cham-tip-seen";

export default {
  name: "ChameleonMascot",
  data() {
    return {
      index: 0,
      tongueOut: false,
      showTip: false,
      palette: [
        { name: "Purple", color: "#422D79" },
        { name: "Ocean", color: "#0369a1" },
        { name: "Forest", color: "#047857" },
        { name: "Sunset", color: "#b45309" },
        { name: "Berry", color: "#be185d" },
        { name: "Violet", color: "#6d28d9" },
      ],
      reduceMotion: false,
    };
  },
  computed: {
    accent() {
      return this.palette[this.index].color;
    },
  },
  mounted() {
    try {
      if (typeof window !== "undefined" && window.matchMedia) {
        this.reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
      }
      const saved = Number(localStorage.getItem(STORE_KEY));
      if (!Number.isNaN(saved) && saved >= 0 && saved < this.palette.length) {
        this.index = saved;
      }
    } catch {
      /* ignore storage issues */
    }
    this.applyAccent();

    // Show the hint once, briefly, on first ever visit.
    try {
      if (!localStorage.getItem(TIP_KEY)) {
        setTimeout(() => {
          this.showTip = true;
        }, 1400);
        setTimeout(() => {
          this.showTip = false;
        }, 7000);
      }
    } catch {
      /* ignore */
    }
  },
  methods: {
    applyAccent() {
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--accent", this.accent);
      }
    },
    cycle() {
      this.index = (this.index + 1) % this.palette.length;
      this.applyAccent();
      try {
        localStorage.setItem(STORE_KEY, String(this.index));
        localStorage.setItem(TIP_KEY, "1");
      } catch {
        /* ignore */
      }
      this.showTip = false;
      // tongue flick
      this.tongueOut = true;
      setTimeout(() => {
        this.tongueOut = false;
      }, 350);
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

.cham {
  position: fixed;
  right: 14px;
  bottom: 80px; /* clear the mobile bottom nav */
  z-index: 45;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  pointer-events: none;
}
@media (min-width: 768px) {
  .cham {
    bottom: 18px;
    right: 18px;
  }
}

.cham-btn {
  pointer-events: auto;
  width: 64px;
  height: 58px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25));
  transition: transform 0.15s ease;
}
.cham-btn:hover {
  transform: scale(1.08) rotate(-3deg);
}
.cham-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 8px;
}
.cham-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* idle sway + blink */
.cham.is-idle .cham-inner {
  transform-origin: 30px 40px;
  animation: cham-sway 3.2s ease-in-out infinite;
}
@keyframes cham-sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-4deg) translateY(-1px); }
}
.cham.is-idle .cham-pupil {
  animation: cham-blink 4.5s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes cham-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}

/* body colour transition when the accent changes */
.cham-body {
  transition: fill 0.4s ease, stroke 0.4s ease;
}

/* tongue */
.cham-tongue {
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.12s ease, transform 0.18s ease;
}
.cham-tongue.out {
  opacity: 1;
  transform: translateX(0);
}

/* speech bubble */
.cham-tip {
  pointer-events: none;
  max-width: 12rem;
  background: var(--color-brand);
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.4rem 0.7rem;
  border-radius: 0.7rem 0.7rem 0.2rem 0.7rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}
.cham-tip-enter-active,
.cham-tip-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cham-tip-enter-from,
.cham-tip-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .cham-btn,
  .cham-tip-enter-active,
  .cham-tip-leave-active {
    transition: none;
  }
  .cham-btn:hover {
    transform: none;
  }
}
</style>
