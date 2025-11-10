import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactdVue from '../views/Contact.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from '@/views/ProjectView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // ensure navigation scrolls to top for new pages (useful when clicking "View" cards)
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactdVue,
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
    ,
    // catch-all 404 route (client-side)
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    }
  ],
})

export default router
