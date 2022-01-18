import Vue from 'vue'
import Router from 'vue-router'
import Home from '@views/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@views/About.vue')
  }
]

const router =  new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  next()
})

export default router
