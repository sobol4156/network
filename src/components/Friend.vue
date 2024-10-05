<template>
  <div class="friend">
    <img
      class="friend__image"
      src="https://fresco.wallset.ru/images/detailed/1208/3086.jpg"
      alt="Аватар"
      width="60"
      height="60"
    />
    <span class="friend__name">{{ props.user.name }}</span>
    <plus-icon v-if="!isAdded && !isLoading" class="friend__add" @click="addedUser" />
    <check-fat-icon v-else-if="isAdded" class="friend__added" />
    <span v-else class="friend__loading">Добавление...</span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CheckFatIcon from "@/components/ui/CheckFatIcon.vue";
import PlusIcon from "@/components/ui/PlusIcon.vue";
import { useStore } from "@/stores";

const store = useStore();
const props = defineProps({
  user: Object,
});

const myProfile = computed(() => store.user);
const isAdded = ref(false);
const isLoading = ref(false);

const addedUser = async () => {
  isLoading.value = true;
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/friends/add`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        idFriend: props.user.id,
        myId: myProfile.value.id,
      }),
    });

    if (response.ok) {
      isAdded.value = true;
    } else {
      console.error("Ошибка добавления друга");
    }
  } catch (error) {
    console.error("Ошибка при добавлении друга:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.friend {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 336px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -8px;
    height: 5px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
  }

  &__image {
    background-size: cover;
    border-radius: 50%;
    margin-right: 20px;
  }
  &__name {
    font-size: 18px;
    margin-right: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 20px 0;
  }

  &__add {
    cursor: pointer;
    * {
      fill: rgb(253, 253, 253);
    }
  }
  &__added {
    fill: green;
  }

  &__loading {
    font-size: 14px;
    color: grey;
  }
}
</style>
