<template>
  <div class="community-box">
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {CommunityType} from "@/type/communityType";

// 父组件传的数据
const props = defineProps<{
  community: CommunityType
}>()
</script>
<style scoped lang="less">
.community-box {
  width: 100%;
  min-height: 400px;
  background: pink;
  margin-bottom: 10px;
}
</style>
