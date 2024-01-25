<template>
  <div class="role-header-box">
    <el-button type="primary" round plain @click="dialogVisible = true"> 新增角色</el-button>
  </div>
  <InserRoleDialog v-model="dialogVisible"/>
</template>
<script lang="ts" setup>

import RegistryDialog from "@/components/login/RegistryDialog.vue";
import {ref} from "vue";
import InserRoleDialog from "@/components/role/InserRoleDialog.vue";

const dialogVisible = ref<boolean>()

</script>
<style scoped lang="less">
.role-header-box {
  width: 100%;
  margin-bottom: 5px;
}

</style>