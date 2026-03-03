<template>
  <footer class="site-footer" role="contentinfo">
    <div class="mx-auto max-w-screen-lg">
      <div class="footer-shell">
        <div class="container">
          <p class="brand">Elodie Portfolio</p>

          <nav class="footer-nav" aria-label="Footer navigation">
            <a href="/">Home</a>
            <a href="/projects">Projects</a>
            <a href="/contact">Contact</a>
          </nav>

          <div class="meta">
            <small>© {{ year }} Elodie — All rights reserved.</small>
            <div class="social" aria-label="Social links">
              <a href="#" target="_blank" rel="noopener" aria-label="GitHub">GitHub</a>
              <a href="#" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const year = ref(new Date().getFullYear())
</script>

<style scoped>
.site-footer {
  background: transparent;
  padding: 0;
  padding-top: 5rem;
}

.footer-shell {
  background: #422D79;
  color: #e6eef8;
  padding: 1rem 0;
  font-size: 0.95rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem 0.5rem 0 0; /* same “edged” style as nav */
}

.container {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.brand {
  font-weight: 600;
  letter-spacing: 0.2px;
}

.footer-nav a {
  color: inherit;
  margin: 0 0.5rem;
  text-decoration: none;
  opacity: 0.95;
}

.footer-nav a:hover {
  text-decoration: underline;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social a {
  color: inherit;
  margin-left: 0.5rem;
  text-decoration: none;
  opacity: 0.9;
}

@media (max-width: 767px) {
    .site-footer{
        padding-bottom : 4rem;
    }
  .footer-shell {
    border-radius: 0; /* keep mobile flat */
  }
}

@media (max-width: 560px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }
  .meta {
    width: 100%;
    justify-content: space-between;
  }
}
</style>