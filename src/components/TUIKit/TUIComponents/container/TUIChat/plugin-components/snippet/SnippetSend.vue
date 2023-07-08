<template>
  <div class="snippet">
    <el-icon title="发送Snippet" @click="dialogVisible = true">
      <Coordinate/>
    </el-icon>
    <main class="snippet-main"></main>
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
import TUIChat from "@/components/TUIKit/TUIComponents/container/TUIChat/index.vue";
import constant from "@/components/TUIKit/TUIComponents/container/constant";
import {useBaseStore} from "@/store";

const baseStore = useBaseStore()
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
  infoMessageBox("Send", `确认将 ${data.label} 发送给 ${props.conversation.toAccount} ？`)
      .then(() => {
        const custom = {
          data: {
            // 自定义消息类型的标识字段
            businessID: constant.typeSnippet,
            id: data.id,
            // 发送的snippet label
            label: data.label,
            isDisable: false,
            uid: baseStore.user.id,
            type: data.type
          },
        };
        TUIChat.TUIServer.sendCustomMessage(custom)
        dialogVisible.value = false
      })
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
