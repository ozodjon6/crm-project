import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/compat";
import record from "@/store/record";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: { layout: 'empty' },
      component: () => import('../views/Login')
    },
    {
      path: '/register',
      name: 'Register',
      meta: { layout: 'empty' },
      component: () => import('../views/Register')
    },
    {
      path: '/',
      name: 'Home',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Home')
    },
    {
      path: '/detail-record/:id',
      name: 'DetailRecord',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/DetailRecord')
    },
    {
      path: '/history',
      name: 'History',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/History')
    },
    {
      path: '/planning',
      name: 'Planning',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Planning')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Profile')
    },
    {
      path: '/record',
      name: 'Record',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Record')
    },
    {
      path: '/categories',
      name: 'Categories',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Categories')
    },
  ]
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
