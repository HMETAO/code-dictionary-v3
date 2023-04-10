<template>
    <el-drawer v-model="isCategoryDrawer" :with-header="false"
               direction="rtl"
               :before-close="drawerBeforeCallBack"
               @open="drawerOpenEventFunction">
        <template #default>
            <el-tree v-loading="isFetching" :data="data"/>
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
import {getCategory} from "../api/category";

// 关闭前回调
const drawerBeforeCallBack = () => {
    updateModelValueEventFunction(false)
}
// 请求category但是手动触发模式
let {data, isFetching, execute} = getCategory(false)
// drawer打开事件函数
const drawerOpenEventFunction = () => {
    // 触发获取category网络请求
    execute()
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
