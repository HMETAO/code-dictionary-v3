<template>
  <div class="header w-full h-full">
    <el-menu class="w-full"
             mode="horizontal"
             menu-trigger="click"
             :ellipsis="false">
      <el-menu-item index="0" @click="">
        <div class="animate__animated animate__backInLeft web-site-title">
          Code Dictionary
        </div>
      </el-menu-item>
      <div class="flex-grow">
        <el-alert class="flex-grow-alert"
                  v-if="speechStart || ai"
                  :description="speechMessage"
                  type="success"
                  show-icon
                  :closable="false"
                  center/>
      </div>
      <el-sub-menu index="1" class="animate__animated animate__backInRight" v-if="token">
        <template #title>
          <div class="header-user-info">
            <el-avatar shape="square" :src='baseStore.user.avatar'/>
            <div class="user-info-text">{{ baseStore.user.username }}</div>
          </div>
        </template>
        <el-menu-item index="2-2" style="justify-content: center" @click="editDialogVisible = true">
          修改信息
        </el-menu-item>
        <el-menu-item index="2-1" style="justify-content: center" @click="logoutEventFunction">
          退出登录
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <EditDialog v-model="editDialogVisible"></EditDialog>
  </div>
</template>
<script setup lang="ts">
import {useBaseStore} from "@/store";
import {logout} from "@/api/user";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useGPTStore} from "@/store/GPT";
import {ref} from "vue";
import EditDialog from "@/components/layout/EditDialog.vue";

const router = useRouter()
const baseStore = useBaseStore()
const {speechMessage, ai, speechStart} = storeToRefs(useGPTStore())

const {token} = storeToRefs(baseStore)


const editDialogVisible = ref<boolean>(false)
// 退出登录事件回调
const logoutEventFunction = async () => {
  try {
    // 退出登录
    await logout()
  } finally {
    baseStore.$reset()
    await router.push({name: "login"})
  }
}
</script>
<style scoped lang="less">
@DefaultColor: #76bbd7;

.header {
  display: flex;
  align-items: center;

  .header-user-info {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-grow {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .web-site-title {
    font-weight: 700;
    cursor: default;
    color: @DefaultColor;
    font-style: italic;
    transition: 1s;
  }

  .web-site-title:hover {
    background-image: linear-gradient(#2de2ff, #8b67fb);
    -webkit-background-clip: text;
    color: transparent;
  }
}


</style>
