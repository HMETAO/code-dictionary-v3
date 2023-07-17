<template>
    <div class="w-full h-full snippet-box">
        <MarkDown v-if="baseStore.isMarkDown"></MarkDown>
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
        <SnippetInsertDialog v-model="stateStore.snippetDialogVisible"/>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import MarkDown from "./MarkDown.vue";
import CategoryDrawer from "./CategoryDrawer.vue";
import PrismEditor from "./PrismEditor.vue";
import {useBaseStore,useStateStore} from "@/store";
import SnippetInsertDialog from "./SnippetInsertDialog.vue";

const baseStore = useBaseStore();
const stateStore = useStateStore();
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
