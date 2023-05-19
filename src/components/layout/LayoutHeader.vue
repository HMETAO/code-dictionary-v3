<template>
  <div class="header w-full h-full">
    <el-menu class="w-full"
             mode="horizontal"
             menu-trigger="click"
             :ellipsis="false">
      <el-menu-item index="0">
        <div class="animate__animated animate__backInLeft web-site-title">
          Code Dictionary
        </div>
      </el-menu-item>
      <div class="flex-grow"/>
      <el-sub-menu index="1" class="animate__animated animate__backInRight">
        <template #title>
          <div class="header-user-info">
            <el-avatar shape="square" :src='baseStore.user.avatar'/>
            <div style="margin-left: 10px; font-weight: 600; color: #34495e">{{ baseStore.user.username }}</div>
          </div>
        </template>
        <el-menu-item index="2-1" style="justify-content: center">
          退出登录
        </el-menu-item>
        <el-menu-item index="2-2" style="justify-content: center">
          修改信息
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed} from 'vue';
import {useBaseStore} from "../../store";

const baseStore = useBaseStore()

</script>
<style scoped lang="less">
@DefaultColor: #76bbd7;

.header {
  display: flex;
  align-items: center;

  .header-user-info {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .web-site-title {
    font-weight: 700;
    cursor: default;
    color: @DefaultColor;
    font-style: italic;
    transition: 1s;
  }

  .web-site-title:hover {
    background-image: linear-gradient(#2de2ff, #8b67fb);
    -webkit-background-clip: text;
    color: transparent;
  }


}


</style>
