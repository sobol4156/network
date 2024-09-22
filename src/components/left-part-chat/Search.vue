<template>
  <div class="search">
    <search-icon class="search__icon" />
    <input
      class="search__input"
      type="text"
      placeholder="People groups and messages"
    />
    <plus-icon class="search__plus-icon" />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/components/ui/SearchIcon.vue";
import PlusIcon from "@/components/ui/PlusIcon.vue";
</script>

<style scoped lang="scss">
.search {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    height: 5px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
  }

  &__input {
    background: transparent;
    border: none;
    font-size: 18px;
    padding: 0 10px;
  }

  &__icon {
    cursor: pointer;
  }
  &__plus-icon {
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
