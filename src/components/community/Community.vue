<template>
  <div class="community-box h-full w-full">
    <div class="community-left">

    </div>
    <div class="community-right ">
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import CommunityItem from "@/components/community/CommunityItem.vue";
import {getCommunities} from "@/api/community";
import {PageInfo, Result} from "@/result";
import {CommunityType} from "@/type/communityType";
import {BaseQueryForm} from "@/form/base";

const queryForm = ref<BaseQueryForm>({pageSize: 10, pageNum: 1})
const community = ref<PageInfo<CommunityType>>({})


// 初始化方法
const init = async () => {
  const res = await getCommunities()
  community.value = res.data
}
init()

</script>
<style scoped lang="less">
.community-box {
  display: flex;

  .community-left {
    display: flex;
    flex: auto;
  }

  .community-right {
    flex: 1;
    border-left: 1px solid #dcdfe6;
  }

}

</style>
