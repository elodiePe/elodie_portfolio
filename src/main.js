import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { t, tf, locale, setLocale, toggleLocale } from './i18n'

const app = createApp(App)

// i18n helpers available in every template (Options API): $t, $tf, $locale
app.config.globalProperties.$t = t
app.config.globalProperties.$tf = tf
app.config.globalProperties.$setLocale = setLocale
app.config.globalProperties.$toggleLocale = toggleLocale
Object.defineProperty(app.config.globalProperties, '$locale', {
  get: () => locale.value,
})
if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value
}

// Scroll-reveal: elements marked v-reveal fade/slide in when they enter view.
app.directive('reveal', {
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined') return
    el.classList.add('reveal-init')
    if (binding.value && binding.value.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
  },
})

app.use(router)

app.mount('#app')
