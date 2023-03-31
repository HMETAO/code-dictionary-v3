<template>
    <div class="login-container flex h-full w-full">
        <LoginForm></LoginForm>
    </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRef, computed, onMounted} from 'vue';
import LoginForm from "../components/LoginForm.vue";


</script>
<style scoped lang="less">
@DefaultColor: #76bbd7;

.login-container {
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #74b9ff;
}

</style>
