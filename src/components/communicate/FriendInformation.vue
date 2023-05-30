<template>
  <div class="information-box h-full w-full">
    <div>

    </div>
    <div>

    </div>
  </div>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref} from 'vue';
import {INFORMATION_GET_EVENT} from "../../constants/eventConstants";
import {getFriendInformation} from "../../api/friend";
import {FriendInformationType, FriendType} from "../../type/friendType";
import {Result} from "../../result";

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
}
</style>
