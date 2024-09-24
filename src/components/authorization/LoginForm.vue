<template>
  <div class="login-form">
    <form class="data-form">
      <label for="">Email:</label>
      <auth-input v-model="email" />
      <label for="">Password:</label>
      <auth-input v-model="password" />
    </form>
    <auth-button @click.prevent="sendData">Login</auth-button>
    <router-link class="login-form__link" to="/register"
      ><span>Нет учетной записи?</span></router-link
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import AuthInput from "../AuthInput.vue";
import AuthButton from "../AuthButton.vue";
import { RouterLink } from "vue-router";
import { API_POST } from "@/api";
import { useStore } from "@/stores";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const sendData = async() =>{
 const loginData = {
    email: email.value,
    password: password.value
  }

 const response = await API_POST('/auth/login', loginData)

 if(response.data.success){
  store.changeAuthorization(true)
  router.push('/messages')
 }
}
</script>
<style scoped lang="scss">
.login-form {
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
