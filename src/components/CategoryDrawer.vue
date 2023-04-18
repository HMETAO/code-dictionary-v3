<template>
    <el-drawer v-model="isCategoryDrawer" :with-header="false"
               direction="rtl"
               :before-close="drawerBeforeCallBack"
               @open="drawerOpenEventFunction">
        <template #default>
            <el-tree v-loading="isFetching" :data="data" :expand-on-click-node="false"
                     @node-click="nodeClickEventFunction">
                <template v-slot="{node,data}">
                    <div class="flex w-full">
                        <div>
                            <el-icon v-if="!data.snippet">
                                <Folder/>
                            </el-icon>
                            <el-icon v-else>
                                <Memo/>
                            </el-icon>
                            {{ data.label }}
                        </div>
                        <div class="flex-1"></div>
                        <div>
                            <el-button v-if='!data.snippet' text type="primary" size="small">新增</el-button>
                        </div>
                        <div>
                            <el-button text type="primary" size="small">删除</el-button>
                        </div>
                    </div>
                </template>
            </el-tree>
        </template>
        <template #footer>
            <el-button type="primary" size="large" @click="changeSnippetEventFunction">切换展示面板</el-button>
        </template>

    </el-drawer>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed, watch} from 'vue';
import {getCategory} from "../api/category";
import {CategoryMenusType} from "../type/categoryType";
import {getSnippet} from "../api/snippet";
import {TypeEnum} from "../enums/typeEnum";
import {useBaseStore} from "../store";
const store = useBaseStore()
const changeSnippetEventFunction = () => {
    store.isMarkDown = !store.isMarkDown
}
// 点击节点事件函数
const nodeClickEventFunction = async (data: CategoryMenusType) => {
    if (data.snippet) {
        // 查询snippet
        const res = await getSnippet(data.id.replaceAll('sn-', ''))
        if (res.data.type == TypeEnum.code) {

        }

        console.log(res)
    }
}
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
