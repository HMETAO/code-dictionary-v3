<template>
  <div class="h-full w-full message-box">
    <div class="message-container">

    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';

</script>
<style scoped lang="less">
.message-box {
  display: flex;
  flex-direction: column;

  .message-container {
    flex: auto;
    height: 0;
    overflow-y: auto;
  }
}
</style>
