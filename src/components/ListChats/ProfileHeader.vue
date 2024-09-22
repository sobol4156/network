<template>
  <div class="profile-header">
    <img
      class="profile-header__avatar"
      src="https://www.koc.lt/images_mod/animation/background_4.jpg"
      alt="Avatar"
      width="50"
      height="50"
    />
    <div class="profile-header__user">
      <span class="profile-header__user-name">Alex Sobol</span>
      <span class="profile-header__user-post">FullStack Developer</span>
    </div>
    <div class="profile-header__more"></div>
  </div>
</template>

<style scoped lang="scss">
.profile-header {
  padding: 20px 10px;
  display: flex;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 4px;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
  }

  &__avatar {
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
  }
  &__user {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    &-name {
    }

    &-post {
      color: rgba(139, 139, 139, 0.65);
    }
  }
  &__more {
    cursor: pointer;
    position: relative;

    &::before {
      content: "...";

      font-size: 24px;
      top: 0;
      color: grey;
    }
  }
}
</style>
