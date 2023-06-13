<template>
  <div class="w-full h-full">
    <el-button text class="quick-item" @click="sshClickEventFunction">
      <span class="iconfont  icon-SSHmiyue icon-font-size-m"></span>
      ssh 连接
    </el-button>
    <el-dialog v-model="dialogVisible" center title="SSH 配置" width='35%' class="ssh-dialog">
      <div>
        <el-form :model='sshForm' :rules="rules">
          <el-form-item label='host：' :label-width='formLabelWidth' prop="host">
            <el-input v-model='sshForm.host' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='username：' :label-width='formLabelWidth' prop="username">
            <el-input v-model='sshForm.username' autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item label='password：' :label-width='formLabelWidth' prop="password">
            <el-input v-model='sshForm.password' autocomplete='off' show-password></el-input>
          </el-form-item>
          <el-form-item label='port：' :label-width='formLabelWidth' prop="port">
            <el-input v-model='sshForm.port' autocomplete='off'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='dialogClickEventFunction'>确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {SSHForm} from "../../form/other";
import {FormRules} from "element-plus";
import {setSSH} from "../../api/other";
import {useRoute, useRouter} from "vue-router";

const formLabelWidth = 100
// dialog
const dialogVisible = ref<boolean>(false)

const sshForm = ref<SSHForm>({host: "", port: 22, username: 'root'})
// 点击开启ssh事件回调
const sshClickEventFunction = () => {
  dialogVisible.value = true;
}
// 表单规则
const rules = reactive<FormRules>({
  host: [
    {required: true, message: '请输入连接主机的host', trigger: 'blur'}
  ],
  username: [
    {required: true, message: '请输入连接登录主机用户', trigger: 'blur'}
  ],
  port: [
    {required: true, message: '请输入port', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ]
})
const router = useRouter()
// dialog确认按钮事件回调
const dialogClickEventFunction = () => {
  // 设置ssh
  setSSH(sshForm.value).then(() => {
    router.push({name: 'term'})
  })
}
</script>
<style scoped lang="less">
.quick-item {
  width: 100%;
  height: 100%;
}
</style>
