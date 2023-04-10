<template>
       <MdEditor v-model="text"/>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed} from 'vue';
import MdEditor from 'md-editor-v3';

const text = ref('')
</script>
<style scoped lang="less">
.md-editor {
  height: 100% !important;
}
</style>
