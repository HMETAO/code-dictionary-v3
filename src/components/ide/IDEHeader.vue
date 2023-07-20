<template>
  <div class="ide-header-box w-full h-full">
    <div>
      <el-tooltip
          effect="dark"
          content="运行代码"
          placement="top">
        <el-button type="primary" circle size="default" @click="runCodeDrawer = !runCodeDrawer">
          <el-icon>
            <Cpu/>
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <RunCodeDrawer v-model="runCodeDrawer" v-model:snippet="snippet"/>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";

const runCodeDrawer = ref<boolean>(false)
const saveContent = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('keydown', saveContent)
})

onUnmounted(() => {
  document.removeEventListener('keydown', saveContent)
})

const props = defineProps<{
  modelValue: string
}>()
const snippet = ref<string>("")
watch<string>(() => props.modelValue, () => {
  snippet.value = props.modelValue
})
</script>

<style scoped lang="scss">
.ide-header-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background-color: #4d4d4d;
}
</style>