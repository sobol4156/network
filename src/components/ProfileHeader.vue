<template>
  <div class="profile-header">
    <img
      class="profile-header__avatar"
      src="https://www.koc.lt/images_mod/animation/background_4.jpg"
      alt="Avatar"
      width="50"
      height="50"
    />

    <div class="profile-header__user">
      <span class="profile-header__user-name">Alex Sobol</span>
      <span class="profile-header__user-post">FullStack Developer</span>
    </div>

    <div
      :class="[
        props.rightPart
          ? 'profile-header__more-right'
          : 'profile-header__more-left',
      ]"
    >
      <div v-if="props.rightPart" class="profile-header__search-icon">
        <search-icon />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/components/ui/SearchIcon.vue";

const props = defineProps({
  rightPart: Boolean,
});
</script>

<style scoped lang="scss">
.profile-header {
  padding: 20px;
  display: flex;
  position: relative;
  width: 100%;
  height: 90px;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
  }

  &__search-icon {
    margin-left: auto;
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
  &__avatar {
    border-radius: 50%;
    margin-right: 15px;
    cursor: pointer;
    object-fit: cover;
  }
  &__user {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    &-name {
    }

    &-post {
      color: rgba(139, 139, 139, 0.65);
    }
  }
  &__more-left {
    cursor: pointer;
    position: relative;
    margin-left: auto;

    &::before {
      content: "...";
      font-size: 24px;
      top: 0;
      color: grey;
    }
  }
  &__more-right {
    cursor: pointer;
    position: relative;
    margin-left: auto;
    display: flex;

    &::after {
      content: "...";
      font-size: 24px;
      top: 0;
      color: grey;
    }
  }
}
</style>
