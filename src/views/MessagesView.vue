<template>
  <div>
    <content-chats />
  </div>
</template>

<script setup lang="ts">
import ContentChats from "@/components/ContentChats.vue";
import { computed, onActivated, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();
const API_URL = import.meta.env.VITE_API_URL;

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      store.changeUser(data);
    }
  } catch (err) {
    console.log(err);
  }
});

onActivated(async () => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      store.changeUser(data);

      const responseSecond = await fetch(`${API_URL}/auth/allUsers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
        }),
      });
      const dataUsers = await responseSecond.json();
      store.changeUsers(dataUsers.users);
    } else {
      router.push("/login");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
});
</script>

<style scoped></style>
