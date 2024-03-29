<template>
  <div class="w-full table-box h-full">
    <div class="table-container w-full">
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
    </div>
    <div>
      <el-pagination
          :page-size="5"
          v-model:current-page="queryForm.pageNum"
          background
          :page-count="tableData.pages"
          @update:current-page="queryPropChangeEventFunction"
          layout="prev, pager, next"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {getCurrentInstance, onMounted, onUnmounted, ref} from 'vue';
import {delTool, getTool} from "@/api/tool";
import {ToolType} from "@/type/toolType";
import {successMessage} from "@/utils/baseMessage";
import {TOOL_UPLOAD_SUCCESS_EVENT, TOOLS_ID_CHANGE_EVENT} from "@/constants/eventConstants";
import {PageInfo} from "@/result";
import {BaseQueryForm} from "@/form/base";

const instance = getCurrentInstance()


// 请求form
const queryForm = ref<BaseQueryForm>({pageSize: 10, pageNum: 1})

// 表格数据
const tableData = ref<PageInfo<ToolType>>({})
const init = () => {
// 请求tool数据初始化
  getTool(queryForm.value).then((res) => {
    tableData.value = res.data
  })
}
init()

onMounted(() => {
  //监听Tool上传成功事件
  instance?.proxy?.$bus.on(TOOL_UPLOAD_SUCCESS_EVENT, () => {
    init()
  })
})

onUnmounted(() => {
  instance?.proxy?.$bus.off(TOOL_UPLOAD_SUCCESS_EVENT)
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

  .table-container {
    flex: auto;
    height: 0;
    overflow-y: auto;
  }
}
</style>
