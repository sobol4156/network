<template>
  <button class="auth-btn"><slot></slot></button>
</template>
<style scoped lang="scss">
  .auth-btn {
      margin-top: 20px;
      background-color: #4c4fea;
      border-radius: 8px;
      border-style: none;
      box-sizing: border-box;
      color: #ffffff;
      cursor: pointer;
      display: inline-block;
      font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
        sans-serif;
      font-size: 22px;
      font-weight: 500;
      
      line-height: 20px;
      list-style: none;
      
      font-weight: 700;
      outline: none;
      padding: 16px 32px;
      position: relative;
      text-align: center;
      text-decoration: none;
      transition: color 100ms;
      vertical-align: baseline;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;

      &:hover,
      &:focus {
        background-color: #5490df;
      }
    }
</style>