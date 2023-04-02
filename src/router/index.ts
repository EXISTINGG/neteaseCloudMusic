import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {path: '/', redirect: '/home'},
  {path: '/login', component: () => import('@/views/Login/index.vue')},
  {path: '/home', component: () => import('@/views/Home/index.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
  })

// router.beforeEach((to,from,next) => {
//   let qrCookie = localStorage.getItem('QrcodeCookie')
//   let isLogin = qrCookie != '' ? true : false
//   // if (isLogin) next()
// })
  
  export default router