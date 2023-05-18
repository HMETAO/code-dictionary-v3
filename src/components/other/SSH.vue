<template>
    <div class="w-full h-full">
        <el-button text class="quick-item" @click="sshClickEventFunction">
            <svg class="icon icon-font-size-m" aria-hidden="true">
                <use xlink:href="#icon-SSHmiyue"></use>
            </svg>
            ssh 连接
        </el-button>
        <el-dialog v-model="dialogVisible" center title="SSH 配置" width='35%' class="ssh-dialog">
            <div>
                <el-form :model='sshForm'>
                    <el-form-item label='host：' :label-width='formLabelWidth'>
                        <el-input v-model='sshForm.host' autocomplete='off'></el-input>
                    </el-form-item>
                    <el-form-item label='username：' :label-width='formLabelWidth'>
                        <el-input v-model='sshForm.username' autocomplete='off'></el-input>
                    </el-form-item>
                    <el-form-item label='password：' :label-width='formLabelWidth'>
                        <el-input v-model='sshForm.password' autocomplete='off' show-password></el-input>
                    </el-form-item>
                    <el-form-item label='port：' :label-width='formLabelWidth'>
                        <el-input v-model='sshForm.port' autocomplete='off'></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <el-button @click='dialogVisible = false'>取 消</el-button>
                <el-button type='primary' @click='sshClickEventFunction'>确 定</el-button>
            </template>
        </el-dialog>

    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {SSHForm} from "../../form/other";

const formLabelWidth = 100
// dialog
const dialogVisible = ref<boolean>(false)

const sshForm = ref<SSHForm>({port: 22, username: 'root'})
// 点击开启ssh事件回调
const sshClickEventFunction = () => {
    dialogVisible.value = true;
}
</script>
<style scoped lang="less">
.quick-item {
  width: 100%;
  height: 100%;


}
</style>
