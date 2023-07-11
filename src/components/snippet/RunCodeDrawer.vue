<template>
  <div>

    <el-drawer v-model="drawer" :size="drawerSize + '%'"
              :lock-scroll="false" append-to-body
               @close="closeDrawer">
      <template #header>
        <h4>运行代码</h4>
      </template>
      <template #default>
        <div class="drawer-box">
          <el-slider v-model="drawerSize" :min="25"/>
          <div class="language-box">
            语言类型：
            <el-select v-model="codeEnum" placeholder="Select" size="large">
              <el-option
                  v-for="item in CodeEnum"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </div>
          <div class="args-box">
            <div style="width: 70px">
              参数：
            </div>
            <el-input
                v-model="args"
                :rows="6"
                type="textarea"
                placeholder="Please args"
            />
          </div>
          <el-divider/>
          <div class="code-result-box">
            <div class="code-result-container" v-text="codeResult">
            </div>
          </div>
        </div>

      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeDrawer">cancel</el-button>
          <el-button type="primary" @click="runClickEventFunction">run</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import {useStateStore} from "@/store";
import {runCode} from "@/api/snippet";
import {CodeEnum} from "@/enums/codeEnum";

const stateStore = useStateStore()
const drawerSize = ref<number>(35)
const args = ref<string>("")
const codeEnum = ref<string>(CodeEnum.Cpp)
const codeResult = ref<string>("")
// run点击事件回调
const runClickEventFunction = async () => {
  const res = await runCode({
    code: stateStore.snippetForm.snippet,
    codeEnum: codeEnum.value, args: args.value
  })
  codeResult.value = res.data
}

const props = defineProps<{
  modelValue: boolean
}>()

const drawer = ref<boolean>(false)
watch<boolean>(() => props.modelValue, () => {
  drawer.value = props.modelValue
})

// 向上触发更新
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
const closeDrawer = () => {
  emit('update:modelValue', false)
}
</script>
<style scoped lang="less">
@bc: #dcdfe6;
.drawer-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .args-box {
    display: flex;
    margin-top: 10px;
  }

  .code-result-box {
    flex: 1;
    display: flex;
    overflow: auto;

    .code-result-container {
      width: 100%;
      height: 100%;
      flex: 1;
      border: 1px solid @bc;
      padding: 15px;
      font-size: 16px;
      border-radius: 5px;
    }

  }


}
</style>
