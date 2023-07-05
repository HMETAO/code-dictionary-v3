<template>
    <div style="margin-bottom: 10px">
        <el-button type="primary" plain round @click="downloadToolsEventFunction">批量下载</el-button>
        <el-button type="primary" plain round @click="uploadDialogVisible = true">上传工具</el-button>
    </div>
    <UploadDialog v-model="uploadDialogVisible"/>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref} from 'vue';
import {TOOLS_ID_CHANGE_EVENT} from "@/constants/eventConstants";
import {ToolType} from "@/type/toolType";
import {downloadTools} from "@/api/tool";
import UploadDialog from "./ToolUploadDialog.vue";

const instance = getCurrentInstance();
let toolsIds: number[] = []

const uploadDialogVisible = ref<boolean>(false)
// 监听toolIds变化事件
instance?.proxy?.$bus.on(TOOLS_ID_CHANGE_EVENT, (val) => {
    const tools = val as ToolType[];
    toolsIds = tools.map(item => item.id)
})
// 批量下载tools事件回调
const downloadToolsEventFunction = async () => {
    const res = await downloadTools(toolsIds)
    const blobo = new Blob([res.data], {type: 'application/zip;charset=UTF-8'})
    const archor = document.createElement('a');
    const href = window.URL.createObjectURL(blobo)
    archor.setAttribute('href', href)
    archor.click();
}
</script>
<style scoped lang="less">

</style>
