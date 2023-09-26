<template>
  <div class="role-box">
    <div class="role-box-header">
      <RoleHeader/>
    </div>
    <div class="role-box-table">
      <RoleTable v-model="tableData.list"/>
    </div>
    <div class="role-box-page">
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
import {getRolesPage} from "@/api/role";
import {Role} from "@/type/roleType";
import RoleTable from "@/components/role/RoleTable.vue";
import RoleHeader from "@/components/role/RoleHeader.vue";
import {DELETE_ROLE_EVENT, INSERT_ROLE_EVENT} from "@/constants/eventConstants";

const queryForm = ref<BaseQueryForm>({pageNum: 1, pageSize: 10})

const tableData = ref<PageInfo<Role[]>>({})
const instance = getCurrentInstance()
const refreshEventName = [INSERT_ROLE_EVENT, DELETE_ROLE_EVENT]
const findRole = async () => {
  const res = await getRolesPage(queryForm.value)
  tableData.value = res.data
}

// 初始化方法
const init = () => {
  findRole()
}

// 挂载事件
onMounted(() => {
  refreshEventName.forEach(e => {
    instance?.proxy?.$bus.on(e, () => {
      findRole()
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
  findRole()
}

</script>

<style scoped lang="less">
.role-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;

  .role-box-header {
    width: 100%;
  }

  .role-box-table {
    width: 100%;
    flex: 1;
  }

  .role-box-page {
    margin-right: 10px;
  }

}
</style>