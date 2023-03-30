<template>
  <div class="header">
    <el-row :gutter="10" class="header-row">
      <el-col :xl="3" :sm="4">
        <div class="animate__animated animate__backInLeft web-site-title">
          Code Dictionary
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed} from 'vue';

</script>
<style scoped lang="less">
@DefaultColor: #76bbd7;

.header {
  display: flex;
  height: 100%;
  align-items: center;

  .header-row {
    flex: 1;

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


}


</style>
