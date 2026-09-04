<template>
  <section class="stats" ref="root" aria-label="Portfolio at a glance">
    <div v-for="(item, i) in items" :key="i" class="stat">
      <div class="stat-num">
        <span>{{ display[i] }}</span><span v-if="item.suffix" class="stat-suffix">{{ item.suffix }}</span>
      </div>
      <div class="stat-label">{{ item.label }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsBand",
  props: {
    // [{ value: Number, suffix?: String, label: String }]
    items: { type: Array, required: true },
  },
  data() {
    return {
      display: this.items.map(() => 0),
      started: false,
    };
  },
  mounted() {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      this.display = this.items.map((it) => it.value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !this.started) {
            this.started = true;
            this.runCountUp();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(this.$refs.root);
  },
  methods: {
    runCountUp() {
      const duration = 1100;
      const start = performance.now();
      const from = this.items.map(() => 0);
      const to = this.items.map((it) => it.value);
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        this.display = to.map((v, i) =>
          Math.round(from[i] + (v - from[i]) * eased)
        );
        if (t < 1) requestAnimationFrame(tick);
        else this.display = to;
      };
      requestAnimationFrame(tick);
    },
  },
};
</script>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem 1.1rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--color-brand), #6b21a8);
  color: var(--color-accent);
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.stat-num {
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
}
@media (min-width: 768px) {
  .stat-num { font-size: 2.2rem; }
}
.stat-suffix {
  font-size: 0.75em;
  margin-left: 1px;
}
.stat-label {
  margin-top: 0.35rem;
  font-size: 0.72rem;
  letter-spacing: 0.03em;
  opacity: 0.9;
}
@media (min-width: 768px) {
  .stat-label { font-size: 0.85rem; }
}
</style>
