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
      <chat-messanger/>
    </div>
  </div>
</template>

<script setup>
import ProfileHeader from "@/components/ProfileHeader.vue";
import Search from "@/components/left-part-chat/Search.vue";
import StoryList from "@/components/left-part-chat/StoryList.vue";
import MyChats from "@/components/left-part-chat/MyChats.vue";
</script>

<style scoped lang="scss">
.content {
  display: flex;
  width: 100%;
}

.right-part {
  width: 100%;
  display: flex;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0px;
    width: 4px;
    height: 100.5%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent);
  }
}
</style>
