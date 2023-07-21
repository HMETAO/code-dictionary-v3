<template>
  <div class="ide-container h-full">
    <!--header-->
    <div class="ide-header">
      <IDEHeader v-model="snippet"/>
    </div>
    <!--editor-->
    <div class="ide">
      <prism-editor
          class='ide-editor '
          :style="{'background':ideBackGroundColor,'color':ideColor}"
          v-model="snippet"
          :highlight='highlighter'
          line-numbers></prism-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import prism from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";
import IDEHeader from "@/components/ide/IDEHeader.vue";
import {useIDEStore} from "@/store";
import {storeToRefs} from "pinia";

const {ideBackGroundColor, ideColor} = storeToRefs(useIDEStore())
const snippet = ref<string>("")
// 高亮代码
const highlighter = (code: string) => {
  return prism.highlight(code, prism.languages.js, "java");
}

</script>
<style scoped lang="less">
@bc: #dcdfe6;

.ide-container {
  display: flex;
  flex-direction: column;

  .ide-header {
    height: 35px;
  }

  .ide {
    display: flex;
    flex: auto;
    height: 0;
  }
}

.ide-editor {
  background: #3d3d3d;
  color: #ccc;
  width: 100%;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

:deep(.prism-editor__textarea) {
  outline: none;
}

</style>