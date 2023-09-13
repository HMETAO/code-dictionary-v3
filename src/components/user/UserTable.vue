<template>
  <el-table :data="userTable as Array<UserRole>" style="width: 100%" border>
    <el-table-column type="expand">
      <template #default="props">
        <el-tag style="margin: 0 10px" v-for="(item,index) in props.row.roles" :key="index">{{ item.roleName }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="180" align="center"/>
    <el-table-column prop="mobile" label="电话" width="180" align="center"/>
    <el-table-column prop="email" label="邮箱" align="center"/>
    <el-table-column prop="lastLoginTime" label="最后登录时间" align="center"/>
    <el-table-column prop="" label="操作" align="center">
      <template #default="scope">
        <el-button type="primary">修改</el-button>
        <el-button type="danger" @click="deleteEventFunction(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>

import {UserRole} from "@/type/userType";
import {getCurrentInstance, ref, watch} from "vue";
import {deleteUser} from "@/api/user";
import {errorMessageBox, successMessage} from "@/utils/baseMessage";
import {DELETE_USER_EVENT} from "@/constants/eventConstants";

const instance = getCurrentInstance()
const props = defineProps<{
  modelValue: Array<UserRole>
}>()

const emit = defineEmits<{}>()
const userTable = ref<UserRole[]>()

watch<UserRole[]>(() => props.modelValue, () => {
  userTable.value = props.modelValue
})

// 点击删除用户事件回调
const deleteEventFunction = async (row: UserRole) => {
  errorMessageBox(undefined, `是否删除 ${row.username} `).then(async () => {
    await deleteUser(row.id as string)
    successMessage("删除成功")
    instance?.proxy?.$bus.emit(DELETE_USER_EVENT)
  })
}


</script>
<style scoped lang="less">

</style>