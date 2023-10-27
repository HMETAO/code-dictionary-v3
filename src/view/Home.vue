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
        <div class="p-3 w-full h-full ">
          <router-view v-slot="{ Component }">
            <transition enter-active-class="animate__animated animate__bounceInRight" appear
                        appear-active-class="animate__animated animate__bounceInRight">
              <component :is="Component"/>
            </transition>
          </router-view>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="home-ai">
    <GPT/>
  </div>
</template>
<script setup lang="ts">
import AsideMenu from "../components/layout/AsideMenu.vue";
import GPT from "@/components/gpt/GPT.vue";
</script>
<style scoped lang="less">
.home-container {
  flex: 1;
}

.home-ai {
  position: fixed;
  bottom: 50px;
  left: 30px;
}
</style>
