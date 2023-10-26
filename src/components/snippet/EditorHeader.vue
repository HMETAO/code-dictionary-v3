<template>
  <div class="editor-header-box w-full h-full">
    <div>
      <el-tooltip
          effect="dark"
          content="初始化Snippet面板"
          placement="top">
        <el-button @click="initSnippetClickEventFunction" type="warning" circle size="default">
          <el-icon>
            <EditPen/>
          </el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip
          effect="dark"
          content="保存"
          placement="top">
        <el-button type="success" circle size="default" @click="saveSnippetClickEventFunction">
          <el-icon>
            <Check/>
          </el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip
          effect="dark"
          content="运行代码"
          placement="top">
        <el-button type="primary" circle size="default" @click="runCodeDrawer = !runCodeDrawer">
          <el-icon>
            <Cpu/>
          </el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip
          effect="dark"
          content="语音识别"
          placement="top">
        <el-button type="primary" style="color: #FFFFFF" circle size="default"
                   :color="speechStart ? '#e74c3c':'#27ae60'"
                   @click="speechStart =!speechStart">
          <el-icon>
            <Mic/>
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <RunCodeDrawer v-model="runCodeDrawer" v-model:snippet="store.snippetForm.snippet"/>
    <MicSpeechRecognition v-model:outputStream="store.snippetForm.snippet as string"/>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import {successMessage, warningMessageBox} from "@/utils/baseMessage";
import {updateSnippet} from "@/api/snippet";
import {useStateStore} from "@/store";
import {BASE_SNIPPET} from "@/constants/baseConstants";
import MicSpeechRecognition from "@/components/snippet/MicSpeechRecognition.vue";
import {storeToRefs} from "pinia";

const store = useStateStore()
const runCodeDrawer = ref<boolean>(false)
const {speechStart} = storeToRefs(store)
// ctrl+s键盘按下处理回调
const saveContent = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    saveSnippetClickEventFunction()
    e.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('keydown', saveContent)
})

onUnmounted(() => {
  document.removeEventListener('keydown', saveContent)
})


// 点击初始化Snippet面板事件回调
const initSnippetClickEventFunction = async () => {
  await warningMessageBox("初始化面板", "是否确定初始化Snippet面板？")
  store.snippetForm = JSON.parse(BASE_SNIPPET)
}

// 点击保存按钮事件回调
const saveSnippetClickEventFunction = () => {
  // 更新操作
  if (store.snippetForm.id) {
    updateSnippet(store.snippetForm);
    successMessage("更新成功")
  } else {
    store.snippetDialogVisible = true;
  }
}

</script>
<style scoped lang="less">
.editor-header-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background-color: #4d4d4d;
}
</style>
