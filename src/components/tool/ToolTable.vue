<template>
    <div class="w-full">
        <el-table
                border
                highlight-current-row
                style='width: 100%'>
            <el-table-column
                    type='selection'>
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='toolName'
                    label='工具名'
            >
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='toolType'
                    label='工具类型'
            >
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='toolSize'
                    label='工具大小 (kb)'
            >
            </el-table-column>
            <el-table-column
                    align='center'
                    prop='createTime'
                    label='上传时间'
            >
            </el-table-column>
            <el-table-column
                    align='center'
                    label='操作'>
                <template v-slot='scope'>
                    <el-button type='primary' size='small'>下载
                    </el-button>
                    <el-button type='danger' size='small'>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';

</script>
<style scoped lang="less">

</style>
