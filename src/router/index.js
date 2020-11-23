import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/category/Category.vue')
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: () => import('../views/shopcart/Shopcart.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/Profile.vue')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

export default router
