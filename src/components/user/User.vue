<template>
  <div class="user-box">
    <div class="user-box-table">
      <UserTable v-model="tableData.list"/>
    </div>
    <div class="user-box-page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-count="tableData.pages"
          v-model:current-page="queryForm.pageNum"
          @update:current-page="queryPropChangeEventFunction"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserTable from "@/components/user/UserTable.vue";
import {ref} from "vue";
import {BaseQueryForm} from "@/form/base";
import {getUsers} from "@/api/user";
import {PageInfo} from "@/result";
import {UserRole} from "@/type/userType";

const queryForm = ref<BaseQueryForm>({pageNum: 1, pageSize: 5})

const tableData = ref<PageInfo<UserRole>>({})

const findUser = async () => {
  const res = await getUsers(queryForm.value)
  tableData.value = res.data
  console.log(tableData.value.list)
}

// 初始化方法
const init = () => {
  findUser()
}

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

  .user-box-table {
    width: 100%;
    flex: 1;
  }

  .user-box-page {
    margin-right: 10px;
  }

}
</style>