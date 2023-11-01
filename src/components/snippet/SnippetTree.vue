<template>
  <div class="tree-container h-full">
    <el-tree v-loading="isFetching"
             :draggable="draggable"
             :data="data as CategoryMenusType[]"
             :expand-on-click-node="false"
             @node-click="nodeClickEventFunction"
             @node-drag-end='nodeDragEndEventFunction'
             :allow-drop="allowDropEventFunction"
    >
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
import {CategoryMenusType} from "@/type/categoryType";
import {getCategory} from "@/api/category";
import {DragEvents} from "element-plus/es/components/tree/src/model/useDragNode";
import {AllowDropType, NodeDropType} from "element-plus/es/components/tree/src/tree.type";

// 请求category但是手动触发模式
let {data, isFetching, execute} = getCategory(false)

const instance = getCurrentInstance()

// 外部传递参数
const props = withDefaults(defineProps<{
  // 是否开启拖拽
  draggable?: boolean
}>(), {
  draggable: false
})

// 向上触发更新
const emit = defineEmits<{
  (e: 'node-click', data: CategoryMenusType): void
  (e: 'node-drag-end', draggingNode: Node, dropNode: Node, dropType: NodeDropType, ev: DragEvents): void
}>()

defineExpose({
  execute
})

// 点击节点事件函数
const nodeClickEventFunction = (data: CategoryMenusType) => {
  emit('node-click', data)
}

// 节点拖拽结束事件函数
const nodeDragEndEventFunction = (draggingNode: Node, dropNode: Node, dropType: NodeDropType, ev: DragEvents) => {
  emit('node-drag-end', draggingNode, dropNode, dropType, ev)
}

// 判断是否需要取消变更事件函数
const allowDropEventFunction = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  const draggingData = draggingNode.data;
  const dropData = dropNode.data;

  // 若是放到了snippet内就拒绝
  if (dropData.snippet && type === 'inner') return false;

  if (draggingData.snippet) {
    if (!dropData.snippet) {
      if (type === 'inner') return true
      // 放入的是顶级节点就拒绝
      else return dropData.parentId !== '0'
    }
  }
  return true
}
</script>
<style scoped lang="less">
.tree-container {
  overflow-y: auto;
}
</style>
