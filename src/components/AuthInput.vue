<template>
  <input
    class="auth-input"
    :type="type"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  modelValue: string;
  type?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  
  if (target) {
    emit('update:modelValue', target.value);
  }
};
</script>

<style scoped lang="scss">
input {
  padding: 12px 20px;
  font-size: 25px;
  border-width: 0;
  border-style: solid;
  border-color: white;
  border-radius: 6px;
  outline: transparent;
  width: 100%;
  transition: border-color 0.2s ease;
}
</style>
