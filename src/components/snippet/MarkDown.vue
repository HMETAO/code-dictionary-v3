<template>
    <MdEditor v-model="snippetForm.snippet" :toolbars-exclude="['github']"
              :no-prettier="true"
              :showCodeRowNumber="true">
    </MdEditor>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed, getCurrentInstance, onUnmounted, onBeforeMount} from 'vue';
import MdEditor from 'md-editor-v3';
import {SNIPPET_GET_EVENT} from "../../constants/EventConstants";
import {useStateStore} from "../../store";
import {storeToRefs} from "pinia";
import {SnippetForm} from "../../form/snippet";
import {SnippetType} from "../../type/snippetType";

const stateStore = useStateStore()
const {snippetForm} = storeToRefs(stateStore)


const instance = getCurrentInstance()
// 注册监听切换面板事件
instance?.proxy?.$bus.on(SNIPPET_GET_EVENT, (snippet) => {
    snippetForm.value = snippet as SnippetType
})

onBeforeMount(() => {
    // 卸载事件函数
    instance?.proxy?.$bus.off(SNIPPET_GET_EVENT)
})
</script>
<style scoped lang="less">
.md-editor {
  height: 100% !important;
}
</style>
