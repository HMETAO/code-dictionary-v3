<template>
<!--    <el-row>-->
<!--        <el-col span="12">-->
            <el-menu
                    class="h-full menu-container"
                    router
                    text-color='#2d3436'
                    unique-opened
                    active-text-color='#0984e3'>
                <el-menu-item v-for="(menu, index) in menus " :index='menu.path' :key="index">
                    <el-icon>
                        <Coordinate/>
                    </el-icon>
                    <span>{{ menu.menusName }}</span>
                </el-menu-item>
            </el-menu>
<!--        </el-col>-->
<!--    </el-row>-->
</template>

<script setup lang="ts">
import {getMenus} from "../api/menus";
import {MenusType} from "../type/menusType";
import {Menu, Coordinate} from '@element-plus/icons-vue'

const menus = getMenus().data as unknown as MenusType

console.log(menus)
</script>
<style scoped lang="less">
.menu-container {
}
</style>
