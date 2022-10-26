<template>
  <div class="error">
    <h1 class="error__message">Page Not Found</h1>
    <NuxtLink to="/">Come back home</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';

useHead({ title: 'Not Found | Anastasia Tyuleneva' });
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 40px;

  &__message {
    font-size: 48px;
    color: palette.$text-primary;
  }
}
</style>
