<template>
    <div class="editor-container h-full">
        <!--header-->
        <div class="editor-header">
            <EditorHeader></EditorHeader>
        </div>
        <!--editor-->
        <div class="editor">
            <prism-editor :tabSize='6'
                          class='my-editor '
                          v-model="snippet"
                          :highlight='highlighter'
                          line-numbers></prism-editor>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed, getCurrentInstance, onUnmounted} from 'vue';
import {PrismEditor} from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import EditorHeader from "./EditorHeader.vue";
import {SNIPPET_CHANGE_EVENT} from "../../constants/EventConstants";
import {SnippetType} from "../../type/snippetType"; // import syntax highlighting styles

const snippet = ref()
// 高亮代码
const highlighter = (code: string) => {
    return prism.highlight(code, prism.languages.js, "java");
}

const instance = getCurrentInstance()
// 注册监听切换面板事件
instance?.proxy?.$bus.on(SNIPPET_CHANGE_EVENT, (snippet) => {

})

// 组件销毁
onUnmounted(() => {
    // 卸载事件函数
    instance?.proxy?.$bus.off(SNIPPET_CHANGE_EVENT)
})
</script>
<style scoped lang="less">
.editor-container {
  display: flex;
  flex-direction: column;

  .editor-header {
    height: 10px;
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
