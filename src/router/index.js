import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientList from '../views/ClientList.vue'
import Terminal from '../views/Terminal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'client_list',
    component: ClientList
  },
  {
    path: '/terminal',
    name: 'terminal',
    component: Terminal,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
