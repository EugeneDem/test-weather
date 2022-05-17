import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layout/Layout'),
    redirect: '/',
    hidden: true,
    children: [
      {
        path: '/',
        name: 'Главная',
        component: () => import('@/views/home/index'),
        hidden: true
      }
    ]
  },
  {
    path: '/404/',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'exact-active',
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('init')
  next()
})

export default router
