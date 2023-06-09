<template>
  <div class="tree-container h-full">
    <el-tree v-loading="isFetching" :data="data as CategoryMenusType[]" :expand-on-click-node="false"
             @node-click="nodeClickEventFunction">
      <template v-slot="{node,data}">
        <div class="flex w-full">
          <div style="display: flex;align-items: center;flex-direction: row">
            <div style="display: flex;margin-right: 5px;align-items: center;">
              <el-icon v-if="!data.snippet">
                <Folder/>
              </el-icon>
              <el-icon v-else>
                <Memo/>
              </el-icon>
            </div>
            {{ data.label + (!data.snippet ? "" : (data.type === 0 ? ".cd" : ".md")) }}
          </div>
          <div class="flex-1"></div>
          <slot name="node-end" :data="data as CategoryMenusType"></slot>
        </div>
      </template>
    </el-tree>
  </div>

</template>
<script setup lang="ts">
import {getCurrentInstance} from 'vue';
import {CategoryMenusType} from "../../type/categoryType";
import {getCategory} from "../../api/category";

// 请求category但是手动触发模式
let {data, isFetching, execute} = getCategory(false)

const instance = getCurrentInstance()
// 向上触发更新
const emit = defineEmits<{
  (e: 'node-click', data: CategoryMenusType): void
}>()

defineExpose({
  execute
})

// 点击节点事件函数
const nodeClickEventFunction = (data: CategoryMenusType) => {
  emit('node-click', data)
}
</script>
<style scoped lang="less">
.tree-container {
  overflow-y: auto;
}
</style>
