<template>
  <div class="app">
    <div class="content-app">
      <aside v-if="false">
        <div class="logo">
          <logo-icon />
        </div>
        <div class="menu">
          <friends-icon class="menu__item" />
          <call-icon class="menu__item" />
          <messages-icon class="menu__item" />
          <settings-icon class="menu__item" />
        </div>
      </aside>
      <main v-if="false" style="width: 100%">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component class="app__component" :is="Component" />
          </keep-alive>
        </router-view>
      </main>
      <div v-if="true" class="authorization">
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
import {onMounted} from 'vue'
import { useRouter } from "vue-router";
import LogoIcon from "@/components/ui/LogoIcon.vue";
import FriendsIcon from "@/components/ui/FriendsIcon.vue";
import CallIcon from "@/components/ui/CallIcon.vue";
import MessagesIcon from "@/components/ui/MessagesIcon.vue";
import SettingsIcon from "@/components/ui/SettingsIcon.vue";


const router = useRouter();

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
.authorization{
  width: 100%;
}
.content-app {
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid black;
  height: 650px;
  display: flex;
  width: 100%;
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
  }
}
</style>
