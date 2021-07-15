<template>
  <div class="inject">
    Inject
    <button @click="increment(obj)">increment(obj)</button>
    <button @click="increment(objReactive)">increment(objReactive)</button>
    <button @click="increment(objReadonly)">increment(objReadonly)</button>
    <div>{{hehe}}</div>
    <div>obj.haha:{{obj.haha}}</div>
    <div>obj.count:{{obj.count}}</div>
    <div>objReactive.count:{{objReactive.count}}</div>
    <div>objReadonly.count:{{objReadonly.count}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent,inject,getCurrentInstance } from 'vue'
export default defineComponent({
  components:{
  },
  name: 'Inject',
  methods: {

  },
  setup(props) {
    const hehe = inject("hehe");
    const obj = inject<any>("obj");
    const objReactive = inject<any>("objReactive");
    const objReadonly = inject<any>("objReadonly");
    console.log(hehe);
    console.log(obj);
    const increment = (obj:any)=>{
      console.log(obj);
      obj.count++;
      self?.update()
    }
    const self = getCurrentInstance()
    return {
      hehe,
      obj,
      objReactive,
      objReadonly,
      increment
    }
  }
});
</script>
