<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    fill="none"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    v-html="IconPath[name]"
  >
  </svg>
</template>

<script lang="ts" setup>
import IconPath from '@/constants/enum/IconPath';

defineProps<{ name: keyof typeof IconPath; }>();
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";

.icon {
  stroke: palette.$text-primary-lighten;
  transition: stroke 250ms ease;

  &:hover { stroke: palette.$text-primary; }
}
</style>
