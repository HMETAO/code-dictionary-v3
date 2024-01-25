<template>
  <el-table :data="permissionTable as Array<Permission>" style="width: 100%" border>
    <el-table-column prop="name" label="权限名" width="180" align="center"/>
    <el-table-column prop="path" label="权限标识" width="180" align="center"/>
    <el-table-column prop="createTime" label="赋予时间" width="180" align="center"/>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" size="small" @click="permissionUpdateInfoDialog.editPermission(scope.row.id)">修改
        </el-button>
        <el-button type="danger" size="small" @click="deleteEventFunction(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <PermissionUpdateInfoDialog ref="permissionUpdateInfoDialog"/>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref, watch} from "vue";
import {errorMessageBox, successMessage} from "@/utils/baseMessage";
import {DELETE_PERMISSION_EVENT} from "@/constants/eventConstants";
import {Permission} from "@/type/permissionType";
import PermissionUpdateInfoDialog from "@/components/permission/PermissionUpdateInfoDialog.vue";
import {deletePermission} from "@/api/permission";

const instance = getCurrentInstance()
const props = defineProps<{
  modelValue: Array<Permission>
}>()
const emit = defineEmits<{}>()
const permissionTable = ref<Permission[]>([])

const permissionUpdateInfoDialog = ref<InstanceType<typeof PermissionUpdateInfoDialog>>()

watch<Permission[]>(() => props.modelValue, () => {
  permissionTable.value = props.modelValue
})

// 点击删除用户事件回调
const deleteEventFunction = async (row: Permission) => {
  errorMessageBox(undefined, `是否删除 ${row.name}`).then(async () => {
    // 删除角色
    await deletePermission(row.id)
    successMessage("删除成功")
    instance?.proxy?.$bus.emit(DELETE_PERMISSION_EVENT)
  })
}

</script>
<style scoped lang="less">

</style>