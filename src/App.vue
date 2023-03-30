<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>
<script setup lang="ts">

import LayoutHeader from "./components/layout/LayoutHeader.vue";
import {useStateStore} from "./store";

const stateStore = useStateStore()
// 将状态缓存全部清除
stateStore.$reset()
</script>
<style scoped lang="less">
@DefaultColor: #76bbd7;

.common-layout {
  height: 100%;

  .progress {
    top: 0;
    display: flex;
  }

  .el-container {
    display: flex;
    height: 100%;
    flex: 1;
    flex-direction: column;

    .el-header {
      border-bottom: 2px solid #2ecc71;
    }

    .el-main {
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
