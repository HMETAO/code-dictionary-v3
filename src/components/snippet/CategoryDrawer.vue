<template>
    <el-drawer v-model="isCategoryDrawer" :with-header="false"
               direction="rtl"
               :before-close="drawerBeforeCallBack"
               @open="drawerOpenEventFunction">
        <template #default>
            <el-tree v-loading="isFetching" :data="data as CategoryMenusType[]" :expand-on-click-node="false"
                     @node-click="nodeClickEventFunction">
                <template v-slot="{node,data}">
                    <div class="flex w-full">
                        <div style="display: flex;align-items: center;flex-direction: row">
                            <div style="display: flex;margin-right: 5px;align-items: center;">
                                <el-icon v-if="!data.snippet">
                                    <Folder/>
                                </el-icon>
                                <el-icon v-else>
                                    <Memo/>
                                </el-icon>
                            </div>
                            {{ data.label + (!data.snippet ? "" : (data.type === 0 ? ".cd" : ".md")) }}
                        </div>
                        <div class="flex-1"></div>
                        <div>
                            <el-button v-if='!data.snippet' text type="primary" size="small"
                                       @click="categoryDialogVisible = true">新增
                            </el-button>
                        </div>
                        <div>
                            <el-button text type="primary" size="small" @click="delCategoryEventFunction(data.id)">
                                删除
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-tree>
        </template>
        <template #footer>
            <el-button type="warning" size="large" @click="stateStore.snippetDialogVisible = true">
                新增 {{ baseStore.isMarkDown ? "MarkDown" : "Code" }} 文件
            </el-button>
            <el-button type="primary" size="large" @click="changeSnippetEventFunction">切换展示面板</el-button>
        </template>
    </el-drawer>
  <!--category-dialog-->
    <CategoryInsertDialog v-model="categoryDialogVisible" @on-insert="insertEventFunction"/>

</template>
<script setup lang="ts">
import {getCurrentInstance, ref, watch} from 'vue';
import {deleteCategory, getCategory} from "../../api/category";
import {CategoryMenusType} from "../../type/categoryType";
import {getSnippet} from "../../api/snippet";
import {TypeEnum} from "../../enums/typeEnum";
import {useBaseStore, useStateStore} from "../../store";
import {SnippetType} from "../../type/snippetType";
import {Result} from "../../result";
import {SNIPPET_GET_EVENT} from "../../constants/EventConstants";
import {infoMessageBox, successMessage} from "../../utils/baseMessage";
import {BASE_SNIPPET} from "../../constants/BaseConstants";
import CategoryInsertDialog from "./CategoryInsertDialog.vue";

const instance = getCurrentInstance()
const baseStore = useBaseStore()
const stateStore = useStateStore()
// 点击新增 category 事件回调
const categoryDialogVisible = ref<boolean>(false)
// 请求category但是手动触发模式
let {data, isFetching, execute} = getCategory(false)


// 子组件新增成功事件通知
const insertEventFunction = (sonData: CategoryMenusType) => {
    execute()
}

// 删除 category 事件回调
const delCategoryEventFunction = async (id: string) => {
    // 调用api删除Category
    await deleteCategory(id)
    successMessage("删除 Category 成功")
    // 刷新category列表
    execute()
}

// 切换面板事件回调
const changeSnippetEventFunction = () => {
    // 切换标志位
    baseStore.isMarkDown = !baseStore.isMarkDown
    stateStore.snippetForm = BASE_SNIPPET
}

// 点击节点事件函数
const nodeClickEventFunction = async (data: CategoryMenusType) => {
    if (!data.id) return
    // 若点击的是snippet文件
    if (data.snippet) {
        // 查询snippet
        const res: Result<SnippetType> = await getSnippet(data.id.replaceAll('sn-', ''))
        // 选择的是code文件，但是当前在markdown面板
        if (data.type == TypeEnum.code) {
            if (baseStore.isMarkDown) {
                try {
                    await infoMessageBox("界面切换", "选择的Snippet为Code，是否切换界面")
                    changeSnippetEventFunction()
                } catch (e) {
                    return
                }
            }
        } else if (data.type == TypeEnum.markdown) {
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
