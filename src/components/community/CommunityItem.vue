<template>
  <div class="community-item-box">
    <div class="community-box-container">
      <div class="community-user-header">
        <div class="community-user-info">
          <div class="community-user-info-left">
            <el-avatar :size="25" :src="community.userInfo?.avatar"/>
            <div class="user-info-text">
              {{ community.userInfo.username }}
            </div>
          </div>
          <div>
            {{ community.snippetInfo.type == TypeEnum.code ? "Code" : "MarkDown" }}
          </div>
          <div class="community-user-info-right">
            {{ community.createTime }}
          </div>
        </div>
      </div>
      <div class="community-item-preview">
        <MdPreview :modelValue="mdStr"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {CommunityType} from "@/type/communityType";
import {MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import {TypeEnum} from "@/enums/typeEnum";

// 父组件传的数据
const props = defineProps<{
  community: CommunityType
}>()
const mdStr = ref<string>(props.community.snippetInfo?.snippet as string)
const init = () => {
  if (props.community.snippetInfo?.type == TypeEnum.code) {
    mdStr.value = "```java\r\n " + mdStr.value + "\r\n ```"
  }
}
init()
</script>
<style scoped lang="less">
@bc: #dcdfe6;
.community-item-box {
  width: 100%;
  max-height: 400px;
  margin-bottom: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: 1px solid @bc;

  .community-box-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    max-height: 400px;

    .community-item-preview {
      max-height: 370px;
      overflow-y: auto;
    }

    .community-user-header {
      display: flex;
      height: 30px;

      .community-user-info {
        width: 100%;
        display: flex;
        border-bottom: 1px solid @bc;
        justify-content: space-between;

        .community-user-info-left {
          display: flex;
          justify-items: center;
          align-items: center;
        }

        .community-user-info-right {
          margin-right: 25px;
        }
      }
    }


  }

}
</style>
