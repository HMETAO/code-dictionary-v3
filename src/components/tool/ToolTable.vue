<template>
    <div class="w-full table-box h-full">
        <el-table border
                  highlight-current-row
                  :data='tableData.list'
                  style="margin-bottom: 20px;flex: 1"
                  class="w-full">
            <el-table-column
                    type='selection'>
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='toolName'
                    label='工具名'>
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='toolType'
                    label='工具类型'>
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='toolSize'
                    label='工具大小 (kb)'>
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='createTime'
                    label='上传时间'>
            </el-table-column>
            <el-table-column
                    align='center'
                    label='操作'>
                <template v-slot='scope'>
                    <el-button type='primary' size='small'>下载</el-button>
                    <el-button type='danger' size='small'>删除</el-button>
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
import {ref} from 'vue';
import {ToolQueryForm} from "../../form/tool";
import {getTool} from "../../api/tool";
import {PageInfo} from "../../type/toolType";

// 请求form
const queryForm = ref<ToolQueryForm>({pageSize: 10, pageNum: 1})

// 表格数据
const tableData = ref<PageInfo>({})

// 请求tool数据初始化
getTool(queryForm.value).then((res) => {
    tableData.value = res.data
})

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
