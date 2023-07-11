<template>
    <div class="editor-container h-full">
        <!--header-->
        <div class="editor-header">
            <EditorHeader/>
        </div>
        <!--editor-->
        <div class="editor">
            <prism-editor :tabSize='6'
                          class='my-editor '
                          v-model="snippetForm.snippet"
                          :highlight='highlighter'
                          line-numbers></prism-editor>
        </div>
    </div>
</template>
<script setup lang="ts">
import {getCurrentInstance,onBeforeUnmount} from 'vue';
import {PrismEditor} from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
import prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import EditorHeader from "./EditorHeader.vue";
import {SNIPPET_GET_EVENT} from "@/constants/eventConstants";
import {SnippetType} from "@/type/snippetType";
import {useStateStore} from "@/store";
import {storeToRefs} from "pinia";

// this
const instance = getCurrentInstance()
const store = useStateStore()
const {snippetForm} = storeToRefs(store)
// 高亮代码
const highlighter = (code: string) => {
    return prism.highlight(code, prism.languages.js, "java");
}

// 注册监听获取snippet事件
instance?.proxy?.$bus.on(SNIPPET_GET_EVENT, (snippet) => {
    // 获取snippet
    store.snippetForm = snippet as SnippetType
})

// 组件销毁
onBeforeUnmount(() => {
    // 卸载事件函数
    instance?.proxy?.$bus.off(SNIPPET_GET_EVENT)
})
</script>
<style scoped lang="less">
.editor-container {
  display: flex;
  flex-direction: column;

  .editor-header {
    height: 35px;
  }

  .editor {
    display: flex;
    flex: auto;
    height: 0;
  }
}

.my-editor {
  background: #3d3d3d;
  color: #ccc;
  width: 100%;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>
