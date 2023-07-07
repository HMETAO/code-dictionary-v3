<template>
  <div class="community-box  w-full">
    <div class="community-left">
      <div class="community-left-box">
        <div class="community-left-container">
          <CommunityItem v-for="item in community.list" :key="item.id" :community="item"/>
        </div>
      </div>
      <div class="community-left-page">
        <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="community.total"
            v-model:current-page="queryForm.pageNum"
            @update:current-page="queryPropChangeEventFunction"
        />
      </div>
    </div>
    <div class="community-right">

    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import CommunityItem from "@/components/community/CommunityItem.vue";
import {getCommunities} from "@/api/community";
import {PageInfo} from "@/result";
import {CommunityType} from "@/type/communityType";
import {BaseQueryForm} from "@/form/base";

const queryForm = ref<BaseQueryForm>({pageSize: 5, pageNum: 1})
const community = ref<PageInfo<CommunityType>>({})

// 初始化方法
const init = async () => {
  const res = await getCommunities(queryForm.value)
  community.value = res.data
}

// 切换页面回调
const queryPropChangeEventFunction = async () => {
  const res = await getCommunities(queryForm.value)
  community.value = res.data
}
init()

</script>
<style scoped lang="less">
.community-box {
  display: flex;
  width: 100%;
  height: 100%;

  .community-left {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;

    .community-left-box {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

      .community-left-container {
        flex: auto;
        height: 0;
      }

    }

    .community-left-page {
      display: flex;
      justify-content: center;
      padding: 10px 0 0;
    }


  }

  .community-right {
    display: flex;
    flex: 1;
    border-left: 1px solid #dcdfe6;
  }

}

</style>
