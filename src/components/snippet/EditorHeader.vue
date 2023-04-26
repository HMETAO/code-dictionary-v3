<template>
    <div class="editor-header-box w-full h-full">
        <div>
            <el-tooltip
                    effect="dark"
                    content="初始化Snippet面板"
                    placement="top">
                <el-button @click="initSnippetClickEventFunction" type="warning" circle size="default">
                    <el-icon>
                        <EditPen/>
                    </el-icon>
                </el-button>
            </el-tooltip>
            <el-tooltip
                    effect="dark"
                    content="保存"
                    placement="top">
                <el-button type="success" circle size="default" @click="saveSnippetClickEventFunction">
                    <el-icon>
                        <Check/>
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
    </div>
    <SnippetInsertDialog v-model="snippetDialogVisible"/>

</template>
<script setup lang="ts">
import {ref, reactive, computed} from 'vue';
import {SnippetType} from "../../type/snippetType";
import {BASE_SNIPPET} from "../../constants/EventConstants";
import {successMessage, warningMessageBox} from "../../utils/baseMessage";
import {updateSnippet} from "../../api/snippet";
import SnippetInsertDialog from "./SnippetInsertDialog.vue";
import {useStateStore} from "../../store";

const store = useStateStore()


const snippetDialogVisible = ref<boolean>(false)

// 点击初始化Snippet面板事件回调
const initSnippetClickEventFunction = async () => {
    try {
        await warningMessageBox("初始化面板", "是否确定初始化Snippet面板？")
        store.snippetForm ={snippet: BASE_SNIPPET, categoryId: "1"}
    } catch (e) {
        return
    }
}

// 点击保存按钮事件回调
const saveSnippetClickEventFunction = () => {
    // 更新操作
    if (store.snippetForm.id) {
        updateSnippet(store.snippetForm);
        successMessage("更新成功")
    } else {
        snippetDialogVisible.value = true;
    }
}

</script>
<style scoped lang="less">
.editor-header-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background-color: #4d4d4d;
}
</style>
