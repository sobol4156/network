<template>
  <div class="chat-footer">
    <paper-clip-icon />
    <input
      class="chat-footer__input"
      type="text"
      placeholder="Write a message..."
    />
    <sticker-icon class="chat-footer__sticker" />
    <microphone-icon class="chat-footer__microphone" />
  </div>
</template>

<script setup lang="ts">
import MicrophoneIcon from "@/components/ui/MicrophoneIcon.vue";
import PaperClipIcon from "@/components/ui/PaperClipIcon.vue";
import StickerIcon from "@/components/ui/StickerIcon.vue";
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
