<template>
  <div class="app">
    <div class="content-app">
      <aside >
        <div class="logo">
          <logo-icon />
        </div>
        <div class="menu">
          <friends-icon @click="goFriends" class="menu__item" />
          <call-icon class="menu__item" />
          <messages-icon
            @click="goMessages"
            class="menu__item menu__item--active"
          />
          <settings-icon class="menu__item" />
        </div>
      </aside>
      <main v-if="!store.isAuthorization" style="width: 100%">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component class="app__component" :is="Component" />
          </keep-alive>
        </router-view>
      </main>
      <div v-if="store.isAuthorization" class="authorization">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./stores";
import LogoIcon from "@/components/ui/LogoIcon.vue";
import FriendsIcon from "@/components/ui/FriendsIcon.vue";
import CallIcon from "@/components/ui/CallIcon.vue";
import MessagesIcon from "@/components/ui/MessagesIcon.vue";
import SettingsIcon from "@/components/ui/SettingsIcon.vue";

const store = useStore();
const router = useRouter();
const isAuthorization = computed(() => {
  return store.isAuthorization
})



const goFriends = () => {
  router.push('/friends')
}

const goMessages = () => {
  router.push('/messages')
}

onMounted(() => {
  router.push("/login");
  
});
</script>

<style scoped lang="scss">
aside {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.3), transparent);
  }
}
.app {
  padding: 0 70px;
  width: 100%;

  &__component {
    height: 100%;
  }
}
.authorization {
  width: 100%;
}
.content-app {
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid black;
  height: 650px;
  display: flex;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.15);
}
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: auto;
  margin-bottom: auto;

  &__item {
    cursor: pointer;
    transition: scale 0.3s ease;

    &:hover {
      scale: 1.06;

      * {
        fill: rgb(255, 255, 255);
      }
    }
    &:active {
      scale: 1.03;
      * {
        fill: rgb(172, 172, 172);
      }
    }

    &--active {
      scale: 1.05;
      * {
        fill: rgb(172, 172, 172);
      }
    }
  }
}
</style>
