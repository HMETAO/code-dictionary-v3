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
            <el-button type="warning" size="large" @click="snippetDialogVisible = true">
                新增 {{ baseStore.isMarkDown ? "MarkDown" : "Code" }} 文件
            </el-button>
            <el-button type="primary" size="large" @click="changeSnippetEventFunction">切换展示面板</el-button>
        </template>
    </el-drawer>
    <SnippetInsertDialog v-model="snippetDialogVisible"/>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref, watch} from 'vue';
import {getCategory} from "../../api/category";
import {CategoryMenusType} from "../../type/categoryType";
import {getSnippet} from "../../api/snippet";
import {TypeEnum} from "../../enums/typeEnum";
import {useBaseStore, useStateStore} from "../../store";
import {ElMessageBox} from "element-plus";
import {SnippetType} from "../../type/snippetType";
import {Result} from "../../result";
import {SNIPPET_GET_EVENT} from "../../constants/EventConstants";
import {infoMessageBox} from "../../utils/baseMessage";
import SnippetInsertDialog from "./SnippetInsertDialog.vue";
import {BASE_SNIPPET} from "../../constants/BaseConstants";

const instance = getCurrentInstance()
const snippetDialogVisible = ref<boolean>(false)
const baseStore = useBaseStore()
const stateStore = useStateStore()

// 切换面板事件回调
const changeSnippetEventFunction = () => {
    // 切换标志位
    baseStore.isMarkDown = !baseStore.isMarkDown
    stateStore.snippetForm = BASE_SNIPPET
}
// 点击节点事件函数
const nodeClickEventFunction = async (data: CategoryMenusType) => {
    // 若点击的是snippet文件
    if (data.snippet) {
        // 查询snippet
        const res: Result<SnippetType> = await getSnippet(data.id.replaceAll('sn-', ''))
        // 选择的是code文件，但是当前在markdown面板
        if (res.data.type == TypeEnum.code) {
            if (baseStore.isMarkDown) {
                try {
                    await infoMessageBox("界面切换", "选择的Snippet为Code，是否切换界面")
                    changeSnippetEventFunction()
                } catch (e) {
                    return
                }
            }
        } else if (res.data.type == TypeEnum.markdown) {
            if (!baseStore.isMarkDown) {
                try {
                    await infoMessageBox("界面切换", "选择的Snippet为Markdown，是否切换界面")
                    changeSnippetEventFunction()
                } catch (e) {
                    return
                }
            }
        }
        // 选择的snippet的分类
        res.data.categoryId = data.parentId
        // 触发获取snippet事件
        instance?.proxy?.$bus.emit(SNIPPET_GET_EVENT, res.data)
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
