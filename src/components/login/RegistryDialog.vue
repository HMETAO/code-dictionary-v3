<template>
  <div>
    <!--注册表单-->
    <el-dialog title='注册' v-model='dialogVisible' @close='registryDialogCloseEventFunction'>
      <el-form
          label-width='0px'
          :model='registryForm'
          :rules="rules"
          ref='ruleFormRef'
      >
        <!-- 用户名 -->
        <el-form-item prop='username'>
          <el-input
              placeholder='请输入用户名'
              v-model='registryForm.username'>
            <template #prefix>
              <el-icon>
                <UserFilled/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop='password'>
          <el-input placeholder='请输入密码' show-password v-model='registryForm.password'
                    autocomplete='off'>
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop='checkPassword'>
          <el-input placeholder='确认密码' show-password v-model='registryForm.checkPassword'
                    autocomplete='off'>
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!--手机号-->
        <el-form-item prop='mobile'>
          <el-input placeholder='手机号' v-model='registryForm.mobile'>
            <template #prefix>
              <el-icon>
                <Iphone/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!--邮箱-->
        <el-form-item prop='email'>
          <el-input placeholder='邮箱' v-model='registryForm.email'>
            <template #prefix>
              <el-icon>
                <Position/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!--头像-->
        <el-upload
            v-model:file-list="fileList"
            list-type='picture'
            action=''
            :limit='1'
            :auto-upload='false'
            accept='image/png, image/jpeg'
        >
          <el-button size='small' type='primary'>上传头像</el-button>
        </el-upload>
        <!-- 按钮区域 -->
        <el-form-item class='login-btn'>
          <el-button type='primary' @click='registryClickEventFunction'>注册</el-button>
          <el-button type='info' @click='resetCloseEventFunction'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {RegistryForm} from "@/form/user";
import {FormInstance, FormRules, UploadUserFile} from "element-plus";
import {registry} from "@/api/user";
import {infoMessage, successMessage} from "@/utils/baseMessage";


const fileList = ref<UploadUserFile[]>([])
const ruleFormRef = ref<FormInstance>()

// 自定义规则
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registryForm.checkPassword !== '') {
      ruleFormRef.value?.validateField('checkPassword')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registryForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
// 表单rules
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '长度至少为8，至少含有一个字母和一个数字',
      trigger: 'blur'
    },
    {required: true, validator: validatePass, trigger: 'blur'}
  ],
  checkPassword: [
    {required: true, validator: validatePass2, trigger: 'blur'}
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
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
const dialogVisible = ref<boolean>(false)
watch(() => props.modelValue, () => {
      dialogVisible.value = props.modelValue
    }
)
const registryForm = reactive<RegistryForm>({})

// 关闭注册dialog事件回调
const registryDialogCloseEventFunction = () => {
  emit("update:modelValue", false)
  resetCloseEventFunction()
}

// 点击注册事件回调函数
const registryClickEventFunction = async () => {
  ruleFormRef.value?.validate(async (isValid) => {
    if (isValid) {
      // 构建formData对象
      const formData = new FormData()
      formData.append('username', registryForm.username as string)
      formData.append('password', registryForm.password as string)
      formData.append('email', registryForm.email as string)
      formData.append('mobile', registryForm.mobile as string)
      if (fileList.value.length != 0)
        formData.append('file', fileList.value[0].raw as File)
      await registry(formData)
      successMessage("注册成功")
      registryDialogCloseEventFunction()
    } else {
      infoMessage("请按要求填写注册表单")
    }

  })

}

const resetCloseEventFunction = () => {
  ruleFormRef.value?.resetFields()
  fileList.value = []
}
</script>
<style scoped lang="less">

</style>