<template>
  <div>
    <UserTable v-model="tableData.list "/>
    <!--    <el-pagination-->
    <!--        small-->
    <!--        background-->
    <!--        layout="prev, pager, next"-->
    <!--        :total="tableData.total"-->
    <!--        v-model:current-page="queryForm.pageNum"-->
    <!--        @update:current-page="queryPropChangeEventFunction"-->
    <!--    />-->
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

const {data, execute} = getUsers(false, queryForm.value)
const tableData = ref<PageInfo<UserRole>>({})
// 初始化方法
const init = async () => {
  await execute()
  tableData.value = data.value as PageInfo<UserRole>
}
init()
</script>

<style scoped lang="less">

</style>