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

onActivated(async () => {
  const response = await fetch("http://localhost:4000/auth/profile", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  store.changeUser(data)

  const responseSecond= await fetch("http://localhost:4000/auth/allUsers", {
    method: 'GET',
    credentials: "include",
  })
  const dataUsers = await responseSecond.json()
  store.changeUsers(dataUsers.users)
  console.log(dataUsers.users)
});
</script>

<style scoped></style>
