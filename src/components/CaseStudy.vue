<template>
  <section class="cs" v-reveal aria-label="Project summary">
    <div class="cs-head">
      <span class="cs-kicker">In short</span>
      <span v-if="data.role" class="cs-role">{{ data.role }}</span>
    </div>

    <div class="cs-grid">
      <div class="cs-col">
        <h3 class="cs-col-title"><span aria-hidden="true">🎯</span> The challenge</h3>
        <p class="cs-col-text">{{ data.challenge }}</p>
      </div>

      <div class="cs-col">
        <h3 class="cs-col-title"><span aria-hidden="true">🛠️</span> What I did</h3>
        <p class="cs-col-text">{{ data.approach }}</p>
      </div>

      <div class="cs-col cs-col--result">
        <h3 class="cs-col-title"><span aria-hidden="true">🏆</span> The result</h3>
        <ul class="cs-stats">
          <li v-for="(r, i) in data.results" :key="i" class="cs-stat">
            <span class="cs-stat-num">{{ r.stat }}</span>
            <span class="cs-stat-label">{{ r.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CaseStudy",
  props: {
    data: { type: Object, required: true },
  },
};
</script>

<style scoped>
.cs {
  margin-top: 1.25rem;
  border: 1px solid #ece7f5;
  border-radius: 1rem;
  padding: 1.1rem 1.2rem 1.3rem;
  background: linear-gradient(180deg, #fbfaff 0%, #ffffff 100%);
  box-shadow: 0 6px 20px rgba(66, 45, 121, 0.06);
}
.cs-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
}
.cs-kicker {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--accent);
}
.cs-role {
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  background: var(--accent);
  padding: 0.2rem 0.7rem;
  border-radius: 9999px;
}

.cs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 768px) {
  .cs-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.cs-col-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #241a3a;
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.cs-col-text {
  font-size: 0.92rem;
  line-height: 1.55;
  color: #4b3e63;
}

/* result column visually emphasised */
.cs-col--result {
  border-left: 3px solid var(--accent);
  padding-left: 0.85rem;
}
@media (max-width: 767px) {
  .cs-col--result {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid #ece7f5;
    padding-top: 0.85rem;
  }
}
.cs-stats {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.cs-stat {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.cs-stat-num {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--accent);
}
.cs-stat-label {
  font-size: 0.78rem;
  color: #6b5b8a;
}
</style>
