<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <!-- <Basic></Basic> -->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/header.vue';
// import HelloWorld from './components/HelloWorld.vue';
// import Basic from './pages/basic.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header
    // HelloWorld,
    // Basic
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
