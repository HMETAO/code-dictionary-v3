<template>
  <div>
    <el-dialog v-model="snippetDialogVisible"
               @open="dialogOpenEventFunction"
               @close="dialogCloseEventFunction(snippetFormRef)">
      <el-form ref="snippetFormRef" :model="snippetForm" label-width="120px">
        <el-form-item prop="title" label='标题：'>
          <el-input placeholder='请输入标题' v-model='snippetForm.title'></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="分类：">
          <el-cascader
              v-model='snippetForm.categoryId'
              :options='data as  CategoryMenusType[] '
              :props='categoryProps'
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertSnippetClickEventFunction">Create</el-button>
          <el-button @click='changeSnippetDialogVisible'>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {ref, watch, getCurrentInstance} from 'vue';
import {getCategory} from "@/api/category";
import {useBaseStore, useStateStore} from "@/store";
import {CategoryMenusType} from "@/type/categoryType";
import {insertSnippet} from "@/api/snippet";
import {SnippetForm} from "@/form/snippet";
import {FormInstance} from "element-plus";
import {storeToRefs} from "pinia";
import {successMessage} from "@/utils/baseMessage";
import {SNIPPET_GET_EVENT, SNIPPET_INSERT_EVENT} from "@/constants/eventConstants";

const {data, execute} = getCategory(false, false)
const stateStore = useStateStore()
const baseStore = useBaseStore()
const instance = getCurrentInstance()
const categoryProps = {
  value: 'id',
  checkStrictly: true,
  emitPath: false
}

const {snippetForm} = storeToRefs(stateStore)
const snippetFormRef = ref<FormInstance>()
// 点击插入snippet按钮
const insertSnippetClickEventFunction = async () => {
  // 判断是markdown还是code类型
  snippetForm.value.type = baseStore.isMarkDown ? 1 : 0;
  const res = await insertSnippet(snippetForm.value as SnippetForm)
  successMessage("插入成功")
  instance?.proxy?.$bus.emit(SNIPPET_INSERT_EVENT)
  // 刷新Snippet界面数据
  instance?.proxy?.$bus.emit(SNIPPET_GET_EVENT, res.data)
  // 关闭dialog
  changeSnippetDialogVisible()
}
// 打开dialog后事件回调
const dialogOpenEventFunction = () => {
  // 发送请求category信息
  execute()
}
// 父传子参数
const prop = defineProps<{
  // snippetDialogVisible
  modelValue: boolean
}>()

// 向上触发更新
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

// 监听父类modelValue变化映射到isSnippetDialog
const snippetDialogVisible = ref<boolean>(false)
watch<boolean>(() => prop.modelValue, () => {
  snippetDialogVisible.value = prop.modelValue
})

// 关闭对话框触发事件函数
const dialogCloseEventFunction = (snippetFormRef: FormInstance | undefined) => {
  // 重置表单
  snippetFormRef?.resetFields()
  changeSnippetDialogVisible()
}

// 关闭dialog
const changeSnippetDialogVisible = () => {
  emit('update:modelValue', false)
}
</script>
<style scoped lang="less">

</style>
