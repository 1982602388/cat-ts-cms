import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//导航守卫，当首次打开路径不为登录路径时，
// 判断是否有token，如果没有则跳转到登录界面
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  //当网址为http://localhost:8080时firstMenu会拼接上/main，然后判断为/main,
  // 然后跳转到http:localhost:8080/#/main/analysis/overview

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
