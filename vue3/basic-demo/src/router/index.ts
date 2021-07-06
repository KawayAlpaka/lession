import { createRouter,createWebHistory } from "vue-router"
import Basic from "@/pages/basic.vue"
import Store from "@/pages/store.vue"
import Computed from "@/pages/computed.vue"
import HelloWorld from "@/components/HelloWorld.vue"
import Directive  from "@/pages/directive.vue"
const routes = [
  { path: '/basic', component: Basic },
  { path: '/', component: HelloWorld },
  { path: '/store', component: Store },
  { path: '/computed', component: Computed },
  { path: '/directive', component: Directive },
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;
