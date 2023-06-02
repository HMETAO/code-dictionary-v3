<template>
  <div class="information-box h-full w-full">
    <div class="information-message">
      <div v-if="information.length == 0">
        <el-skeleton :rows="5"/>
      </div>
      <div v-else class="h-full">
        <InformationMessage/>
      </div>
    </div>
    <div class="information-editor">
      <InformationEditor/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref} from 'vue';
import {INFORMATION_GET_EVENT} from "../../constants/eventConstants";
import {getFriendInformation} from "../../api/friend";
import {FriendInformationType, FriendType} from "../../type/friendType";
import InformationEditor from "./InformationEditor.vue";
import InformationMessage from "./InformationMessage.vue";

const instance = getCurrentInstance()
const information = ref<Array<FriendInformationType>>([])
instance?.proxy?.$bus.on(INFORMATION_GET_EVENT, (friend) => {

  const item = friend as FriendType
  // 查询聊天记录
  getFriendInformation(item.id).then((res) => {
    information.value = res.data
  })
})
</script>
<style scoped lang="less">
.information-box {
  display: flex;
  flex-direction: column;

  .information-message {
    flex: 1;
  }

  .information-editor {
    height: 200px;
  }
}
</style>
