<template>
  <div class="login-form-container">
    <el-card class="animate__animated animate__fadeIn login-form-card">
      <template #header>
        <div class="card-header text-center animate__animated animate__rubberBand animate__slow
         text-[#8b67fb]/75">
          <span>Code Dictionary</span>
        </div>
      </template>
      <!--登陆表单-->
      <el-form
          class="animate__animated animate__fadeInLeft"
          size="large"
          ref="ruleFormRef"
          :model="loginForm"
          status-icon>
        <el-form-item>
          <el-input placeholder="请输入用户名" v-model="loginForm.username">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" show-password v-model="loginForm.password">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <!--button区-->
      <div class="flex login-form-button-box animate__animated animate__fadeInUp">
        <el-button round plain @click="loginClickEventFunction">Login</el-button>
        <div class="m-4 text-gray-600/75 ">OR</div>
        <el-button round plain @click="registryDialogFormVisible = true">Registry</el-button>
      </div>
    </el-card>
  </div>
  <RegistryDialog v-model="registryDialogFormVisible"/>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import {LoginForm} from "@/form/user";
import {Lock, User} from '@element-plus/icons-vue'
import {useBaseStore, useStateStore} from "@/store";
import {login} from "@/api/user";
import {useRouter} from "vue-router";
import {Result} from "@/result";
import {UserInfo} from "@/type/userType";
import RegistryDialog from "@/components/login/RegistryDialog.vue";

const enter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    loginClickEventFunction()
    e.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('keydown', enter)
})

onUnmounted(() => {
  document.removeEventListener('keydown', enter)
})
// 登录表单
const loginForm = ref<LoginForm>({
  username: "",
  password: ""
})

const baseStore = useBaseStore()
const stateStore = useStateStore()
const router = useRouter()

const registryDialogFormVisible = ref<boolean>(false)
// 点击登录请求回调
const loginClickEventFunction = async () => {
  try {
    // 全局loading
    stateStore.loading = true
    // 请求登录接口
    const res: Result<UserInfo> = await login(loginForm.value)
    // 存储用户信息
    baseStore.user = res.data
    baseStore.token = res.data.token as string
    localStorage.setItem("token", baseStore.token)
    await router.push('/home')
  } finally {
    // 关闭loading
    stateStore.loading = false
  }
}

</script>
<style scoped lang="less">
.login-form-container {
  width: 400px;
  min-width: 320px;

  .login-form-card {
    border-radius: 30px;

    .card-header {
      font-weight: 700;
    }
  }

  .login-form-button-box {
    justify-content: space-between;
    align-items: center;
  }
}
</style>
