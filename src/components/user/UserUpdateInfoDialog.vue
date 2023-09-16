<template>
  <el-dialog
      @close="closeDialogEventFunction"
      v-model="dialogVisible"
      width="30%">


    <template #footer>
      <el-button type="primary" @click="">Create</el-button>
      <el-button @click='closeDialogEventFunction'>Cancel</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {getCurrentInstance, ref, watch} from "vue";

const instance = getCurrentInstance()
// 向上触发更新
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

// 父传子参数
const prop = defineProps<{
  // updateDialogVisible
  modelValue: boolean
}>()

// 监听父类modelValue变化映射到updateDialogVisible
const dialogVisible = ref<boolean>(false)
watch<boolean>(() => prop.modelValue, () => {
  dialogVisible.value = prop.modelValue
})
const closeDialogEventFunction = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="less">

</style>