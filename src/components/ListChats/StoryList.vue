<template>
  <div class="stories">
    <story :my-story="true" />
    <div v-for="story in stories">
      <story :user="story" />
    </div>
  </div>
</template>

<script setup>
import Story from "@/components/Story.vue";

const stories = [
  {
    name: "Alisa B.",
    img: "https://i.pinimg.com/originals/f1/d9/c7/f1d9c7c375af2853eec20eadaa26862b.jpg",
  },
  {
    name: "Maria N.",
    img: "https://i.pinimg.com/736x/7a/d0/48/7ad04845d31548ba5fefd06e3527809b.jpg",
  },
  {
    name: "Natali V.",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/44955c74648861.5c361b818bd58.jpg",
  },
];
</script>

<style scoped lang="scss">
.stories {
  display: flex;
  gap: 15px;
  padding: 20px;
position: relative;
  &::after{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 5px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);

  }
}
</style>
