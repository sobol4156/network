<template>
  <div class="login-view">
    <login-form />
  </div>
</template>

<script setup>
import LoginForm from "@/components/authorization/LoginForm.vue";
import { onActivated } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();

onActivated(async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();

  store.changeUser(data);
  if(response.ok){
    router.push('/messages')
  }
  
});
</script>

<style scoped>
.login-view {
  height: 100%;
}
</style>
