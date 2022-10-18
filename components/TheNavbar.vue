<template>
  <nav class="navbar">
    <NuxtLink class="navbar__logo" to="/">LigHome</NuxtLink>
    <NuxtLink to="/">Portfolio</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
@use "@/sass/fragments/palette";

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  width: 100%;
  padding: 0 30px;
  background-color: palette.$app-primary-alpha;

  &__logo {
    font-size: 32px;
    font-weight: 900;
  }
}
</style>
