<template>
    <div class="flex h-full w-full other-container">
        <div class="other-left">
            <OtherQuickPlug/>
        </div>
        <div class="other-right"></div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import OtherQuickPlug from "./OtherQuickPlug.vue";

</script>
<style scoped lang="less">
.other-container {
  flex-direction: row;

  .other-left {
    flex: 1;
  }

  .other-right {
    flex: 1;
  }

}
</style>
