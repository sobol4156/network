<template>
  <div class="last-chat">
    <img
      class="last-chat__avatar"
      :src="props.chatUser.img || 'https://static.wikia.nocookie.net/godmodes/images/5/50/Unknown........jpg/revision/latest?cb=20221114200926'"
      alt="Avatar"
      width="50"
      height="50"
    />
    <div class="last-chat__text">
      <span class="last-chat__name">{{ props.chatUser.name }}</span>
      <span class="last-chat__message">{{ props.chatUser.lastMessage }}</span>
    </div>
    <div class="last-chat__info">
      <span class="last-chat__time">{{ props.chatUser.time }}</span>
      <span
        v-if="props.chatUser.unreadMessage !== 0"
        class="last-chat__icon-state"
        >{{ props.chatUser.unreadMessage }}</span
      >
      <readed-message-icon v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReadedMessageIcon from "@/components/ui/ReadedMessageIcon.vue";

const props = defineProps({
  chatUser: Object,
});
</script>

<style scoped lang="scss">
.last-chat {
  display: flex;
  position: relative;
  padding: 20px;
  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    right: 0;
    height: 5px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
  }

  &__avatar {
    border-radius: 50%;
  }

  &__text {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  &__message {
    color: rgba(139, 139, 139, 0.65);
    font-weight: 700;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
  }

  &__time {
    color: rgba(139, 139, 139, 0.65);
  }

  &__icon-state {
    border-radius: 50%;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }
}
</style>
