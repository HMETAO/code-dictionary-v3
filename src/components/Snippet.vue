<template>
    <div class="w-full h-full snippet-box">
        <MarkDown></MarkDown>
        <div class="snippet-menus">
            <el-button class="snippet-btn" type="primary" @click="isCategoryDrawer = true" size="large" circle>
                <el-icon>
                    <Plus/>
                </el-icon>
            </el-button>
        </div>
        <CategoryDrawer v-model="isCategoryDrawer"></CategoryDrawer>
    </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed} from 'vue';
import MarkDown from "./MarkDown.vue";
import CategoryDrawer from "./CategoryDrawer.vue";
import {getCategory} from "../api/category";
import {CategoryMenusType} from "../type/categoryType";

const isCategoryDrawer = ref<boolean>(false)

</script>
<style scoped lang="less">
.snippet-menus {
  position: fixed;
  right: 30px;
  bottom: 50px;
}
</style>
