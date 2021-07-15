<template>
  <suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent ,defineAsyncComponent } from 'vue'

export default defineComponent({
  components:{
    AsyncComponent:defineAsyncComponent(()=>import("@/components/AsyncComponent.vue"))
  },
  // setup() {
    
  // },
})
</script>
