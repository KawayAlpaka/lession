import { createRouter,createWebHistory } from "vue-router"
import Basic from "@/pages/basic.vue"
import Store from "@/pages/store.vue"
import HelloWorld from "@/components/HelloWorld.vue"
const routes = [
  { path: '/basic', component: Basic },
  { path: '/', component: HelloWorld },
  { path: '/store', component: Store }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;
