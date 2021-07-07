<template>
  <div class="communication">
    communication-{{counter}}
    <CommunicationChild :onFinish="setCounter"></CommunicationChild>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import CommunicationChild from "../components/communication-child.vue"
export default defineComponent({
  components:{
    CommunicationChild
  },
  name: 'communication',
  methods: {

  },
  setup(props) {
    const counter = ref(0);
    const setCounter = (val:number)=>{
      counter.value = val;
    }
    return {
      msg:"",
      counter,
      setCounter
    }
  }
});
</script>
