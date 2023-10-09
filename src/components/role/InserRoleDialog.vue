<template>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      @open="openClickEventFunction"
      @close="closeDialogEventFunction"
      width="30%">
    <el-form :model="roleForm" ref="roleFormRef">
      <el-form-item label="角色名：" prop="roleName">
        <el-input v-model="roleForm.roleName" placeholder="例如：管理员"/>
      </el-form-item>
      <el-form-item label="角色标识：" prop="roleSign">
        <el-input v-model="roleForm.roleSign" placeholder="例如：admin"/>
      </el-form-item>
      <el-form-item label="权限：" prop="perms">
        <el-select v-model="roleForm.perms"
                   multiple
                   style="width: 240px"
                   placeholder="Select">
          <el-option
              v-for="item in permissions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertClickEventFunction">
          Insert
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>

import {getCurrentInstance, ref, watch} from "vue";
import {getPermission} from "@/api/permission";
import {Permission} from "@/type/permissionType";
import {RolePermissionForm} from "@/form/role";
import {FormInstance} from "element-plus";
import {insertRole} from "@/api/role";
import {successMessage} from "@/utils/baseMessage";
import {INSERT_ROLE_EVENT} from "@/constants/eventConstants";

const instance = getCurrentInstance()
const roleFormRef = ref<FormInstance>()
const props = defineProps<{ modelValue: boolean }>()
const dialogVisible = ref<boolean>(false)
const roleForm = ref<RolePermissionForm>({})
watch(() => props.modelValue, () => {
  dialogVisible.value = props.modelValue
})

watch(() => dialogVisible.value, () => {
  emit('update:modelValue', dialogVisible.value)
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
const permissions = ref<Array<Permission>>([])
// 点击插入事件函数
const insertClickEventFunction = async () => {
  // 插入role
  await insertRole(roleForm.value)
  successMessage("插入角色成功")
  dialogVisible.value = false
  // 触发插入成功事件
  instance?.proxy?.$bus.emit(INSERT_ROLE_EVENT)
}
// 开启dialog事件函数
const openClickEventFunction = async () => {
  const res = await getPermission();
  permissions.value = res.data.list as any
}

// 关闭dialog事件函数
const closeDialogEventFunction = () => {
  // 重置form
  roleFormRef.value?.resetFields()
}

</script>

<style scoped lang="less">

</style>