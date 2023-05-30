<template>
  <div class="communicate-box h-full w-full">
    <el-row :gutter="10" class="w-fill h-full">
      <el-col :sm="6" :md="10" :lg="5">
        <Friend/>
      </el-col>
      <el-col :sm="18" :md="14" :lg="19">
        <FriendInformation/>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import Friend from "./FriendMenu.vue";
import FriendInformation from "./FriendInformation.vue";

</script>
<style scoped lang="less">
.communicate-box {

}

</style>
