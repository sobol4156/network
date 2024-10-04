<template>
  <div class="chat-container">
    <div class="messages" ref="messagesContainer">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="['message', message.userId === store.user.id ? 'message-right' : 'message-left']">
        <span>{{ message.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from "vue";
import { useStore } from "@/stores";

const store = useStore();
const messages = ref([]); // Хранение всех сообщений
const messagesContainer = ref(null); // Контейнер для скролла
let socket; // WebSocket объект

// Следим за выбранной комнатой
const currentRoom = computed(() => store.currentRoom);

// Функция для подключения к WebSocket'у
const connectWebSocket = (roomId) => {
  // Закрытие предыдущего WebSocket соединения, если оно есть
  if (socket) socket.close();

  socket = new WebSocket("ws://localhost:3000");

  socket.onopen = () => {
    console.log(`Подключён к WebSocket серверу для комнаты ${roomId}`);
    socket.send(JSON.stringify({ action: "join", room: roomId }));
  };

  socket.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);
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
  await fetchMessages(currentRoom.value);
  connectWebSocket(currentRoom.value);
  scrollToBottom();
});

// Перед размонтированием закрываем WebSocket соединение
onBeforeUnmount(() => {
  if (socket) socket.close();
});

// Запрос сообщений для выбранной комнаты
const fetchMessages = async (roomId) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ room: roomId }),
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
watch(currentRoom, async (newRoom) => {
  if (newRoom !== null) {
    await fetchMessages(newRoom);
    connectWebSocket(newRoom); // Переподключение к WebSocket при смене комнаты
  }
}, { immediate: true });

// Следим за изменениями в количестве сообщений и прокручиваем вниз
watch(() => messages.value.length, () => {
  scrollToBottom();
});
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
