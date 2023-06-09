<template>
  <div class="snippet">
    <el-icon title="发送Snippet" @click="dialogVisible = true">
      <Coordinate/>
    </el-icon>
    <main class="snippet-main">

    </main>
    <el-dialog
        v-model="dialogVisible"
        title="选择发送的Snippet"
        @open="dialogOpenEventFunction"
        width="40%">
      <div class="dialog-box">
        <div class="dialog-container">
          <SnippetTree ref="snippetTreeRef" @node-click="nodeClickEventFunction"></SnippetTree>
        </div>
      </div>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              Confirm
            </el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {Coordinate} from "@element-plus/icons-vue";
import SnippetTree from "@/components/snippet/SnippetTree.vue";
import {CategoryMenusType} from "@/type/categoryType";
import {infoMessageBox} from "@/utils/baseMessage";

const dialogVisible = ref<boolean>(false)
const props = defineProps<{
  isH5: boolean
  isMute: boolean
  conversation: any
  parentID: any
}>()
const snippetTreeRef = ref<InstanceType<typeof SnippetTree>>()
// 点击打开SnippetSend Dialog 事件回调
const dialogOpenEventFunction = () => {
  snippetTreeRef.value.execute()
}
// SnippetTree 节点被点击事件回调
const nodeClickEventFunction = (data: CategoryMenusType) => {
  // 判断点击类型
  if (!data.snippet) {
    return
  }

}
</script>
<style scoped lang="less">
.snippet {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.dialog-box {
  height: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  .dialog-container {
    height: 0;
    flex: auto;
  }

}
</style>
