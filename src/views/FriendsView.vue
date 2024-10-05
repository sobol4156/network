<template>
  <div class="friends-view">
    <div>
      <h1>Найти друзей</h1>
      <search />
    </div>
    <div class="friends-list">
      <div v-for="item in users" class="friends-list__item">
        <friend :user="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from "@/components/left-part-chat/Search.vue";
import Friend from "@/components/Friend.vue";
import { onActivated, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();
const API_URL = import.meta.env.VITE_API_URL;
const users = computed(() => {
  return store.users;
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

<style scoped lang="scss">
.friends-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: start;
  align-items: center;
  text-align: center;

  .friends-list {
    overflow-y: scroll;
    height: 100%;
    scrollbar-width: thin; /* Узкий скроллбар для Firefox */
    scrollbar-color: #8c00ff rgba(0, 0, 0, 0.1);
    -ms-overflow-style: none;

    &__item {
      margin-top: 5px;
    }
  }

  .friends-list::-webkit-scrollbar {
    width: 8px; /* Ширина скроллбара */
    height: 100px;
  }

  .friends-list::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1); /* Цвет фона трека */
  }

  .friends-list::-webkit-scrollbar-thumb {
    background-color: #8c00ff; /* Цвет ползунка */
    border-radius: 10px; /* Скругленные углы */
    border: 2px solid rgba(0, 0, 0, 0.1); /* Добавить отступ внутри скроллбара */
  }

  .friends-list::-webkit-scrollbar-thumb:hover {
    background-color: #8c00ff; /* Изменение цвета при наведении */
  }
  .friends-list::-webkit-scrollbar {
    width: 8px; /* Ширина скроллбара */
  }

  .friends-list::-webkit-scrollbar-button {
    display: none; /* Убираем кнопки прокрутки в WebKit-браузерах */
  }
}
</style>
