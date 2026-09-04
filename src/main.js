import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

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
