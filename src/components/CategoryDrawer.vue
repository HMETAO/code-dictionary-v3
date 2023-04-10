<template>
    <el-drawer v-model="isCategoryDrawer" direction="rtl" :before-close="drawerBeforeCallBack">
        <template #header>
            <h4>set title by slot</h4>
        </template>
        <template #default>

        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="updateModelValueEventFunction(false)">cancel</el-button>
                <el-button type="primary">confirm</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed, watch} from 'vue';

// 关闭前回调
const drawerBeforeCallBack = () => {
    updateModelValueEventFunction(false)
}

// 父传子参数
const prop = defineProps<{
    // isCategoryDrawer
    modelValue: boolean
}>()

// 向上触发更新
const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void
}>()

// 监听父类modelValue变化映射到isCategoryDrawer
const isCategoryDrawer = ref<boolean>(false)
watch<boolean>(() => prop.modelValue, () => {
    isCategoryDrawer.value = prop.modelValue
})

const updateModelValueEventFunction = (val: boolean) => {
    // 修改父isCategoryDrawer值
    emit('update:modelValue', val)
}


</script>
<style scoped lang="less">

</style>
