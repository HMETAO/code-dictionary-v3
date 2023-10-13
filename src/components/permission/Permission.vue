<template>
  <div class="permission-box">
    <div class="permission-box-header">
      <PermissionHeader/>
    </div>
    <div class="permission-box-table">
      <PermissionTable v-model="tableData.list"/>
    </div>
    <div class="permission-box-page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-count="tableData.pages"
          v-model:current-page="queryForm.pageNum"
          @update:current-page="queryPropChangeEventFunction"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {getCurrentInstance, onMounted, onUnmounted, ref} from "vue";
import {BaseQueryForm} from "@/form/base";
import {PageInfo} from "@/result";
import {getPermissions} from "@/api/permission";
import PermissionTable from "@/components/permission/PermissionTable.vue";
import {Permission} from "@/type/permissionType";
import {DELETE_PERMISSION_EVENT, INSERT_PERMISSION_EVENT, UPDATE_PERMISSION_EVENT} from "@/constants/eventConstants";
import PermissionHeader from "@/components/permission/PermissionHeader.vue";

const queryForm = ref<BaseQueryForm>({pageNum: 1, pageSize: 10})

const tableData = ref<PageInfo<Permission>>({})
const instance = getCurrentInstance()
const refreshEventName = [UPDATE_PERMISSION_EVENT, INSERT_PERMISSION_EVENT, DELETE_PERMISSION_EVENT]
const findPermission = async () => {
  const res = await getPermissions(queryForm.value)
  tableData.value = res.data as any
  console.log(tableData.value)
}

// 初始化方法
const init = () => {
  findPermission()
}

// 挂载事件
onMounted(() => {
  refreshEventName.forEach(e => {
    instance?.proxy?.$bus.on(e, () => {
      findPermission()
    })
  })
})

// 卸载事件
onUnmounted(() => {
  refreshEventName.forEach(e => {
    instance?.proxy?.$bus.off(e)
  })
})

init()
// 页号改变事件回调函数
const queryPropChangeEventFunction = () => {
  findPermission()
}

</script>

<style scoped lang="less">
.permission-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;

  .permission-box-header {
    width: 100%;
  }

  .permission-box-table {
    width: 100%;
    flex: 1;
  }

  .permission-box-page {
    margin-right: 10px;
  }

}
</style>