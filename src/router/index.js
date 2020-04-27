import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home/home.vue'
import Layout from '@/views/layoutSyS/layout.vue'
import Connent from '@/views/connent/'
import Publish from '@/views/pubLish'
import Image from '@/views/image'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/connent',
        name: 'connent',
        component: Connent
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
