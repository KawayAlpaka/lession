<template>
  <div class="provide">
    <div>Provide</div>
    <div>
      <button @click="update">update</button>
      <button @click="increment">increment(objReactive)</button>
    </div>
    <div>{{obj.count}}</div>
    <div>{{objReactive.count}}</div>
    <Inject></Inject>
  </div>
</template>

<script lang="ts">
import { defineComponent,getCurrentInstance,provide, reactive, readonly } from 'vue'
import Inject from "@/components/Inject.vue"
export default defineComponent({
  components:{
    Inject
  },
  name: 'communication',
  methods: {

  },
  setup(props) {
    const obj = {haha:"haha",count:0}
    // 经过reactive 后 obj 已经和 objReactive 关联，只是 obj 没有 相应式
    const objReactive = reactive(obj);
    const objReadonly = readonly(obj)
    const self = getCurrentInstance();
    provide("hehe","hehe");
    provide("obj",obj);
    provide("objReactive",objReactive);
    provide("objReadonly",objReadonly);
    const update = ()=>{
      console.log(obj);
      self?.update()
    }
    const increment = function(){
      objReactive.count++ 
      console.log(obj);
    }
    return {
      obj,
      objReactive,
      update,
      increment
    }
  }
});
</script>

