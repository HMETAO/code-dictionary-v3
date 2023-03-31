<template>
    <div class=" h-full w-full flex home-container">
        <el-row class=" home-row h-full w-full animate__animated animate__bounceInLeft">
            <el-col :span="3" :xs="0">
                <AsideMenu></AsideMenu>
            </el-col>
            <el-col :span="21" :xs="24">
                <div class="p-3 w-full h-full">
                    <router-view></router-view>
                </div>
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
