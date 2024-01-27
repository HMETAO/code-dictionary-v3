<template>
  <div>
    <!--修改表单-->
    <el-dialog title='修改信息' v-model='dialogVisible' @open="openEditEventFunction"
               @close='editDialogCloseEventFunction'>
      <el-form
          label-width='0px'
          :model='editForm'
          :rules="rules"
          ref='ruleFormRef'>
        <!-- 用户名 -->
        <el-form-item prop='username'>
          <el-input
              placeholder='请输入用户名'
              v-model='editForm.username'>
            <template #prefix>
              <el-icon>
                <UserFilled/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop='password'>
          <el-input placeholder='请输入密码' show-password v-model='editForm.password'
                    autocomplete='off'>
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop='checkPassword'>
          <el-input placeholder='确认密码' show-password v-model='editForm.checkPassword'
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
          <el-input placeholder='手机号' v-model='editForm.mobile'>
            <template #prefix>
              <el-icon>
                <Iphone/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!--邮箱-->
        <el-form-item prop='email'>
          <el-input placeholder='邮箱' v-model='editForm.email'>
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
          <el-button type='primary' @click='editClickEventFunction'>修 改</el-button>
          <el-button type='info' @click='resetCloseEventFunction'>重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">

import {getCurrentInstance, reactive, ref, watch} from "vue";
import {RegistryForm} from "@/form/user";
import {FormInstance, FormRules, UploadUserFile} from "element-plus";
import {getUser, updateUser} from "@/api/user";
import {infoMessage, successMessage} from "@/utils/baseMessage";
import {useBaseStore} from "@/store";
import {paramsToFormData} from "@/utils/data";
import {useRouter} from "vue-router";

const instance = getCurrentInstance();
const fileList = ref<UploadUserFile[]>([])
const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const baseStore = useBaseStore();

// 自定义规则

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value == '' || !value) {
    callback()
  } else if (value !== editForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
// 表单rules
const rules = reactive<FormRules>({
  username: [
    {message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '长度至少为8，至少含有一个字母和一个数字',
      trigger: 'blur'
    }
  ],
  checkPassword: [
    {validator: validatePass2, trigger: 'blur'}
  ],
  mobile: [
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ],
  email: [
    {
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

// 监听dialog启停
const dialogVisible = ref<boolean>(false)
watch(() => props.modelValue, () => {
  dialogVisible.value = props.modelValue
})

watch<boolean>(() => dialogVisible.value, () => {
  emit("update:modelValue", dialogVisible.value)
})

const editForm = reactive<RegistryForm>({})

// 开启修改dialog事件回调
const openEditEventFunction = async () => {
  const res = await getUser(baseStore.user.id as string)
  editForm.username = res.data.username
  editForm.email = res.data.email
  editForm.mobile = res.data.mobile
}

// 关闭修改dialog事件回调
const editDialogCloseEventFunction = () => {
  dialogVisible.value = false
  resetCloseEventFunction()
}

// 点击修改事件回调函数
const editClickEventFunction = async () => {
  ruleFormRef.value?.validate(async (isValid) => {
    if (isValid) {
      // // 构建formData对象
      const formData = paramsToFormData(editForm)
      formData.append("id", baseStore.user.id as string)
      if (fileList.value.length != 0)
        formData.append('file', fileList.value[0].raw as File)
      updateUser(formData).then(async () => {
        editDialogCloseEventFunction()
        successMessage("修改成功")
        baseStore.$reset()
        await router.push({name: "login"})
      })
    } else {
      infoMessage("请按要求填写表单")
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