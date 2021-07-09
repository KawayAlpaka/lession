<template>
  <div class="communication">
    <button @click="onFinish2">communication-child</button>
  </div>
</template>

<script lang="ts">
import { defineComponent,onBeforeUpdate } from 'vue'
export default defineComponent({
  props:{
    onFinish:{
      type:Function,
      required:true
    }
  },
  name: 'communication-child',
  methods: {

  },
  setup(props) {
    let counter = 0;
    const onFinish2 = ()=>{
      props.onFinish(++counter);
    }
    onBeforeUpdate(()=>{
      console.log("onBeforeUpdate child")
    });
    return {
      msg:"",
      onFinish2
    }
  }
});
</script>
