<template>
  <div class="header">
    <router-link to="/">首页</router-link>
    <router-link to="/basic">basic</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
export default defineComponent({
  name: 'header',
  methods: {

  },
  setup() {
    return {

    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
