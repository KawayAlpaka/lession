import { createRouter,createWebHistory } from "vue-router"
import Basic from "@/pages/basic.vue"
import HelloWorld from "@/components/HelloWorld.vue"
const routes = [
  { path: '/basic', component: Basic },
  { path: '/', component: HelloWorld }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;
