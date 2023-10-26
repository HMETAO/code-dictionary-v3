<template></template>
<script lang="ts" setup>

import {ref, watch} from "vue";
import {errorMessage, successMessage} from "@/utils/baseMessage";
import {useStateStore} from "@/store";
import {storeToRefs} from "pinia";

const micStart = ref<boolean>(false)
const {speechStart} = storeToRefs(useStateStore())
const recognition = new webkitSpeechRecognition();

const props = defineProps<{
  outputStream: string
}>()

watch<boolean>(() => speechStart.value, () => {
  micStart.value = speechStart.value
  if (micStart.value) {
    successMessage("开启语音识别")
    // 开始语音识别
    recognition.start();
  } else {
    errorMessage("关闭语音识别")
    recognition.stop();
  }
})

const emit = defineEmits<{
  (e: 'update:outputStream', outputStream: string): void
}>()

// 设置一些语音识别的参数
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'zh-CN'

const {snippetForm, speechMessage} = storeToRefs(useStateStore())
// 当有语音输入时触发的事件处理函数
recognition.onresult = (event: SpeechRecognitionEvent) => {
  speechMessage.value = event.results[event.results.length - 1][0].transcript
  if (event.results[event.results.length - 1].isFinal) {
    setTimeout(() => {
      speechMessage.value = ''
    }, 500)
    const result = event.results[event.results.length - 1][0].transcript
    emit('update:outputStream', props.outputStream + result)
  }
}

// 当发生错误时触发的事件处理函数
recognition.onerror = (event: SpeechRecognitionError) => {
  errorMessage(event.error)
  speechStart.value = false
}

// 当语音识别结束时触发的事件处理函数
recognition.onend = () => {
  speechMessage.value = ''
}
</script>

<style scoped lang="less">

</style>