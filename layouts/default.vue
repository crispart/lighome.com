<template>
  <div class="layout">
    <TheHeader/>
    <main>
      <slot/>
    </main>
    <TheFooter/>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { watch } from '@vue/runtime-core';

const route = useRoute();

watch(
  () => route.path,
  () => (window.scrollTo(0, 0)),
);
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: 160px calc(100% - 160px - 160px) 160px;
  min-height: 100%;
  max-width: 1920px;
  margin: 0 auto;
}
</style>
