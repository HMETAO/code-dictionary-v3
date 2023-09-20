<template>
  <div class="user-box">
    <div class="user-box-header">
      <UserHeader/>
    </div>
    <div class="user-box-table">
      <UserTable v-model="tableData.list"/>
    </div>
    <div class="user-box-page">
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
import UserTable from "@/components/user/UserTable.vue";
import {getCurrentInstance, onMounted, onUnmounted, ref} from "vue";
import {BaseQueryForm} from "@/form/base";
import {getUsers} from "@/api/user";
import {PageInfo} from "@/result";
import {UserRole} from "@/type/userType";
import {DELETE_USER_EVENT, REGISTRY_USER_EVENT, UPDATE_USER_EVENT} from "@/constants/eventConstants";
import UserHeader from "@/components/user/UserHeader.vue";

const queryForm = ref<BaseQueryForm>({pageNum: 1, pageSize: 10})

const tableData = ref<PageInfo<UserRole>>({})
const instance = getCurrentInstance()
const refreshEventName = [DELETE_USER_EVENT, UPDATE_USER_EVENT, REGISTRY_USER_EVENT]
const findUser = async () => {
  const res = await getUsers(queryForm.value)
  tableData.value = res.data
}


// 初始化方法
const init = () => {
  findUser()
}
onMounted(() => {
  refreshEventName.forEach(e => {
    instance?.proxy?.$bus.on(e, () => {
      findUser()
    })
  })
})

onUnmounted(() => {
  refreshEventName.forEach(e => {
    instance?.proxy?.$bus.off(e)
  })
})

init()
// 页号改变事件回调函数
const queryPropChangeEventFunction = () => {
  findUser()
}

</script>

<style scoped lang="less">
.user-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;

  .user-box-header {
    width: 100%;
  }

  .user-box-table {
    width: 100%;
    flex: 1;
  }

  .user-box-page {
    margin-right: 10px;
  }

}
</style>