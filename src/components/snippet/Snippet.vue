<template>
    <div class="w-full h-full snippet-box">
        <MarkDown v-if="store.isMarkDown"></MarkDown>
        <PrismEditor v-else></PrismEditor>
        <div class="snippet-menus">
            <el-button class="snippet-btn" type="primary" @click="isCategoryDrawer = true" size="large" circle>
                <el-icon>
                    <Plus/>
                </el-icon>
            </el-button>
        </div>
        <!--snippet选择的drawer-->
        <CategoryDrawer v-model="isCategoryDrawer"></CategoryDrawer>
    </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed} from 'vue';
import MarkDown from "./MarkDown.vue";
import CategoryDrawer from "./CategoryDrawer.vue";
import PrismEditor from "./PrismEditor.vue";
import {useBaseStore} from "../../store";

const store = useBaseStore();
// 分类抽屉
const isCategoryDrawer = ref<boolean>(false)
</script>
<style scoped lang="less">
.snippet-menus {
  position: fixed;
  right: 30px;
  bottom: 50px;
}
</style>
