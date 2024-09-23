<template>
  <div class="chat-footer">
    <paper-clip-icon />
    <input
      class="chat-footer__input"
      type="text"
      placeholder="Write a message..."
      v-model="inputMessage"
      @keyup.enter="sendMessage"
    />
    <sticker-icon class="chat-footer__sticker" />
    <microphone-icon class="chat-footer__microphone" />
  </div>
</template>

<script setup lang="ts">
import MicrophoneIcon from "@/components/ui/MicrophoneIcon.vue";
import PaperClipIcon from "@/components/ui/PaperClipIcon.vue";
import StickerIcon from "@/components/ui/StickerIcon.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

let socket: WebSocket; // WebSocket объект
const inputMessage = ref("");
// Функция для отправки сообщений
const sendMessage = () => {
  if (inputMessage.value) {
    socket.send(inputMessage.value); // Отправляем сообщение на сервер
    inputMessage.value = ""; // Очищаем поле ввода
  }
};

// Функция для подключения к WebSocket
const connectWebSocket = () => {
  // Указываем URL WebSocket-сервера
  socket = new WebSocket("ws://localhost:8080");

  // Обработчик открытия соединения
  socket.onopen = () => {
    console.log("Connected to WebSocket server");
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

onMounted(() => {
  connectWebSocket();
});

// Перед размонтированием компонента закрываем соединение
onBeforeUnmount(() => {
  if (socket) {
    socket.close();
  }
});
</script>

<style scoped lang="scss">
.chat-footer {
  padding: 17px 20px;
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
  }

  &__input {
    width: 100%;
    background: transparent;
    border: none;
    font-size: 18px;
    padding: 0 10px;
    margin-left: 10px;

    &:focus::placeholder {
      color: transparent;
    }
  }

  &__microphone {
    margin-left: 10px;
  }
}
</style>
