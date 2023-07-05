<template>
    <el-menu
            class="h-full menu-container"
            router
            :default-active="stateStore.menuActive"
            text-color='#2d3436'
            unique-opened
            active-text-color='#0984e3'>
        <el-menu-item v-for="(menu, index) in menus as Array<MenusType>" :index='menu.path' :key="index">
            <el-icon>
                <Coordinate/>
            </el-icon>
            <span>{{ menu.menusName }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import {getMenus} from "@/api/menus";
import {MenusType} from "@/type/menusType";
import { Coordinate} from '@element-plus/icons-vue'
import {useStateStore} from "@/store";
const stateStore = useStateStore()
// 使用vueFetch调用getMenus返回响应式对象
const menus = getMenus().data

</script>
<style scoped lang="less">
.menu-container {
}
</style>
