import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/publicLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: async (to, from, next) => {
        const { initializeAuth } = useLoginStore()
        const { ok } = await initializeAuth()
        if (ok) {
          next({ name: 'infoplace' })
        } else {
          next()
        }
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/places',
      name: 'places',
      component: () => import('@/layouts/mainLayout.vue'),
      beforeEnter: async (to, from, next) => {
        const { initializeAuth } = useLoginStore()
        const { ok } = await initializeAuth()
        if (ok) {
          next()
        } else {
          next({ name: 'login' })
        }
      },
      children: [
        {
          path: '',
          name: 'infoplace',
          component: () => import('../views/place/PlaceView.vue')
        }
      ]
    }
  ]
})

export default router
