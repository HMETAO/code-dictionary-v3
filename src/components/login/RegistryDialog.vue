<template>
  <div>
    <!--注册表单-->
    <el-dialog title='注册' v-model='dialogVisible' @close='registryDialogCloseEventFunction'>
      <el-form
          label-width='0px'
          :model='registryForm'
          ref='registryFormRef'
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
          <el-button type='primary' @click='registryClickEventFunction()'>注册</el-button>
          <el-button type='info' @click='resetCloseEventFunction()'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {RegistryForm} from "@/form/user";
import {FormInstance, UploadUserFile} from "element-plus";
import {registry} from "@/api/user";
import {successMessage} from "@/utils/baseMessage";

const fileList = ref<UploadUserFile[]>([])
const registryFormRef = ref<FormInstance>()

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

const registryDialogCloseEventFunction = () => {
  emit("update:modelValue", false)
  resetCloseEventFunction()
}

// 点击注册事件回调函数
const registryClickEventFunction = async () => {
  // 构建formData对象
  const formData = new FormData()
  formData.append('username', registryForm.username as string)
  formData.append('password', registryForm.password as string)
  formData.append('email', registryForm.email as string)
  formData.append('mobile', registryForm.mobile as string)
  if (fileList.value.length != 0)
    formData.append('file', fileList.value[0] as any)
  await registry(formData)
  successMessage("注册成功")
  registryDialogCloseEventFunction()
}

const resetCloseEventFunction = () => {
  registryFormRef.value?.resetFields()
  fileList.value = []
}
</script>
<style scoped lang="less">

</style>