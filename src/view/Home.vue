<template>
  <div class=" h-full w-full flex home-container">
    <el-row class=" home-row h-full w-full">
      <el-col :span="3" :xs="0">
        <transition enter-active-class="animate__animated animate__bounceInLeft" appear
                    appear-active-class="animate__animated animate__bounceInLeft">
          <AsideMenu></AsideMenu>
        </transition>
      </el-col>
      <el-col :span="21" :xs="24">
        <transition enter-active-class="animate__animated animate__bounceInRight" appear
                    appear-active-class="animate__animated animate__bounceInRight">
          <div class="p-3 w-full h-full ">
            <router-view></router-view>
          </div>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed} from 'vue';
import AsideMenu from "../components/AsideMenu.vue";

</script>
<style scoped lang="less">
.home-container {
  flex: 1;
}
</style>
