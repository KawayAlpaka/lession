<template>
  <div>
    WatchDemoPage
    <div>
      <button @click="increment(obj)">increment(obj)</button>
      <button @click="increment(objReactive)">increment(objReactive)</button>
      <button @click="update">update(obj)</button>
    </div>
    <div>
      <div>obj.haha:{{obj.haha}}</div>
      <div>obj.obj.count:{{obj.obj.count}}</div>
      <div>objReactive.obj.count:{{objReactive.obj.count}}</div>
    </div>
  </div>
</template>


<script lang="ts">
import { watch, watchEffect,reactive, getCurrentInstance} from "vue"
export default {
  name:"WatchDemoPage",
  setup() {
    const obj = {haha:"haha",obj:{hehe:"hehe",count:0}};
    const objReactive = reactive(obj);
    const self = getCurrentInstance();
    const update = ()=>{
      console.log(obj);
      self?.update()
    }
    const increment = function(obj:any){
      obj.obj.count++
      console.log(obj);
    }

    // 只能watch 响应式变量的变化，下面这两行代码监听不会成功
    watchEffect(() => console.log("watchEffect obj.obj.count",obj.obj.count));
    watch(()=>obj.obj.count,()=>console.log("watch obj.obj.count",obj.obj.count));

    // 下面这两行代码监听会成功
    watchEffect(() => console.log("watchEffect objReactive.obj.count",objReactive.obj.count));
    watch(()=>objReactive.obj.count,()=>console.log("watch objReactive.obj.count",objReactive.obj.count));

    // 默认就是深度监听
    watch(objReactive,()=>console.log("watch objReactive",objReactive));

    return {
      obj,
      objReactive,
      increment,
      update
    }
  },
}
</script>
