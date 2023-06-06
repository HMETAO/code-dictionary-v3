<template>
  <div class="TK-box">
    <div class="home-TUIKit-main">
      <div :class="data.env?.isH5 ? 'conversation-h5' : 'conversation'"
           v-show="!data.env?.isH5 || data.currentModel === 'conversation'">
        <TUISearch class="search"/>
        <TUIConversation @current="handleCurrentConversation"/>
      </div>
      <div class="chat" v-show="!data.env?.isH5 || data.currentModel === 'message'">
        <TUIChat>
          <el-skeleton :rows="5"/>
        </TUIChat>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {onBeforeUnmount, reactive,} from 'vue';
import {TUIEnv} from '../../TUIKit/TUIPlugin';
import {handleErrorPrompts} from '../../TUIKit/TUIComponents/container/utils';
import TUIChat from "../../TUIKit/TUIComponents/container/TUIChat/index.vue";
import TUIConversation from "../../TUIKit/TUIComponents/container/TUIConversation/index.vue";
import TUISearch from "../../TUIKit/TUIComponents/container/TUISearch/index.vue";
import {loginIM, logoutIM} from "../../api/user";
import {useBaseStore} from "../../store";

const baseStore = useBaseStore();
const data = reactive({
  env: TUIEnv(),
  currentModel: 'conversation',
  showCall: false,
  showCallMini: false,
});
const TUIServer = (window as any)?.TUIKitTUICore?.TUIServer;
const handleCurrentConversation = (value: string) => {
  data.currentModel = value ? 'message' : 'conversation';
};
const init = async () => {
  // 登录腾讯IM系统
  await loginIM(baseStore.user.username)
}
init()

onBeforeUnmount(async () => {
  // 退出IM
  await logoutIM()
})
</script>


<style scoped lang="less">
.TK-box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .home-TUIKit-main {
    display: flex;
    overflow: hidden;
    flex-grow: 1;
    height: 0;
    width: 100%;
  }
}

:deep(.message-input-area) {
  overflow-y: auto;
}

:deep(.TUIChat-safe-tips) {
  display: none;
}


.search {
  padding: 12px;
}

.conversation {
  min-width: 285px;
  flex: 0 0 24%;
  border-right: 1px solid #f4f5f9;
}

.conversation-h5 {
  flex: 1;
  border-right: 1px solid #f4f5f9;
}

.chat {
  flex: 1;
  height: 100%;
  position: relative;
}

.callkit-drag-container {
  left: calc(50% - 25rem);
  top: calc(50% - 18rem);
  width: 50rem;
  height: 36rem;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;
}

.callkit-drag-container-mini {
  width: 168px;
  height: 56px;
  right: 10px;
  top: 70px;
}
</style>
