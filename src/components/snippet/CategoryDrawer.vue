<template>
  <el-drawer v-model="isCategoryDrawer" :with-header="false"
             direction="rtl"
             :before-close="drawerBeforeCallBack"
             @open="drawerOpenEventFunction">
    <template #default>
      <SnippetTree @node-click="nodeClickEventFunction" ref="snippetTreeRef">
        <template #node-end="{data}">
          <div>
            <el-button v-if='!data.snippet' text type="primary" size="small" @click="categoryDialogVisible = true">
              新增
            </el-button>
          </div>
          <div>
            <el-button text type="primary" size="small" @click="delCategoryEventFunction(data)">
              删除
            </el-button>
          </div>
        </template>
      </SnippetTree>
    </template>
    <template #footer>
      <!--footer区域-->
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
import {getCurrentInstance, nextTick, ref, watch} from 'vue';
import {deleteCategory} from "@/api/category";
import {CategoryMenusType} from "@/type/categoryType";
import {deleteSnippet, getSnippet} from "@/api/snippet";
import {TypeEnum} from "@/enums/typeEnum";
import {useBaseStore, useStateStore} from "@/store";
import {SnippetType} from "@/type/snippetType";
import {Result} from "@/result";
import {SNIPPET_GET_EVENT, SNIPPET_INSERT_EVEN} from "@/constants/eventConstants";
import {errorMessageBox, infoMessageBox, successMessage} from "@/utils/baseMessage";
import {BASE_SNIPPET} from "@/constants/baseConstants";
import CategoryInsertDialog from "./CategoryInsertDialog.vue";
import SnippetTree from "./SnippetTree.vue";

// 点击新增 category 事件回调
const categoryDialogVisible = ref<boolean>(false)
const instance = getCurrentInstance()
const baseStore = useBaseStore()
const stateStore = useStateStore()

const snippetTreeRef = ref<InstanceType<typeof SnippetTree>>()

// 父传子参数
const prop = defineProps<{
  // isCategoryDrawer
  modelValue: boolean
}>()

// 向上触发更新
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

// 新增Snippet触发回调
instance?.proxy?.$bus.on(SNIPPET_INSERT_EVEN, () => {
  if (snippetTreeRef.value)
    snippetTreeRef.value.execute()
})

// 监听父类modelValue变化映射到isCategoryDrawer
const isCategoryDrawer = ref<boolean>(false)
watch<boolean>(() => prop.modelValue, () => {
  isCategoryDrawer.value = prop.modelValue
})

const updateModelValueEventFunction = (val: boolean) => {
  // 修改父isCategoryDrawer值
  emit('update:modelValue', val)
}

// 切换面板事件回调
const changeSnippetEventFunction = () => {
  // 切换标志位
  baseStore.isMarkDown = !baseStore.isMarkDown
  stateStore.snippetForm = JSON.parse(BASE_SNIPPET)
}

// node点击事件回调
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
    // 让数据先更新，界面切换后会注册 SNIPPET_GET_EVENT 事件否则造成发了通知，但是页面未注册事件的情况
    await nextTick()
    // 触发获取snippet事件
    instance?.proxy?.$bus.emit(SNIPPET_GET_EVENT, res.data)
  }
}

// 删除 category 事件回调
const delCategoryEventFunction = async (data: CategoryMenusType) => {
  try {
    // 删除的是category
    if (!data.snippet) {
      await errorMessageBox("删除 Category", "是否确认删除该分组，若该分类下有子分组将移动至通用分组")
      // 调用api删除Category
      await deleteCategory(data.id as string)
      successMessage("删除 Category 成功")
    } else {
      await errorMessageBox("删除 Snippet", "是否确认删除该snippet")
      // 调用api删除Snippet
      await deleteSnippet(data.id?.replaceAll("sn-", "") as string)
      successMessage("删除 Snippet 成功")
    }
    // 刷新category列表
    snippetTreeRef.value.execute()
  } catch (e) {
    return
  }
}

// 子组件新增成功事件通知
const insertEventFunction = () => {
  snippetTreeRef.value.execute()
}

// 关闭前回调
const drawerBeforeCallBack = () => {
  updateModelValueEventFunction(false)
}

// drawer打开事件函数
const drawerOpenEventFunction = () => {
  // 触发获取category网络请求
  snippetTreeRef.value.execute()
}

</script>
<style scoped lang="less">

</style>
