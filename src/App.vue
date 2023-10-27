<template>
  <div class="common-layout">
    <div class="header">
      <layout-header></layout-header>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
  <div class="home-ai">
    <GPT/>
  </div>
  <MicSpeechRecognition/>
</template>
<script setup lang="ts">

import LayoutHeader from "./components/layout/LayoutHeader.vue";
import {useStateStore} from "./store";
import MicSpeechRecognition from "@/components/snippet/MicSpeechRecognition.vue";
import GPT from "@/components/gpt/GPT.vue";
import {useGPTStore} from "@/store/GPT";

const stateStore = useStateStore()
const gptStore = useGPTStore()
// 将状态缓存全部清除
stateStore.$reset()
gptStore.$reset()

</script>
<style scoped lang="less">
@DefaultColor: #76bbd7;

.common-layout {
  display: flex;
  height: 100vh;
  flex: 1;
  flex-direction: column;

  .header {
    //border-bottom: 2px solid #2ecc71;
  }

  .main {
    flex: 1
  }
}

.home-ai {
  position: fixed;
  bottom: 50px;
  left: 30px;
}

</style>
