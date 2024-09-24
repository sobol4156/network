<template>
  <div class="chat-container">
    <div class="messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const messages = ref([]);
const messagesContainer = ref(null);
let socket; // WebSocket объект

// Функция для подключения к WebSocket
const connectWebSocket = () => {
  // Указываем URL WebSocket-сервера
  socket = new WebSocket("ws://localhost:4000");

  // Обработчик открытия соединения
  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  // Обработчик получения сообщения
  socket.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);
    messages.value.push(newMessage);
    scrollToBottom();
  };

  // Обработчик закрытия соединения
  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  // Обработчик ошибки
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};


onMounted(async () => {
  const response = await fetch("http://localhost:4000/api/chat", {
    method: "POST",
    credentials: "include", 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      room: 1, 
    }),
  });
  const data = await response.json()
  messages.value = data
  
  connectWebSocket();
  scrollToBottom();
});

// Перед размонтированием компонента закрываем соединение
onBeforeUnmount(() => {
  if (socket) {
    socket.close();
  }
});

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Следим за изменениями в сообщениях и прокручиваем вниз
watch(
  () => messages,
  () => {
    console.log(123);
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

  align-self: end;
}
input {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
