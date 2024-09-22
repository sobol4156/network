<template>
  <div class="content">
    <div class="left-part">
      <profile-header />
      <search />
      <story-list />
      <my-chats />
    </div>
    <div class="right-part">
      <profile-header :right-part="true"/>
      <main-chat/>
      <main-chat-input class="right-part__input"/>
    </div>
  </div>
</template>

<script setup>
import ProfileHeader from "@/components/ProfileHeader.vue";
import Search from "@/components/left-part-chat/Search.vue";
import StoryList from "@/components/left-part-chat/StoryList.vue";
import MyChats from "@/components/left-part-chat/MyChats.vue";
import MainChat from "@/components/right-part-chat/MainChat.vue";
import MainChatInput from "@/components/right-part-chat/MainChatInput.vue";
</script>

<style scoped lang="scss">
.content {
  display: flex;
  width: 100%;
  height: 100%;
}

.right-part {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent);
  }


}
</style>
