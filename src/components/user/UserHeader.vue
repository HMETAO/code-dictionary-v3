<template>
  <div class="user-header-box">
    <el-button type="primary" round plain @click="dialogVisible = true"> 新增用户</el-button>
  </div>
  <RegistryDialog v-model="dialogVisible"/>
</template>
<script lang="ts" setup>

import RegistryDialog from "@/components/login/RegistryDialog.vue";
import {ref} from "vue";
const dialogVisible = ref<boolean>()

</script>
<style scoped lang="less">
.user-header-box {
  width: 100%;
  margin-bottom: 5px;
}

</style>