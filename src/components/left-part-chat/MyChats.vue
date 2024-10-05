<template>
  <div class="chats">
    <last-chat
      v-for="chat in store.users"
      :chat-user="chat"
      @click="selectChat(chat)"
    />
  </div>
</template>

<script setup lang="ts">
import LastChat from "@/components/LastChat.vue";
import { useStore } from "@/stores";

const store = useStore();

const selectChat = (chat: object) => {
  store.changeCurrentRoom(chat.id);
  store.changeCurrentChatUser(chat)
};

const chats = [
  {
    name: "Natali Botman",
    img: "https://yobte.ru/uploads/posts/2019-11/miniatjurnye-brjunetki-81-foto-30.jpg",
    lastMessage: "Hello, like them?",
    time: "9:50",
    unreadMessage: 3,
    room: 1,
  },
  {
    name: "Igor Vermel",
    img: "https://photo8.wambacdn.net/97/92/36/1783632979/2054983856_huge.jpg?hash=cEko4ZsF19yNbIzYoe9XSg&expires=64060578000&updated=1607911805",
    lastMessage: "Yes",
    time: "9:21",
    unreadMessage: 1,
    room: 2,
  },
  {
    name: "Anatoliy Deriagin",
    img: "https://p5.tabor.ru/photos/2019-06-27/21902553/67649734_800x600.jpg",
    lastMessage: "I don't know",
    time: "7:34",
    unreadMessage: 0,
    room: 3,
  },
  {
    name: "Maga",
    img: "",
    lastMessage: "Yes",
    time: "7:21",
    unreadMessage: 0,
    room: 4,
  },
  {
    name: "Mihail Z",
    img: "",
    lastMessage: "I don't know",
    time: "7:00",
    unreadMessage: 0,
    room: 5,
  },
];
</script>

<style scoped lang="scss">
.chats {
  display: flex;
  flex-direction: column;
  min-height: 363px;
  max-height: 363px;
  overflow-y: auto;
  padding-bottom: 40px;
  overflow-x: hidden;

  scrollbar-width: thin; /* Узкий скроллбар для Firefox */
  scrollbar-color: #8c00ff rgba(0, 0, 0, 0.1);
  -ms-overflow-style: none;
}

.chats::-webkit-scrollbar {
  width: 8px; /* Ширина скроллбара */
  height: 100px;
}

.chats::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1); /* Цвет фона трека */
}

.chats::-webkit-scrollbar-thumb {
  background-color: #8c00ff; /* Цвет ползунка */
  border-radius: 10px; /* Скругленные углы */
  border: 2px solid rgba(0, 0, 0, 0.1); /* Добавить отступ внутри скроллбара */
}

.chats::-webkit-scrollbar-thumb:hover {
  background-color: #8c00ff; /* Изменение цвета при наведении */
}
.chats::-webkit-scrollbar {
  width: 8px; /* Ширина скроллбара */
}

.chats::-webkit-scrollbar-button {
  display: none; /* Убираем кнопки прокрутки в WebKit-браузерах */
}
</style>
