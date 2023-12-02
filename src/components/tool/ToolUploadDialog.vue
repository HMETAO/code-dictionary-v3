<template>
  <div>
    <el-dialog
        v-model="uploadDialogVisible"
        width="30%">
      <el-upload ref="uploadToolRef"
                 :auto-upload="false"
                 :on-success="successUploadEventFunction"
                 :action="TOOL_UPLOAD_ACTIVE"
                 :headers="header"
                 name="files"
                 drag
                 multiple>
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
      <template #footer>
        <el-button type="primary" @click="uploadClickEventFunction">Create</el-button>
        <el-button @click='closeDialogEventFunction()'>Cancel</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref, watch} from 'vue';
import type {UploadInstance} from "element-plus";
import {TOOL_UPLOAD_ACTIVE} from "@/api/tool";
import {successMessage} from "@/utils/baseMessage";
import {TOOL_UPLOAD_SUCCESS_EVENT} from "@/constants/eventConstants";

const header = ref<any>({
  "Code-Dictionary": ""
})

const instance = getCurrentInstance()
// 向上触发更新
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
// 父传子参数
const prop = defineProps<{
  // uploadDialogVisible
  modelValue: boolean
}>()

// 监听父类modelValue变化映射到uploadDialogVisible
const uploadDialogVisible = ref<boolean>(false)
watch<boolean>(() => prop.modelValue, () => {
  uploadDialogVisible.value = prop.modelValue
})

const uploadToolRef = ref<UploadInstance>()

// 上传文件事件回调
const uploadClickEventFunction = () => {
  header.value["Code-Dictionary"] = localStorage.getItem("token")
  // 手动触发上传
  uploadToolRef.value!.submit()
}

// 成功上传事件回调
const successUploadEventFunction = () => {
  successMessage("上传成功")
  // 触发ToolUploadSuccess回调
  instance?.proxy?.$bus?.emit(TOOL_UPLOAD_SUCCESS_EVENT)
  closeDialogEventFunction()
}

// 关闭dialog事件回调
const closeDialogEventFunction = () => {
  emit("update:modelValue", false)
}

</script>
<style scoped lang="less">

</style>
