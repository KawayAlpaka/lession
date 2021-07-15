<template>
  AsyncComponent
</template>


<script lang="ts">
import { defineComponent } from 'vue'

const delay = (time=2000)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve("");
    },time)
  })
}

export default defineComponent({
  async setup() {
    await delay();
    return {}
  },
  // setup(){
  //   return {};
  // }
})
</script>
