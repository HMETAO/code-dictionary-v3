<template>
    <div class="login-container flex h-full w-full">
        <LoginForm></LoginForm>
    </div>
</template>
<script setup lang="ts">
import LoginForm from "../components/login/LoginForm.vue";


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
