<template>
  <div class="markdown-box h-full">
    <MdEditor v-model="snippetForm.snippet"
              @onSave="saveMarkdownEventFunction"
              @onUploadImg="uploadImgEventFunction"
              :toolbars-exclude="['github']"
              :no-prettier="true"
              :showCodeRowNumber="true">
    </MdEditor>
  </div>
</template>
<script setup lang="ts">
import {getCurrentInstance, onBeforeUnmount} from 'vue';
import MdEditor from 'md-editor-v3';
import {SNIPPET_GET_EVENT} from "@/constants/eventConstants";
import {useStateStore} from "@/store";
import {storeToRefs} from "pinia";
import {SnippetType} from "@/type/snippetType";
import {updateSnippet, uploadImg} from "@/api/snippet";
import {successMessage} from "@/utils/baseMessage";

const stateStore = useStateStore()
const {snippetForm} = storeToRefs(stateStore)

//点击保存markdown按钮事件回调
const saveMarkdownEventFunction = () => {
  // 判断是更新还是新增
  if (snippetForm.value.id) {
    updateSnippet(snippetForm.value)
    successMessage("更新成功")
  } else {
    stateStore.snippetDialogVisible = true
  }
}
// markdown 上传图片
const uploadImgEventFunction = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
  const form = new FormData();
  // 组合表单对象批量上传
  for (const file of files) {
    form.append('files', file);
  }
  // 上传图片
  const res = await uploadImg(form)
  // 响应md
  callback(res.data.urls)
}
const instance = getCurrentInstance()
// 注册监听切换面板事件
instance?.proxy?.$bus.on(SNIPPET_GET_EVENT, (snippet) => {
  snippetForm.value = snippet as SnippetType
})

onBeforeUnmount(() => {
  // 卸载事件函数
  instance?.proxy?.$bus.off(SNIPPET_GET_EVENT)
})
</script>
<style scoped lang="less">
.markdown-box {
  display: flex;
  flex-direction: column;

}

:deep(.md-editor) {
  flex: auto;
  height: 0;
  h1 { font-size: 2em; margin: .67em 0 }
  h2 { font-size: 1.5em; margin: .75em 0 }
  h3 { font-size: 1.17em; margin: .83em 0 }
  h4, p, blockquote, ul, fieldset, form, ol, dl, dir, menu { margin: 1.12em 0 }
  h5 { font-size: .83em; margin: 1.5em 0 }
  h6 { font-size: .75em; margin: 1.67em 0 }
  h1, h2, h3, h4, h5, h6, b,strong { font-weight: bolder }
}


</style>
