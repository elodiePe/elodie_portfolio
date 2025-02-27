import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TailwindVue from '../views/TailwindVue.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from '@/views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tailwind',
      name: 'tailwind',
      component: TailwindVue,
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ProjectsView,
    },
    {
      path: '/projects/:id',
      name: 'Project',
      component: ProjectView,
      props: true,
    }
  ],
})

export default router
