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
        <el-button size="small" type="primary" style="margin-left: 10px" @click="dialog = true">发布</el-button>
      </div>
    </div>
    <div class="community-right">
      <div class="community-right-box">
        <GithubTrend/>
      </div>
    </div>
  </div>
  <SnippetSelectDialog v-model="dialog" @node-click="nodeClickEventFunction" @open="openEventFunction"/>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import CommunityItem from "@/components/community/CommunityItem.vue";
import {getCommunities, insertCommunity} from "@/api/community";
import {PageInfo} from "@/result";
import {CommunityType} from "@/type/communityType";
import {BaseQueryForm} from "@/form/base";
import SnippetSelectDialog from "@/components/snippet/SnippetSelectDialog.vue";
import SnippetTree from "@/components/snippet/SnippetTree.vue";
import {CategoryMenusType} from "@/type/categoryType";
import {infoMessageBox} from "@/utils/baseMessage";
import GithubTrend from "@/components/community/GitHubTrend.vue";

const queryForm = ref<BaseQueryForm>({pageSize: 5, pageNum: 1})
const community = ref<PageInfo<CommunityType>>({})
const dialog = ref<boolean>(false)

const openEventFunction = (snippetTreeRef: InstanceType<typeof SnippetTree>) => {
  snippetTreeRef.execute()
}

const nodeClickEventFunction = (data: CategoryMenusType) => {
  // 判断点击类型
  if (!data.snippet) {
    return
  }
  infoMessageBox("Send", `确认将 ${data.label} 进行发表 ？`)
      .then(async () => {
        await insertCommunity(parseInt(data.id?.replaceAll("sn-", "") as string));
        dialog.value = false;
        await queryPropChangeEventFunction()
      })
}
// 初始化方法
const init = async () => {
  await queryPropChangeEventFunction()
}

// 切换页面回调
const queryPropChangeEventFunction = async () => {
  const res = await getCommunities(queryForm.value)
  community.value = res.data
}
init()

</script>
<style scoped lang="less">
@bc: #dcdfe6;
.community-box {
  display: flex;
  width: 100%;
  height: 100%;

  .community-left {
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;

    .community-left-box {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: auto;

      .community-left-container {
        flex: auto;
        width: 100%;
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
    width: 50%;
    border-left: 1px solid @bc;

    .community-right-box {
      width: 100%;
      flex: 1;
      overflow: auto;
    }

  }

}

</style>
