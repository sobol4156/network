<template>
  <div>
    <content-chats />
  </div>
</template>

<script setup>
import ContentChats from "@/components/ContentChats.vue";
import { onActivated } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();
const API_URL= import.meta.env.VITE_API_URL

onActivated(async () => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  store.changeUser(data)

  const responseSecond= await fetch(`${API_URL}/auth/allUsers`, {
    method: 'GET',
    credentials: "include",
  })
  const dataUsers = await responseSecond.json()
  store.changeUsers(dataUsers.users)
  console.log(dataUsers.users)
});
</script>

<style scoped></style>
