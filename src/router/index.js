import Vue from "vue"
import VueRouter from "vue-router"
// import ClientList from "../views/ClientList.vue"
// import Terminal from "../views/Terminal.vue"
import Client from "../views/Client.vue"
import Clients from "../views/Clients.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/clients",
    name: "clients",
    component: Clients,
  },
  {
    path: "/clients/:username",
    name: "client",
    component: Client,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
