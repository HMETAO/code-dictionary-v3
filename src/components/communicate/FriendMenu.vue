<template>
  <div class="friend-box h-full">
    <el-menu class="h-full w-full" v-loading="!isFinished">
      <el-menu-item v-for="friend  in data as Array<FriendType>" @click="itemClickEventFunction(friend)"
                    :index="friend.id + ''">
        <div class="item-info">
          <el-avatar shape="square" :src="friend.avatar"/>
          <div class="user-info-text">{{ friend.friendName }}</div>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {getCurrentInstance, ref} from 'vue';
import {getFriends} from "../../api/friend";
import {FriendType} from "../../type/friendType";
import {MenuItemRegistered} from "element-plus/es/components/menu";
import {INFORMATION_GET_EVENT} from "../../constants/eventConstants";

const {data, isFinished} = getFriends()

const instance = getCurrentInstance()

// 选择用户点击事件回调
const itemClickEventFunction = (item: FriendType) => {
  instance?.proxy?.$bus.emit(INFORMATION_GET_EVENT, item)
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
