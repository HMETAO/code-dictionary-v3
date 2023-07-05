<template>
    <div class="tool-box h-full w-full">
        <div class="tool-head">
            <ToolHeader></ToolHeader>
        </div>
        <div class="tool-container">
            <ToolTable></ToolTable>
        </div>
    </div>
</template>
<script setup lang="ts">
import ToolTable from "./ToolTable.vue";
import ToolHeader from "./ToolHeader.vue";

</script>

<style scoped lang="less">
.tool-box {
  display: flex;
  flex-direction: column;

  .tool-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
}
</style>
