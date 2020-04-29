import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home/home.vue'
import Layout from '@/views/layoutSyS/layout.vue'
import Connent from '@/views/connent/'
import Publish from '@/views/pubLish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import PersonSet from '@/views/personSetting'
import Fans from '@/views/fans'
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
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/setting',
        name: 'setting',
        component: PersonSet
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
