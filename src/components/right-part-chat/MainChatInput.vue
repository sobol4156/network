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
import { computed, ref, onBeforeUnmount, onMounted, watch } from "vue";
import { useStore } from "@/stores";

const store = useStore();
const inputMessage = ref("");
let socket: WebSocket | null = null; // WebSocket объект
const currentChatUser = computed(() => store.currentChatUser);

// Функция для отправки сообщений
const sendMessage = () => {
  if (inputMessage.value && socket && socket.readyState === WebSocket.OPEN) {
    const objSend = {
      myId: store.user.id,
      friendUserId: store.currentChatUser.id,
      content: inputMessage.value,
      userId: store.user.id,
    };
    socket.send(JSON.stringify(objSend)); // Отправляем сообщение на сервер
    inputMessage.value = ""; // Очищаем поле ввода
  } else {
    console.error("WebSocket не подключён или сообщение пустое");
  }
};

// Функция для подключения к WebSocket
const connectWebSocket = () => {
  if (socket) {
    socket.close(); // Закрываем предыдущее соединение, если оно существует
  }

  socket = new WebSocket("ws://localhost:3000");

  // Обработчик открытия соединения
  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  // Обработчик получения сообщения
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Сообщение от сервера:", message);
    // Логика обработки входящих сообщений
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

// Подключение к WebSocket при монтировании компонента
onMounted(() => {
  connectWebSocket();
});

// Следим за изменением текущего пользователя (чата)
watch(currentChatUser, () => {
  if (currentChatUser.value) {
    connectWebSocket(); // Переподключение при смене чата
  }
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
    color: white;
    &:focus::placeholder {
      color: transparent;
    }
  }

  &__microphone {
    margin-left: 10px;
  }
}
</style>
