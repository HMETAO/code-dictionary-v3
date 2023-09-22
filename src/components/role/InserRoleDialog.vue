<template>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      @open="openClickEventFunction"
      width="30%">
    <el-form>


    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref, watch} from "vue";

const props = defineProps<{ modelValue: boolean }>()
const dialogVisible = ref<boolean>(false)

watch(() => props.modelValue, () => {
  dialogVisible.value = props.modelValue
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
// 开启dialog事件函数
const openClickEventFunction = () => {
  
}
</script>

<style scoped lang="less">

</style>