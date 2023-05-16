<template>
    <div class="w-full table-box h-full">
        <el-table border highlight-current-row :data='tableData.list'
                  style="margin-bottom: 20px;flex: 1"
                  @selection-change="selectChangeEventFunction"
                  class="w-full">
            <el-table-column type='selection'></el-table-column>
            <el-table-column align='center' prop='toolName' label='工具名'></el-table-column>
            <el-table-column align='center' prop='toolType' label='工具类型'></el-table-column>
            <el-table-column align='center' prop='toolSize' label='工具大小 (kb)'></el-table-column>
            <el-table-column align='center' prop='createTime' label='上传时间'></el-table-column>
            <el-table-column align='center' label='操作'>
                <template #default="scope">
                    <el-button type='primary' size='small' @click="downloadToolEventFunction(scope.row)">下载
                    </el-button>
                    <el-button type='danger' size='small' @click="deleteToolEventFunction(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="5"
                v-model:current-page="queryForm.pageNum"
                background
                :page-count="tableData.pages"
                @update:current-page="queryPropChangeEventFunction"
                layout="prev, pager, next"/>
    </div>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref} from 'vue';
import {ToolQueryForm} from "../../form/tool";
import {delTool, downloadTools, getTool} from "../../api/tool";
import {PageInfo, ToolType} from "../../type/toolType";
import {successMessage} from "../../utils/baseMessage";
import {TOOLS_ID_CHANGE_EVENT} from "../../constants/eventConstants";

const instance = getCurrentInstance()
// 请求form
const queryForm = ref<ToolQueryForm>({pageSize: 10, pageNum: 1})

// 表格数据
const tableData = ref<PageInfo>({})


// 请求tool数据初始化
getTool(queryForm.value).then((res) => {
    tableData.value = res.data
})

// 下载事件回调
const downloadToolEventFunction = (raw: ToolType) => {
    location.href = raw.url
}

// 选择框发生改变事件回调
const selectChangeEventFunction = (val: ToolType[]) => {
    // 触发ids更新事件
    instance?.proxy?.$bus.emit(TOOLS_ID_CHANGE_EVENT, val)
}

// 删除Tool事件回调
const deleteToolEventFunction = async (raw: ToolType) => {
    await delTool(raw.id)
    tableData.value.list = tableData.value.list?.filter(item => {
        return item.id != raw.id;
    })
    successMessage("删除成功")
}
// 请求参数发生变化事件回调
const queryPropChangeEventFunction = async () => {
    const res = await getTool(queryForm.value)
    tableData.value = res.data
}
</script>
<style scoped lang="less">
.table-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
