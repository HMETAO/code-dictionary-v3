<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <div class="calendar-day" v-if="flag  && map.get(data.day)">
        <el-tooltip v-if="flag"
                    class="box-item"
                    effect="dark"
                    raw-content
                    :content="map.get(data.day)"
                    placement="top-start">
          <el-tag size="large">
            {{ data.day.split('-').slice(1).join('-') }}
          </el-tag>
        </el-tooltip>
      </div>
      <div v-else>
        <!--        <el-tag class="ml-2" size="large">-->
        {{ data.day.split('-').slice(1).join('-') }}
        <!--        </el-tag>-->
      </div>
    </template>
  </el-calendar>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {getCalendar} from "../../api/calendar";
import {CalendarType} from "../../type/calendar";

let calendar = ref<CalendarType[]>([]);
const flag = ref<boolean>(false)
const map = new Map();
const init = async () => {
  // 获取日历
  const res = await getCalendar()
  calendar.value = res.data
  // 构造
  calendar.value.forEach(item => {
    let key = item.dates?.[0]
    if (map.has(key)) {
      map.set(key, map.get(key) + "</br>" + item.label)
    } else {
      map.set(key, item.label)
    }
  })
  flag.value = true
}
init()
</script>
<style scoped lang="less">


</style>
