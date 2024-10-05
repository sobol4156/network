<template>
  <div class="chat-container">
    <div class="messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="[
          'message',
          message.userId === store.user.id ? 'message-right' : 'message-left',
        ]"
      >
        <span>{{ message.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  computed,
} from "vue";
import { useStore } from "@/stores";

const store = useStore();
const messages = ref([]); // Хранение всех сообщений
const messagesContainer = ref(null); // Контейнер для скролла
let socket; // WebSocket объект

// Следим за выбранной комнатой
const currentUserChat = computed(() => store.currentChatUser);

// Функция для подключения к WebSocket'у
const connectWebSocket = () => {
  // Закрытие предыдущего WebSocket соединения, если оно есть
  if (socket) socket.close();
  socket = new WebSocket("ws://localhost:3000");
  const room = [store.user.id, store.currentChatUser.id].sort().join("-");
  socket.onopen = () => {
    console.log(`Подключён к WebSocket серверу для комнаты ${room}`);
    socket.send(JSON.stringify({ action: "join", myId: store.user.id, friendUserId: store.currentChatUser.id }));
  };

  socket.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);
    console.log(newMessage)
    messages.value.push(newMessage); // Добавление нового сообщения в массив
    scrollToBottom(); // Прокрутка вниз после получения нового сообщения
  };

  socket.onclose = () => {
    console.log("WebSocket соединение закрыто");
  };

  socket.onerror = (error) => {
    console.error("Ошибка WebSocket:", error);
  };
};

// Подключение к чату при монтировании компонента
onMounted(async () => {
  await fetchMessages();
  connectWebSocket([store.user.id, currentChatUser.value.id]);
  scrollToBottom();
});

// Перед размонтированием закрываем WebSocket соединение
onBeforeUnmount(() => {
  if (socket) socket.close();
});

// Запрос сообщений для выбранной комнаты
const fetchMessages = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      myId: store.user.id,
      friendUserId: store.currentChatUser.id,
    }),
  });

  const data = await response.json();
  messages.value = data; // Обновляем массив сообщений
};

// Прокрутка сообщений вниз
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Следим за изменениями в выбранной комнате
watch(
  currentUserChat,
  async (newRoom) => {
    if (newRoom !== null) {
      await fetchMessages();
      connectWebSocket(newRoom); // Переподключение к WebSocket при смене комнаты
    }
  },
  { immediate: true }
);

// Следим за изменениями в количестве сообщений и прокручиваем вниз
watch(
  () => messages.value.length,
  () => {
    scrollToBottom();
  }
);
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}

.messages {
  margin-bottom: 10px;
  overflow-y: auto;
  max-height: 486px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.message {
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
  max-width: 70%;
  display: flex;
  word-break: break-word;

  &.message-left {
    background-color: rgb(125, 125, 238);
    color: white;
    align-self: flex-start;
  }

  &.message-right {
    background-color: rgb(75, 75, 238);
    color: white;
    align-self: flex-end;
  }
}
</style>
