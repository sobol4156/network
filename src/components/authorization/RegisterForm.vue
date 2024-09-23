<template>
  <div class="register-form">
    <form class="data-form">
      <label for="name">Name:</label>
      <auth-input v-model="name" />
      <label for="email">Email:</label>
      <auth-input v-model="email" />
      <label for="password">Password:</label>
      <auth-input v-model="password" type="password" />
    </form>
    <auth-button @click.prevent="sendData">Register</auth-button>
    <router-link class="register-form__link" to="/login"
      ><span>Уже есть учетная запись?</span></router-link
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import AuthInput from "../AuthInput.vue";
import AuthButton from "../AuthButton.vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import { API_POST } from "@/api";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");

const sendData = async () => {
  const dataRegister = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  console.log(dataRegister);
  const response = await API_POST("/auth/register", dataRegister);

  if (response.status) {
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }
};
</script>
<style scoped lang="scss">
.register-form {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-direction: column;

  &__link {
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
