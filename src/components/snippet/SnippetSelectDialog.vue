<template>
  <el-dialog
      v-model="dialogVisible"
      title="选择发送的Snippet"
      @open="dialogOpenEventFunction"
      width="40%">
    <div class="dialog-box">
      <div class="dialog-container">
        <SnippetTree ref="snippetTreeRef" @node-click="nodeClickEventFunction"></SnippetTree>
      </div>
    </div>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
          </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import SnippetTree from "@/components/snippet/SnippetTree.vue";
import {CategoryMenusType} from "@/type/categoryType";

const props = defineProps<{
  modelValue: boolean
}>()
const dialogVisible = ref<boolean>(false)
watch<boolean>(() => props.modelValue, () => {
  dialogVisible.value = props.modelValue
})
const snippetTreeRef = ref<InstanceType<typeof SnippetTree>>()
// 向上触发更新
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'open', snippetTreeRef: InstanceType<typeof SnippetTree>): void
  (e: 'node-click', data: CategoryMenusType): void
}>()
const nodeClickEventFunction = (data: CategoryMenusType) => {
  emit('node-click', data)
}
const dialogOpenEventFunction = () => {
  emit('open', snippetTreeRef.value)
}
</script>
<style scoped lang="less">


.dialog-box {
  height: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  .dialog-container {
    height: 0;
    flex: auto;
  }

}
</style>
