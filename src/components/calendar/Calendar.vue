<template>
  <el-calendar v-if="flag">
    <template #date-cell="{ data }">
      <div class="calendar-day">
        {{ data.day.split('-').slice(1).join('-') }}
      </div>
      <div class="calendar-label">
        {{ map.get(data.day) }}
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
      map.set(key, map.get(key) + "\n" + item.label)
    } else {
      map.set(key, item.label)
    }
  })
  flag.value = true
}
init()
</script>
<style scoped lang="less">
.calendar-day {
  font-size: 10px;
}

.calendar-label {
  font-size: 8px;
}

</style>
