<template>
  <div class="permission-header-box">
    <el-button type="primary" round plain @click="dialogVisible = true"> 新增权限</el-button>
  </div>
  <PermissionInsertDialog v-model="dialogVisible"/>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import PermissionInsertDialog from "@/components/permission/PermissionInsertDialog.vue";

const dialogVisible = ref<boolean>()

</script>
<style scoped lang="less">
.permission-header-box {
  width: 100%;
  margin-bottom: 5px;
}

</style>