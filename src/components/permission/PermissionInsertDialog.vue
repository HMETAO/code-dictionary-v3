<template>
  <el-dialog
      @close="closeDialogEventFunction"
      v-model="dialogVisible"
      width="60%">
    <el-form
        :rules="rules"
        :model='permissionForm'
        ref='ruleFormRef'>
      <el-form-item label="权限名：" prop="name">
        <el-input v-model="permissionForm.name" placeholder="例如：用户查询"/>
      </el-form-item>
      <el-form-item label="权限标识：" prop="path">
        <el-input v-model="permissionForm.path"
                  placeholder="增删改查对应关键字：insert、delete、update、select 例如：user-select(模块名-权限关键词)"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="insertClickEventFunction">Insert</el-button>
      <el-button @click='closeDialogEventFunction'>Cancel</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>

import {getCurrentInstance, reactive, ref, watch} from "vue";
import {insertPermission} from "@/api/permission";
import {FormInstance, FormRules} from "element-plus";
import {errorMessage, successMessage} from "@/utils/baseMessage";
import {INSERT_PERMISSION_EVENT} from "@/constants/eventConstants";
import {InsertPermissionForm} from "@/form/permission";

const instance = getCurrentInstance()
const roleFormRef = ref<FormInstance>()
const props = defineProps<{ modelValue: boolean }>()
const dialogVisible = ref<boolean>(false)
const permissionForm = ref<InsertPermissionForm>({})
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '权限名是必须的',
    }
  ],
  path: [
    {
      required: true,
      pattern: /.*-?(\*|select|update|delete|insert)/,
      message: '权限标识格式错误',
      trigger: 'blur'
    }
  ],
})
watch(() => props.modelValue, () => {
  dialogVisible.value = props.modelValue
})

watch(() => dialogVisible.value, () => {
  emit('update:modelValue', dialogVisible.value)
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
// 点击插入事件函数
const insertClickEventFunction = async () => {
  if (!ruleFormRef) return
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 插入permission
      await insertPermission(permissionForm.value)
      successMessage("插入权限成功")
      dialogVisible.value = false
      // 触发插入成功事件
      instance?.proxy?.$bus.emit(INSERT_PERMISSION_EVENT)
    } else {
      errorMessage("请按规则填写内容")
    }
  })
}

// 关闭dialog事件函数
const closeDialogEventFunction = () => {
  // 重置form
  roleFormRef.value?.resetFields()
}

</script>

<style scoped lang="less">

</style>