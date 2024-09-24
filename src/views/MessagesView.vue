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
});
</script>

<style scoped></style>
