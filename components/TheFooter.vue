<template>
  <div class="footer">
    <span>© 2014-2022 Anastasia Tyuleneva, All rights reserved</span>
    <span>with ♡ by <a href="https://t.me/crispart">crispart</a></span>
  </div>
</template>

<style scoped lang="scss">
@use "@/sass/fragments/palette";

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  width: 100%;
  margin-top: 40px;
  padding: 0 30px;
  background-color: palette.$app-primary-darken;
}
</style>
