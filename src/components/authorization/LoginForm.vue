<template>
  <div class="login-form">
    <form class="data-form">
      <label for="">Email:</label>
      <auth-input/>
      <label for="">Password:</label>
      <auth-input/>
    </form>
    <auth-button>Login</auth-button>
  </div>
</template>

<script setup>
import AuthInput from '../AuthInput.vue';
import AuthButton from '../AuthButton.vue';
</script>
<style scoped lang="scss">
.login-form {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-direction: column;

  .data-form {
    display: flex;
    flex-direction: column;
    
    label{
      font-size: 30px;
    }


  }

}
</style>
