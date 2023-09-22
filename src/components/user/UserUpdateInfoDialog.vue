<template>
  <el-dialog
      @open="openDialogEventFunction"
      @close="closeDialogEventFunction"
      v-model="dialogVisible"
      width="30%">
    <el-form
        label-width='0px'
        :model='userRoleUpdateForm'
        :rules="rules"
        ref='ruleFormRef'>
      <!-- 用户名 -->
      <el-form-item prop='username'>
        <el-input
            placeholder='请输入用户名'
            v-model='userRoleUpdateForm.username'>
          <template #prefix>
            <el-icon>
              <UserFilled/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!--手机号-->
      <el-form-item prop='mobile'>
        <el-input placeholder='手机号' v-model='userRoleUpdateForm.mobile'>
          <template #prefix>
            <el-icon>
              <Iphone/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!--邮箱-->
      <el-form-item prop='email'>
        <el-input placeholder='邮箱' v-model='userRoleUpdateForm.email'>
          <template #prefix>
            <el-icon>
              <Position/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="roles">
        <el-select
            v-model="userRoleUpdateForm.roles"
            multiple
            placeholder="Select"
            style="width: 240px">
          <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
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
import {getCurrentInstance, reactive, ref, toRaw, toRef, toRefs} from "vue";
import {getUser, updateUser} from "@/api/user";
import {FormInstance, FormRules} from "element-plus";
import {UserRoleUpdateForm} from "@/form/user";
import {successMessage} from "@/utils/baseMessage";
import {getRoles} from "@/api/role";
import {Role} from "@/type/roleType";
import {UPDATE_USER_EVENT} from "@/constants/eventConstants";

const instance = getCurrentInstance()
const userRoleUpdateForm = ref<UserRoleUpdateForm>({})

const ruleFormRef = ref<FormInstance>()
// 表单rules
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  mobile: [
    {
      required: true,
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      trigger: 'blur',
      message: '邮箱格式错误'
    }
  ]
})

const roles = ref<Role[]>([])

// 开启dialog事件函数
const openDialogEventFunction = async () => {
  const res = await getRoles()
  roles.value = res.data
}
// 向上触发更新
const emit = defineEmits<{
  (e: "closeDialogEventFunction"): void
}>()
const updateClickEventFunction = async () => {
  await updateUser(userRoleUpdateForm.value)
  successMessage("修改成功")
  dialogVisible.value = false;
  instance?.proxy?.$bus.emit(UPDATE_USER_EVENT)
}

// 点击修改用户信息
const editUserInfo = async (userId: string) => {
  dialogVisible.value = true
  // 查询要修改用户的信息
  const res = await getUser(userId)
  // 将一部分数据结构出来给form
  userRoleUpdateForm.value = (({id, email, username, mobile}) => ({
    id,
    email,
    username,
    mobile
  }))(res.data)
  // 跟已有的roles合并并去重
  roles.value = unique(roles.value.map(r => toRaw(r)).concat(res.data.roles as any))
  userRoleUpdateForm.value.roles = res.data.roles?.map(item => {
    return item.id
  });
}

const unique = (arr: Array<Role>) => {
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
defineExpose({editUserInfo})
</script>

<style scoped lang="less">

</style>