<template>
  <div class="w-full h-full " @dragover.prevent="handleDragOver">
    <div v-show="isDragging" class="overlay"
         @dragleave.prevent="handleDragLeave"
         @drop.prevent="handleDrop">
      拖入Zip包到此处，导入项目
    </div>
    <MarkDown v-if="baseStore.isMarkDown"></MarkDown>
    <PrismEditor v-else></PrismEditor>
    <div class="snippet-menus">
      <el-button class="snippet-btn" type="primary" @click="isCategoryDrawer = true" size="large" circle>
        <el-icon>
          <Plus/>
        </el-icon>
      </el-button>
    </div>
    <!--snippet选择的drawer-->
    <CategoryDrawer v-model="isCategoryDrawer"></CategoryDrawer>
    <SnippetInsertDialog v-model="stateStore.snippetDialogVisible"/>
  </div>

</template>
<script setup lang="ts">
import {ref} from 'vue';
import MarkDown from "./MarkDown.vue";
import CategoryDrawer from "./CategoryDrawer.vue";
import PrismEditor from "./PrismEditor.vue";
import {useBaseStore, useStateStore} from "@/store";
import SnippetInsertDialog from "./SnippetInsertDialog.vue";
import {errorMessage, successMessage} from "@/utils/baseMessage";
import {uploadSnippet} from "@/api/snippet";

const baseStore = useBaseStore();
const stateStore = useStateStore();
// 分类抽屉
const isCategoryDrawer = ref<boolean>(false)

const isDragging = ref<boolean>(false)
const handleDragOver = (event: any) => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  event.preventDefault();
  // 获取拖拽的文件列表

  // 处理文件列表，可以在这里执行你的逻辑
  processFiles(event.dataTransfer?.files as FileList);
};

const processFiles = (files: FileList) => {
  const file = files[0];
  // 校验文件类型以及传入个数
  if (files.length > 1) {
    errorMessage("仅支持导入一个zip")
  } else if (file.type != "application/x-zip-compressed") {
    errorMessage("仅支持导入zip文件")
  } else {
    let formData = new FormData();
    formData.append("file", file);
    // 调用上传zip方法
    uploadSnippet(formData).then(() => {
      successMessage("导入成功")
    })
  }
};
</script>
<style scoped lang="less">
.snippet-menus {
  position: fixed;
  right: 30px;
  bottom: 50px;
}

.overlay {
  z-index: 999999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}


</style>
