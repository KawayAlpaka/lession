<template>
  <div class="header">
    <div>{{user.name}}:{{user.age}}</div>
    <router-link class="link" to="/">首页</router-link>
    <router-link class="link" to="/basic">basic</router-link>
    <router-link class="link" to="/store">store</router-link>
    <router-link class="link" to="/computed">computed</router-link>
    <router-link class="link" to="/directive">directive</router-link>
    <router-link class="link" to="/communication">Communication</router-link>
    <router-link class="link" to="/provide">Provide</router-link>
    <router-link class="link" to="/watch">watch</router-link>
    <router-link class="link" to="/teleport">Teleport</router-link>
    <router-link class="link" to="/suspense">suspense</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { user } from '@/store'
export default defineComponent({
  name: 'Header',
  methods: {

  },
  setup() {
    return {
      user
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link{
  margin:10px;
}
</style>
