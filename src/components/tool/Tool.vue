<template>
    <div class="tool-box h-full w-full">
        <div class="tool-head"></div>
        <div class="tool-container">
            <ToolTable style="margin-bottom: 20px"></ToolTable>
            <el-pagination v-model:page-size="queryForm.pageSize"
                           v-model:current-page="queryForm.pageNum"
                           @update:current-page="queryPropChangeEventFunction"
                           background
                           layout="prev, pager, next" :total="30"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import ToolTable from "./ToolTable.vue";
import {ToolQueryForm} from "../../form/tool";


const queryForm = ref<ToolQueryForm>({pageSize: 10, pageNum: 1})
const queryPropChangeEventFunction = () => {
    console.log(111)
}
</script>

<style scoped lang="less">
.tool-box {
  display: flex;
  flex-direction: column;

  .tool-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
}
</style>
