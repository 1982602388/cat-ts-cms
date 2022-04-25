import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect:"/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
