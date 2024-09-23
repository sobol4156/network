<template>
  <div class="register-form">
    <form class="data-form">
      <label for="">Name:</label>
      <auth-input />
      <label for="">Email:</label>
      <auth-input />
      <label for="">Password:</label>
      <auth-input />
    </form>
    <auth-button>Register</auth-button>
    <router-link class="register-form__link"  to="/login"><span>Уже есть учетная запись?</span></router-link>
  </div>
</template>

<script setup>
import AuthInput from "../AuthInput.vue";
import AuthButton from "../AuthButton.vue";
import { RouterLink } from "vue-router";

</script>
<style scoped lang="scss">
.register-form {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-direction: column;

  &__link{
    margin-top: 10px;
    text-decoration: none;
    color: beige;
  }

  .data-form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 30px;
    }
  }
}
</style>
