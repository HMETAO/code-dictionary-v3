<template>
  <el-table :data="roleTable as Array<RolePermission>" style="width: 100%" border>
    <el-table-column type="expand">
      <template #default="props">
        <el-tag style="margin: 0 10px" v-for="(item,index) in props.row.perms" :key="index">{{ item.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="roleName" label="角色名" width="180" align="center"/>
    <el-table-column prop="roleSign" label="角色标识" width="180" align="center"/>
    <el-table-column prop="createTime" label="创建时间" width="180" align="center"/>
    <el-table-column prop="status" label="状态" width="180" align="center">
      <template #default="props">
        <el-switch
            v-model="props.row.status"
            @change="switchChangeEventFunction(props.row)"
            style="--el-switch-on-color: #13ce66;"
        />
      </template>
    </el-table-column>
    <el-table-column label=" 操作
        " align="center">
      <template #default="scope">
        <el-button type="primary" size="small" @click="roleUpdateInfoDialogRef.editRoleInfo(scope.row.id)">修改
        </el-button>
        <el-button type="danger" size="small" @click="deleteEventFunction(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <RoleUpdateInfoDialog ref="roleUpdateInfoDialogRef"/>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref, watch} from "vue";
import {errorMessageBox, successMessage} from "@/utils/baseMessage";
import {DELETE_ROLE_EVENT} from "@/constants/eventConstants";
import {RolePermission} from "@/type/roleType";
import {deleteRole, updateStatusRole} from "@/api/role";
import RoleUpdateInfoDialog from "@/components/role/RoleUpdateInfoDialog.vue";

const instance = getCurrentInstance()
const props = defineProps<{
  modelValue: Array<RolePermission>
}>()
const emit = defineEmits<{}>()
const roleTable = ref<RolePermission[]>([])

const roleUpdateInfoDialogRef = ref<InstanceType<typeof RoleUpdateInfoDialog>>()

watch<RolePermission[]>(() => props.modelValue, () => {
  roleTable.value = props.modelValue
})

// 切换role状态
const switchChangeEventFunction = async (row: any) => {
  console.log(row)
  try {
    await updateStatusRole({status: row.status, id: row.id})
    successMessage("切换成功")
  } catch (e) {
    row.status = !row.status;
  }
}
// 点击删除用户事件回调
const deleteEventFunction = async (row: RolePermission) => {
  errorMessageBox(undefined, `是否删除 ${row.roleName}`).then(async () => {
    // 删除角色
    await deleteRole(row.id)
    successMessage("删除成功")
    instance?.proxy?.$bus.emit(DELETE_ROLE_EVENT)
  })
}

</script>
<style scoped lang="less">

</style>