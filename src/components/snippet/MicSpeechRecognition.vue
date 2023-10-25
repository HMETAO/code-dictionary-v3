<template>
</template>
<script lang="ts" setup>

import {ref, watch} from "vue";
import {errorMessage, successMessage} from "@/utils/baseMessage";
import {useStateStore} from "@/store";
import {storeToRefs} from "pinia";

const micStart = ref<boolean>(false)
const recognition = new webkitSpeechRecognition();
const props = defineProps<{ modelValue: boolean }>()

watch<boolean>(() => props.modelValue, () => {
  micStart.value = props.modelValue
  if (micStart.value) {
    successMessage("开启语音识别")
    // 开始语音识别
    recognition.start();
  } else {
    errorMessage("关闭语音识别")
    recognition.stop();
  }
})

// 设置一些语音识别的参数
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'zh-CN'

const {snippetForm} = storeToRefs(useStateStore())
// 当有语音输入时触发的事件处理函数
recognition.onresult = (event: SpeechRecognitionEvent) => {
  if (event.results[event.results.length - 1].isFinal) {
    const result = event.results[event.results.length - 1][0].transcript;
    snippetForm.value.snippet += result
  }
}

// 当发生错误时触发的事件处理函数
recognition.onerror = (event: SpeechRecognitionError) => {
  errorMessage(event.error)
}

// 当语音识别结束时触发的事件处理函数
recognition.onend = () => {
}
</script>

<style scoped lang="less">

</style>