<template>
  <div class="computed">
    <view>{{msg}}</view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  name: 'computed',
  data() {
    return {

    }
  },
  methods: {

  },
  setup(props) {

    // 本来想测试 computed 的bug，但好像没有bug
    const name1 = ref("html")
    const name2 = ref(null)
    const msg = computed(()=>{
      const name = name1.value || name2.value;
      if(name){
        return "hello name";
      }
      return "hello"
    });
    return {
      msg
    }
  }
});
</script>

<style scoped>

</style>
