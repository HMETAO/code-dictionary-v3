<template>
  <el-dialog v-model="snippetDownloadDialogVisible"
             @open="dialogOpenEventFunction">
    <div class="dialog-box">
      <div class="dialog-container">
        <SnippetTree ref="snippetTreeRef" show-check-box></SnippetTree>
      </div>
    </div>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="downloadClickEventFunction" type="primary">Download</el-button>
            <el-button @click="snippetDownloadDialogVisible = false">Cancel</el-button>
          </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>

import SnippetTree from "@/components/snippet/SnippetTree.vue";
import {ref, watch} from "vue";
import {downloadSnippet} from "@/api/snippet";

// 父传子参数
const prop = defineProps<{
  // snippetDownloadDialogVisible
  modelValue: boolean
}>()
// 向上触发更新
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

// 监听父类modelValue变化映射到snippetDownloadDialogVisible
const snippetDownloadDialogVisible = ref<boolean>(false)
watch<boolean>(() => prop.modelValue, () => {
  snippetDownloadDialogVisible.value = prop.modelValue
})

watch<boolean>(() => snippetDownloadDialogVisible.value, () => {
  emit("update:modelValue", snippetDownloadDialogVisible.value)
})


const snippetTreeRef = ref<InstanceType<typeof SnippetTree>>()

// dialog开启事件回调
const dialogOpenEventFunction = () => {
  snippetTreeRef.value.execute()
}

// 点击导出按钮事件回调
const downloadClickEventFunction = async () => {
  const res = await downloadSnippet({ids: snippetTreeRef.value.treeRef.getCheckedKeys(false)})
  const blobo = new Blob([res.data], {type: 'application/zip;charset=UTF-8'})
  const archor = document.createElement('a');
  archor.download = "CodeDictionary.zip"
  const href = window.URL.createObjectURL(blobo)
  archor.setAttribute('href', href)
  archor.click();
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