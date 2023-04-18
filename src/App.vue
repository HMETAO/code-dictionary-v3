<template>
    <div class="common-layout">
        <div class="header">
            <layout-header></layout-header>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
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
  display: flex;
  height: 100vh;
  flex: 1;
  flex-direction: column;

  .header {
    //border-bottom: 2px solid #2ecc71;
  }

  .main {
    flex: 1
  }

}
</style>
