<template>
  <el-dialog
      @open="openDialogEventFunction"
      @close="closeDialogEventFunction"
      v-model="dialogVisible"
      width="30%">
    <el-form
        :model='updateRoleForm'
        ref='ruleFormRef'>
      <el-form-item label="角色名：" prop="roleName">
        <el-input v-model="updateRoleForm.roleName" placeholder="例如：管理员"/>
      </el-form-item>
      <el-form-item label="角色标识：" prop="roleSign">
        <el-input v-model="updateRoleForm.roleSign" placeholder="例如：admin"/>
      </el-form-item>
      <el-form-item label="权限：" prop="perms">
        <el-select
            v-model="updateRoleForm.perms"
            multiple
            placeholder="Select"
            style="width: 240px">
          <el-option
              v-for="item in permissions"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="updateClickEventFunction">Update</el-button>
      <el-button @click='closeDialogEventFunction'>Cancel</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {getCurrentInstance, ref, toRaw} from "vue";
import {FormInstance} from "element-plus";
import {successMessage} from "@/utils/baseMessage";
import {UPDATE_ROLE_EVENT} from "@/constants/eventConstants";
import {getPermissions} from "@/api/permission";
import {Permission} from "@/type/permissionType";
import {UpdateRoleForm} from "@/form/role";
import {getRole, updateRole} from "@/api/role";

const instance = getCurrentInstance()
const updateRoleForm = ref<UpdateRoleForm>({})
const ruleFormRef = ref<FormInstance>()

const permissions = ref<Permission[]>([])
// 开启dialog事件函数
const openDialogEventFunction = async () => {
  const res = await getPermissions();
  permissions.value = res.data.list as any
}
// 向上触发更新
const emit = defineEmits<{
  (e: "closeDialogEventFunction"): void
}>()
const updateClickEventFunction = async () => {
  // 更新角色
  await updateRole(updateRoleForm.value)
  successMessage("修改成功")
  dialogVisible.value = false;
  instance?.proxy?.$bus.emit(UPDATE_ROLE_EVENT)
}

// 点击修改角色信息
const editRoleInfo = async (roleId: string) => {
  dialogVisible.value = true
  // 查询要修改用户的信息
  const res = await getRole(roleId)
  // 将一部分数据结构出来给form
  updateRoleForm.value = (({roleName, roleSign, id}) => ({roleName, roleSign, id}))(res.data)

  // 跟已有的roles合并并去重
  permissions.value = unique(permissions.value.map(p => toRaw(p)).concat(res.data.perms as any))
  updateRoleForm.value.perms = res.data.perms?.map(item => {
    return item.id
  });
}

const unique = (arr: Array<any>) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item.id) && res.set(item.id, 1));
}

// 监听父类modelValue变化映射到updateDialogVisible
const dialogVisible = ref<boolean>(false)

// 关闭dialog事件回调
const closeDialogEventFunction = () => {
  ruleFormRef.value?.resetFields()
  dialogVisible.value = false;
}

// 暴露给父组件
defineExpose({editRoleInfo})
</script>

<style scoped lang="less">

</style>