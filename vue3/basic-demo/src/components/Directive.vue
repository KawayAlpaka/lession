<template>
  <div class="Directive">
    <input type="text">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Directive',
  created(){
    console.log("Directive created");
  }
});
</script>
