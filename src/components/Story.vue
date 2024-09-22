<template>
  <div class="story story--add">
    <div class="story__avatar">
      <div v-if="props.myStory" class="story__add-icon">+</div>
      <img v-else :src="props.user.img" alt="Add Story" />
    </div>
    <span v-if="props.myStory">My Story</span>
    <span v-else>{{ props.user.name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  myStory: Boolean,
  user: {
    name: String,
    img: String,
  },
});
</script>

<style scoped lang="scss">
.story {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story__avatar {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid transparent;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.story__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.story--add .story__avatar {
  border: 2px dashed #888;
}

.story__add-icon {
  position: absolute;
  color: white;
  font-size: 18px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.story--new .story__avatar {
  border: 2px solid #ff007a; /* Обводка для новых историй */
}

.story span {
  margin-top: 8px;
  font-size: 12px;
  color: #fff;
}
</style>
