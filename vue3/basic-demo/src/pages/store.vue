<template>
  <div class="store">
    <div>
      {{user.name}}:{{user.age}}
    </div>
    <div>
      <button @click="agePP">age++</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { user } from '@/store'
export default defineComponent({
  name: 'Store',
  setup() {
    const agePP = () => {
      user.age++;
    }


    return {
      user,
      agePP
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
