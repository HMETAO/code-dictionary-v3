<template>
  <el-dialog
      @close="closeDialogEventFunction"
      v-model="dialogVisible"
      width="60%">
    <el-form
        :model='updatePermissionForm'
        ref='ruleFormRef'>
      <el-form-item label="权限名：" prop="name">
        <el-input v-model="updatePermissionForm.name" placeholder="例如：用户查询"/>
      </el-form-item>
      <el-form-item label="权限标识：" prop="path">
        <el-input v-model="updatePermissionForm.path"
                  placeholder="增删改查对应关键字：insert、delete、update、select 例如：user-select(模块名-权限关键词)"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="updateClickEventFunction">Update</el-button>
      <el-button @click='closeDialogEventFunction'>Cancel</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {getCurrentInstance, ref} from "vue";
import {FormInstance} from "element-plus";
import {successMessage} from "@/utils/baseMessage";
import {UPDATE_PERMISSION_EVENT} from "@/constants/eventConstants";
import {getPermission, updatePermission} from "@/api/permission";
import {Permission} from "@/type/permissionType";
import {UpdatePermissionForm} from "@/form/permission";

const instance = getCurrentInstance()
const updatePermissionForm = ref<UpdatePermissionForm>({})
const ruleFormRef = ref<FormInstance>()

const permission = ref<Permission>({} as any)

// 向上触发更新
const emit = defineEmits<{
  (e: "closeDialogEventFunction"): void
}>()
const updateClickEventFunction = async () => {
  await updatePermission(updatePermissionForm.value)
  // 更新角色
  successMessage("修改成功")
  dialogVisible.value = false;
  instance?.proxy?.$bus.emit(UPDATE_PERMISSION_EVENT)
}

// 点击修改角色信息
const editPermission = async (permissionId: string) => {
  dialogVisible.value = true
  // 查询要修改权限的信息
  const res = await getPermission(permissionId)
  updatePermissionForm.value = res.data
}


// 监听父类modelValue变化映射到updateDialogVisible
const dialogVisible = ref<boolean>(false)

// 关闭dialog事件回调
const closeDialogEventFunction = () => {
  ruleFormRef.value?.resetFields()
  dialogVisible.value = false;
}

// 暴露给父组件
defineExpose({editPermission})
</script>

<style scoped lang="less">

</style>