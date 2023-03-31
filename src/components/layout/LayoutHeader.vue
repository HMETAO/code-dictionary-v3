<template>
    <div class="header w-full h-full">

        <el-menu
                class="w-full"
                mode="horizontal"
                :ellipsis="false"
        >
            <el-menu-item index="0">
                <div class="animate__animated animate__backInLeft web-site-title">
                    Code Dictionary
                </div>
            </el-menu-item>
            <div class="flex-grow"/>
            <el-menu-item index="1">Processing Center</el-menu-item>
        </el-menu>

    </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed} from 'vue';

</script>
<style scoped lang="less">
@DefaultColor: #76bbd7;

.header {
  display: flex;
  align-items: center;

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
