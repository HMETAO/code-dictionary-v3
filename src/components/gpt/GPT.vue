<template>
  <el-button class="snippet-btn" type="primary" size="large" plain @click="()=>{
      ai = !ai
      outputStream = message
    }">
    H-GPT
  </el-button>
</template>
<script lang="ts" setup>
import {getCurrentInstance, onMounted, onUnmounted, ref, watch} from "vue";
import {useGPTStore} from "@/store/GPT";
import {storeToRefs} from "pinia";
import {useBaseStore} from "@/store";
import {SPARK_DESK} from "@/api/gpt";
import {AI_MODEL_CLOSE_EVENT, AI_MODEL_OPEN_EVENT} from "@/constants/eventConstants";
import {ElNotification} from "element-plus";

const {ai, outputStream} = storeToRefs(useGPTStore())
// 监听事件数组
const events: string[] = [AI_MODEL_OPEN_EVENT, AI_MODEL_CLOSE_EVENT]
const instance = getCurrentInstance()
type GptType = {
  responseMessage: string
}
// ws连接对象
const baseStore = useBaseStore();
const socketURI = {
  type: SPARK_DESK + "?token=" + baseStore.token
}
let socket: WebSocket;

// 监听
const message = ref<GptType>({responseMessage: ''})
watch<string>(() => message.value.responseMessage, () => {
  if (socket.OPEN == socket.readyState) {
    socket.send(message.value.responseMessage)
  } else {
    if (ai.value) {
      initSocket()
      socket.onopen = () => {
        // 链接成功后
        socket.send(message.value.responseMessage)
      }
    }
  }
})
const initSocket = () => {
  socket = new WebSocket(socketURI.type)
  socket.onopen = () => {
    console.log("小H连接成功")
  }
  socket.onmessage = (res: MessageEvent) => {
    ElNotification({
      title: '小H说',
      message: res.data,
    })
  }
  socket.onclose = () => {
    console.log("小H关闭")
  }
}

onMounted(() => {
  // 监听ai开启事件
  instance?.proxy?.$bus.on(AI_MODEL_OPEN_EVENT, () => {
    initSocket()
  })
  // 监听ai关闭事件
  instance?.proxy?.$bus.on(AI_MODEL_CLOSE_EVENT, () => {
    socket.close()
  })
})

onUnmounted(() => {
  // 取消事件
  events.forEach(e => {
    instance?.proxy?.$bus.off(e)
  })
})
</script>
<style scoped lang="less">

</style>