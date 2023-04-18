<template>
    <div class="editor-container">
        <div class="editor-header">
            <EditorHeader></EditorHeader>
        </div>
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
import {ref, reactive, toRef, computed} from 'vue';
import {PrismEditor} from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import EditorHeader from "./EditorHeader.vue"; // import syntax highlighting styles

const snippet = ref()
// 高亮代码
const highlighter = (code: string) => {
    return prism.highlight(code, prism.languages.js, "java");
}
</script>
<style scoped lang="less">
.editor-container {
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;

  .editor-header {
    height: 30px;
  }

  .editor {
    display: flex;
    overflow: auto;
    flex: 1;
    flex-shrink: 0;
  }
}

.my-editor {
  flex-shrink: 0;
  overflow: auto;

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
