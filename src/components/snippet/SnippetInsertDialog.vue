<template>
    <div>
        <el-dialog v-model="snippetDialogVisible" @close="dialogCloseEventFunction">

        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed, watch} from 'vue';

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
const dialogCloseEventFunction = () => {
    emit('update:modelValue', false)
}
</script>
<style scoped lang="less">

</style>
