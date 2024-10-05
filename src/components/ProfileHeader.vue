<template>
  <div class="profile-header">
    <img
      class="profile-header__avatar"
      :src="`${
        props.rightPart
          ? 'https://static.wikia.nocookie.net'
          : 'https://www.koc.lt/images_mod/animation/background_4.jpg'
      }`"
      alt="Avatar"
      width="50"
      height="50"
    />

    <div class="profile-header__user">
      <span
        v-if="props.rightPart"
        class="profile-header__user-name"
        >{{ store.currentChatUser.name }}</span
      >
      <span v-else class="profile-header__user-name">{{
        store.user.name
      }}</span>
      <span class="profile-header__user-post">{{
        !props.rightPart ? "FullStack Developer" : ""
      }}</span>
    </div>
    <div v-if="props.rightPart" class="profile-header__search-icon">
      <search-icon class="search-icon" />
    </div>
    <div
      :class="[
        props.rightPart
          ? 'profile-header__more-right'
          : 'profile-header__more-left',
      ]"
      @mouseenter="showModal"
      @mouseleave="hideModal"
    >
      <transition name="fade">
        <div v-if="isModalVisible && props.rightPart" class="modal">
          <span @click="logout">Log Out</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/components/ui/SearchIcon.vue";
import { useStore } from "@/stores";
import { ref } from "vue";

const store = useStore();
const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};

const logout = async () => {
  fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        console.log("вы вышли из системы");
        window.location.reload();
      }
    })
    .catch((err) => console.log(err));
};

const props = defineProps({
  rightPart: Boolean,
});
</script>

<style scoped lang="scss">
@import "../assets/main.scss";

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
    width: 20px;
    display: flex;

    &::after {
      content: "...";
      font-size: 24px;
      top: 0;
      color: grey;
    }
  }
}

.modal {
  position: absolute;
  right: 0;
  top: 40px;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.295);
  transition: all ease 0.3s;
  display: flex;
  justify-content: end;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  span {
    font-size: 18px;
    padding: 10px;
    color: white;
    height: auto;
    height: 50px;
    transition: transform 0.3s ease;
    &:hover {
      scale: 1.02;
      color: #ffdb4d;
    }
  }
}
.search-icon{
  cursor: pointer;
}
</style>
