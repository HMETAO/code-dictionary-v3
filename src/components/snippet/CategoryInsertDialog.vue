<template>
    <div>
        <el-dialog
                title='添加 Category'
                v-model="categoryDialogVisible"
                @close='dialogCloseEventFunction'
                width='25%'>
            <!--category 表单-->
            <el-form :model='categoryInsertForm' ref='categoryInsertFormRef'>
                <el-form-item label='分组名：' prop='name'>
                    <el-input v-model='categoryInsertForm.name' placeholder='请输入分组名称'></el-input>
                </el-form-item>
                <el-form-item label='父分组：' prop="parentId">
                    <el-cascader
                            v-model='categoryInsertForm.parentId'
                            :options='categoryData as  CategoryMenusType[] '
                            :props='categoryProps'
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
        <el-button type='primary' @click="categoryInsertClickEventFunction">确 定</el-button>
        <el-button @click="changeCategoryDialogVisible">取 消</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">

import {CategoryInsertForm} from "../../form/Category";
import {ref, watch} from "vue";
import {getCategory, insertCategory} from "../../api/category";
import {CategoryMenusType} from "../../type/categoryType";
import {successMessage} from "../../utils/baseMessage";
import {FormInstance} from "element-plus";


// 级联选择配置
const categoryProps = {
    value: 'id',
    checkStrictly: true,
    emitPath: false
}

// 表单Dom
const categoryInsertFormRef = ref<FormInstance>()

// form
const categoryInsertForm = ref<CategoryInsertForm>({parentId: "0"})

// 父传子参数
const prop = defineProps<{
    // categoryDialogVisible
    modelValue: boolean
}>()

// 向上触发更新
const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void
    (e: 'on-insert', data: CategoryMenusType): void
}>()

// 新增category接口回调
const categoryInsertClickEventFunction = async () => {
    // 调用接口插入category
    const res = await insertCategory(categoryInsertForm.value)
    successMessage("添加分组成功")
    emit('on-insert', res.data)
    // 关闭dialog
    changeCategoryDialogVisible()

}

// 声明获取category接口
const {data, execute} = getCategory(false, false)

let categoryData = ref<CategoryMenusType[]>([{label: "顶级分组", id: "0"}])

// 初始化方法
const init = async () => {
    await execute()
    categoryData.value = categoryData.value.concat(data.value as CategoryMenusType)
}

// 调用初始化方法
init()


// dialog关闭回调
const dialogCloseEventFunction = () => {
    changeCategoryDialogVisible()
}

// 向上修改CategoryDialogVisible
const changeCategoryDialogVisible = () => {
    // 重置表单
    categoryInsertFormRef.value?.resetFields()
    emit("update:modelValue", false)
}

// 监听父类modelValue变化映射到categoryDialogVisible
const categoryDialogVisible = ref<boolean>(false)
watch<boolean>(() => prop.modelValue, () => {
    categoryDialogVisible.value = prop.modelValue
})
</script>
<style scoped lang="less">

</style>
