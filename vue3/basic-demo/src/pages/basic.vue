<template>
  <div class="hello">
    <h3>basic</h3>
    <div>
      <div>{{clickTime}}</div>
      <div><button @click="clickTimePP">clickTimePP</button></div>
    </div>
    <div>
      <h4>person1</h4>
      <div>{{person1.name}}:{{person1.age}}</div>
      <div><button @click="person1AgePP">person1AgePP</button></div>
    </div>
    <div>
      <h4>person2</h4>
      <div>{{person2.name}}:{{person2.age}}</div>
      <div><button @click="person2AgePP">person2AgePP</button></div>
    </div>
    <div>
      <h4>person0（不通过）</h4>
      <div>{{person0.name}}:{{person0.age}}</div>
      <div><button @click="person0AgePP">person0AgePP</button></div>
    </div>
    <div>
      <h4>直接访问</h4>
      <div>{{name}}:{{age}}</div>
      <div><button @click="person2AgePP">person2AgePP</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, toRefs, watch, onErrorCaptured } from 'vue'
export default defineComponent({
  name: 'basic',
  props: {
    msg: String,
  },
  data() {
    return {
      person1:{
        name:"xiaoming"
      }
    }
  },
  methods: {
    person1AgePP(){
      const person = this.person1 as any;
      if(!person.age){
        person.age = 1;
      }else{
        person.age++;
      }
      
    }
  },
  setup(props) {
    console.log(props)
    let clickTime = ref(0)
    let clickTimePP = () => {
      clickTime.value++;
    }
    const person0 = {
      name:"xiaowang"
    };

    // person0的方法明显是错误的
    const person0AgePP = function(){
      const person = person0 as any;
      if(!person.age){
        person.age = 1;
      }else{
        person.age++;
      }
    }

    const person2 = reactive({
      name:"xiaohong",
      // age:0
    });
    const person2AgePP = function(){
      const person = person2 as any;
      if(!person.age){
        person.age = 1;
      }else{
        person.age++;
      }
      person.name = person.name + person.age;
    };
    const person2Ref = toRefs(person2);

    return {
      clickTime,
      clickTimePP,
      person2,
      person2AgePP,
      person0,
      person0AgePP,
      ...person2Ref
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
