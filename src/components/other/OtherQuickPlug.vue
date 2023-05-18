<template>
    <div class="w-full h-full">
        <el-card class="card-box">
            <template #header>
                <div class="card-header">
                    <svg class="icon icon-font-size-b" aria-hidden="true">
                        <use xlink:href="#icon-quick-copy"></use>
                    </svg>
                    <div class="card-title">
                        快捷插件
                    </div>
                </div>
            </template>
            <el-row :gutter="12">
                <el-col :span="8">
                    <el-card  :body-style="{ padding: '10px' }">
                        <SSH/>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import SSH from "./SSH.vue";

</script>
<style scoped lang="less">
.card-box {
  .card-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    .card-title {
      margin-left: 10px;
    }
  }

  .quick-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
