<template>
  <div class="page">
    <div class="page__error">
      <h1
        class="page__error__message"
        :title="error.message"
      >
        {{ error.statusCode === 404 ? 'Page not found' : error.statusMessage }}
      </h1>
      <NuxtLink to="/">Come back home</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';

useHead({ title: 'Not Found | Anastasia Tyuleneva' });

defineProps({ error: Object });
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";

.page {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  &__error {
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
}
</style>
