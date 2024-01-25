<template></template>
<script lang="ts" setup>
import {getCurrentInstance, watch} from "vue";
import {errorMessage, successMessage, warningMessage} from "@/utils/baseMessage";
import {useStateStore} from "@/store";
import {storeToRefs} from "pinia";
import {useGPTStore} from "@/store/GPT";
import {AI_MODEL_CLOSE_EVENT, AI_MODEL_OPEN_EVENT} from "@/constants/eventConstants";

const recognition = new webkitSpeechRecognition();
const {snippetForm} = storeToRefs(useStateStore())
const {speechMessage, ai, speechStart, outputStream} = storeToRefs(useGPTStore())
const instance = getCurrentInstance()
const recognitionStart = () => {
  // 请求麦克风权限
  navigator.mediaDevices.getUserMedia({audio: true})
      .then(function () {
        recognition.start()
      })
      .catch(function (error) {
        warningMessage("请授权麦克风否则无法开启语音识别")
      });
}
watch<boolean>(() => speechStart.value, () => {
  // 单纯语音识别
  if (speechStart.value) {
    // 开始语音识别
    if (speechStart.value && !ai.value) {
      recognitionStart()
    }
    ai.value = false
    successMessage("开启语音识别")
  } else {
    if (!speechStart.value && !ai.value) recognition.stop()
    errorMessage("关闭语音识别")

  }
})

watch<boolean>(() => ai.value, () => {
  // 单纯语音识别
  if (ai.value) {
    // 开始语音识别
    if (!speechStart.value && ai.value) {
      recognitionStart()
      instance?.proxy?.$bus.emit(AI_MODEL_OPEN_EVENT)
    }
    speechStart.value = false
    successMessage("小H启动！！！")
  } else {
    if (!speechStart.value && !ai.value) recognition.stop()
    errorMessage("关闭小H -.-")
    instance?.proxy?.$bus.emit(AI_MODEL_CLOSE_EVENT)
  }
})

// 设置一些语音识别的参数
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'zh-CN'

// 当有语音输入时触发的事件处理函数
recognition.onresult = (event: SpeechRecognitionEvent) => {
  // 语音识别中，将内容放入中途框
  speechMessage.value = event.results[event.results.length - 1][0].transcript

  // 判断是否识别完成
  if (event.results[event.results.length - 1].isFinal) {

    // 如果语音识别结束等待500ms清空中途信息框
    setTimeout(() => {
      speechMessage.value = ''
    }, 500)

    const result = event.results[event.results.length - 1][0].transcript
    // 判断写入到哪个stream
    if (speechStart.value) outputStream.value.snippet += result
    else outputStream.value.responseMessage = result
  }
}

// 当发生错误时触发的事件处理函数
recognition.onerror = (event: SpeechRecognitionError) => {
  errorMessage(event.error)
  speechStart.value = false
  ai.value = false
}

// 当语音识别结束时触发的事件处理函数
recognition.onend = () => {
  speechMessage.value = ''
}
</script>

<style scoped lang="less">

</style>