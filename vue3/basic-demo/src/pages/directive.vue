<template>
  <div class="directive">
    <view>{{value}}</view>
    <br>
    <input v-model="value" />
    <br>
    <!-- <Directive v-model11312="value"/> -->
    <!-- <input v-model11312="value" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Directive from "@/components/Directive.vue"
// const ws = require("vue")
export default defineComponent({
  components:{
    Directive
  },
  name: 'directive-page',
  setup(props,ctx) {
    // 本来想测试 computed 的bug，但好像没有bug
    const value = ref("html")
    return {
      value
    }
  }
});
</script>

<style scoped>

</style>
