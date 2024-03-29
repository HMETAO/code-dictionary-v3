<template>
  <div class="custom">
    <template v-if="isCustom === constant.typeService">
      <div>
        <h1>
          <label>{{ extension.title }}</label>
          <a v-if="extension.hyperlinks_text" :href="extension.hyperlinks_text.value" target="view_window">{{
              extension.hyperlinks_text.key
            }}</a>
        </h1>
        <ul v-if="extension.item && extension.item.length > 0">
          <li v-for="(item, index) in extension.item" :key="index">
            <a v-if="isUrl(item.value)" :href="item.value" target="view_window">{{ item.key }}</a>
            <p v-else>{{ item.key }}</p>
          </li>
        </ul>
        <article>{{ extension.description }}</article>
      </div>
    </template>
    <template v-else-if="isCustom.businessID === constant.typeEvaluate">
      <div class="evaluate">
        <h1>{{ $t('message.custom.对本次服务评价') }}</h1>
        <ul>
          <li class="evaluate-list-item" v-for="(item, index) in ~~isCustom.score" :key="index">
            <i class="icon icon-star-light"></i>
          </li>
        </ul>
        <article>{{ isCustom.comment }}</article>
      </div>
    </template>
    <template v-else-if="isCustom.businessID === constant.typeOrder">
      <div class="order" @click="openLink(isCustom.link)">
        <img :src="isCustom.imageUrl" alt=""/>
        <main>
          <h1>{{ isCustom.title }}</h1>
          <p>{{ isCustom.description }}</p>
          <span>{{ isCustom.price }}</span>
        </main>
      </div>
    </template>
    <template v-else-if="isCustom.businessID === constant.typeTextLink">
      <div class="textLink">
        <p>{{ isCustom.text }}</p>
        <a :href="isCustom.link" target="view_window">{{ $t('message.custom.查看详情>>') }}</a>
      </div>
    </template>
    <template v-else-if="isCustom.businessID === constant.TYPE_CALL_MESSAGE">
      <div class="call" @click="handleCallAgain" :class="`call-${data?.message?.conversationType}`">
        <i class="icon" :class="handleCallMessageIcon()"></i>
        <span>{{ data.custom }}</span>
      </div>
    </template>
    <template v-else-if="isCustom.businessID === constant.typeSnippet">
      <div>
        <div>
          [ 分享 Snippet ]： {{ isCustom.label }}
        </div>
        <div class="w-full" style="display: flex; justify-content: end;margin-top: 3px" v-show="isCustom.uid != uid">
          <el-button size="small" type="primary" :disabled="isCustom.isDisable"
                     @click.once="sendSnippetEventFunction(true)">
            接收
          </el-button>
          <el-button size="small" type="info" :disabled="isCustom.isDisable"
                     @click.once="sendSnippetEventFunction(false)">拒绝
          </el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <span v-html="data.custom"></span>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent, watchEffect, reactive, toRefs} from 'vue';
import {isUrl, JSONToObject} from '../utils/utils';
import constant from '../../constant';
import TUIAegis from '../../../../utils/TUIAegis';
import {useStore} from 'vuex';
import TUIChat from "@/components/TUIKit/TUIComponents/container/TUIChat/index.vue";
import {receiveSnippet} from "@/api/snippet";
import {useBaseStore} from "@/store";
import {successMessage} from "@/utils/baseMessage";

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: any, ctx: any) {
    const baseStore = useBaseStore()
    const VuexStore = ((window as any)?.TUIKitTUICore?.isOfficial && useStore && useStore()) || {};
    // 发送Snippet事件回调
    const sendSnippetEventFunction = async (flag: boolean) => {
      // 确认后修改消息内容
      data.isCustom.isDisable = true
      data.data.message.payload.data = JSON.stringify(data.isCustom)
      TUIChat.TUIServer.modifyMessage(data.data.message)
      if (flag) {
        // 接收snippet
        await receiveSnippet({
          snippetId: parseInt(data.isCustom.id.replaceAll("sn-", "")),
          uid: data.isCustom.uid,
          type: data.isCustom.type
        })
        successMessage("接收成功")
      }
    }
    const data = reactive({
      uid: baseStore.user.id,
      data: {} as any,
      extension: {},
      isCustom: '' as any,
      constant: constant,
    });
    watchEffect(() => {
      data.data = props.data;
      const {
        message: {payload},
      } = props.data;
      data.isCustom = payload.data || ' ';
      data.isCustom = JSONToObject(payload.data);
      if (payload.data === constant.typeService) {
        data.extension = JSONToObject(payload.extension);
      }
    });
    const openLink = (url: any) => {
      window.open(url);
    };
    const handleCallMessageIcon = () => {
      const callType = JSON.parse(JSON.parse(data?.data?.message?.payload?.data)?.data)?.call_type;
      let className = '';
      switch (callType) {
        case 1:
          className = 'icon-call-voice';
          break;
        case 2:
          className = 'icon-call-video';
          break;
        default:
          break;
      }
      return className;
    };

    const handleCallAgain = async () => {
      const callType = JSON.parse(JSON.parse(props?.data?.message?.payload?.data)?.data)?.call_type;
      TUIAegis.getInstance().reportEvent({
        name: 'callOptions',
        ext1: 'clickCall',
      });
      switch (data?.data?.message?.conversationType) {
        case (window as any).TUIKitTUICore.TIM.TYPES.CONV_C2C:
          // eslint-disable-next-line no-case-declarations
          const {flow, to, from} = data?.data?.message;
          if (to === from) break;
          try {
            await (window as any)?.TUIKitTUICore?.TUIServer?.TUICallKit?.call({
              userID: flow === 'out' ? to : from,
              type: callType,
            });
            (window as any)?.TUIKitTUICore?.isOfficial && VuexStore?.commit && VuexStore?.commit('handleTask', 6);
          } catch (error) {
            console.warn(error);
          }
          if ((window as any)?.TUIKitTUICore?.TUIServer?.TUICallKit) {
            TUIAegis.getInstance().reportEvent({
              name: 'callOptions',
              ext1: 'clickCall-success',
            });
            TUIAegis.getInstance().reportEvent({
              name: 'callOptions',
              ext1: 'call-c2c',
            });
          }
          break;
        case (window as any).TUIKitTUICore.TIM.TYPES.CONV_GROUP:
          break;
        default:
          break;
      }
    };

    return {
      ...toRefs(data),
      isUrl,
      openLink,
      handleCallMessageIcon,
      handleCallAgain,
      sendSnippetEventFunction,
    };
  },
});
</script>
<style lang="scss" scoped>
@import url('../../../styles/common.scss');
@import url('../../../styles/icon.scss');

a {
  color: #679ce1;
}

.custom {
  font-size: 14px;

  h1 {
    font-size: 14px;
    color: #000000;
  }

  h1,
  a,
  p {
    font-size: 14px;
  }

  .evaluate {
    ul {
      display: flex;
      padding-top: 10px;
    }
  }

  .order {
    display: flex;

    main {
      padding-left: 5px;

      p {
        font-family: PingFangSC-Regular;
        width: 145px;
        line-height: 17px;
        font-size: 14px;
        color: #999999;
        letter-spacing: 0;
        margin-bottom: 6px;
        word-break: break-word;
      }

      span {
        font-family: PingFangSC-Regular;
        line-height: 25px;
        color: #ff7201;
      }
    }

    img {
      width: 67px;
      height: 67px;
    }
  }

  .call {
    display: flex;
    flex-direction: row;
    align-items: center;

    &-C2C {
      cursor: pointer;
    }

    &-GROUP {
      cursor: default;
    }
  }
}
</style>
