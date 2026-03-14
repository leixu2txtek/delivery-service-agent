import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/chat.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/history/history.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router