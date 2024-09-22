<template>
  <div>
    <profile-header/>
    <search/>
    <story-list/>
    <my-chats/>
  </div>
</template>

<script setup>
import ProfileHeader from '@/components/listChats/ProfileHeader.vue'
import Search from '@/components/listChats/Search.vue'
import StoryList from '@/components/listChats/StoryList.vue'
import MyChats from '@/components/listChats/MyChats.vue'
</script>