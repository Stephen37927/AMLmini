import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Generations from '../views/Generations.vue'
import Estimations from '../views/Estimations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/generations',
      name: 'generations',
      component: Generations
    },
    {
      path: '/estimations',
      name: 'estimations',
      component: Estimations
    }
  ]
})

export default router
