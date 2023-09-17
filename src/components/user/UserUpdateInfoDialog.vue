<template>
  <el-dialog
      @close="closeDialogEventFunction"
      v-model="dialogVisible"
      width="30%">
    <el-form
        label-width='0px'
        :model='userRoleForm'
        :rules="rules"
        ref='ruleFormRef'>
      <!-- 用户名 -->
      <el-form-item prop='username'>
        <el-input
            placeholder='请输入用户名'
            v-model='userRoleForm.username'>
          <template #prefix>
            <el-icon>
              <UserFilled/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!--手机号-->
      <el-form-item prop='mobile'>
        <el-input placeholder='手机号' v-model='userRoleForm.mobile'>
          <template #prefix>
            <el-icon>
              <Iphone/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!--邮箱-->
      <el-form-item prop='email'>
        <el-input placeholder='邮箱' v-model='userRoleForm.email'>
          <template #prefix>
            <el-icon>
              <Position/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!--头像-->
      <!--      <el-upload-->
      <!--          v-model:file-list="fileList"-->
      <!--          list-type='picture'-->
      <!--          action=''-->
      <!--          :limit='1'-->
      <!--          :auto-upload='false'-->
      <!--          accept='image/png, image/jpeg'>-->
      <!--        <el-button size='small' type='primary'>上传头像</el-button>-->
      <!--      </el-upload>-->
    </el-form>
    <template #footer>
      <el-button type="primary" @click="">Create</el-button>
      <el-button @click='closeDialogEventFunction'>Cancel</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {getCurrentInstance, reactive, ref} from "vue";
import {getUser} from "@/api/user";
import {UserRole} from "@/type/userType";
import {FormRules} from "element-plus";

const instance = getCurrentInstance()
const userRoleForm = ref<UserRole>({})
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

// 向上触发更新
const emit = defineEmits<{
  (e: "closeDialogEventFunction"): void
}>()

// 点击修改用户信息
const editUserInfo = async (userId: string) => {
  dialogVisible.value = true
  // 查询要修改用户的信息
  const res = await getUser(userId)
  userRoleForm.value = res.data;
}

// 监听父类modelValue变化映射到updateDialogVisible
const dialogVisible = ref<boolean>(false)

// 关闭dialog事件回调
const closeDialogEventFunction = () => {
  dialogVisible.value = false;
}

// 暴露给父组件
defineExpose({editUserInfo})
</script>

<style scoped lang="less">

</style>