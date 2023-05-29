<template>
  <div class="friend-box h-full">
    <el-menu class="h-full w-full" v-loading="!isFinished">
      <el-menu-item v-for="friend  in data as Array<FriendType>" @click="itemClickEventFunction">
        <div class="item-info">
          <el-avatar shape="square" :src="friend.avatar"/>
          <div class="user-info-text">{{ friend.friendName }}</div>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {getFriends} from "../../api/friend";
import {FriendType} from "../../type/friendType";

const {data, isFinished} = getFriends()

// 选择用户点击事件回调
const itemClickEventFunction = (ar) => {
  console.log(ar)
}

</script>
<style scoped lang="less">
.friend-box {

  .item-info {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    border-bottom: 1px solid rgba(131, 149, 167, 0.3);

  }
}

.el-menu-item {
}
</style>
