<template>
  <div class="error">
    <h1>404 :: Not Found</h1>
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';

useHead({ title: 'Not Found | Anastasia Tyuleneva' });
</script>

<style lang="scss" scoped>
.page {
  padding: 0 40px;
}
</style>
