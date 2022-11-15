<template>
  <svg
    :height="size"
    :width="size"
    class="icon"
    viewBox="0 0 24 24"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    v-html="IconPath[name]"
  >
  </svg>
</template>

<script lang="ts" setup>
import IconPath from '@/constants/enum/IconPath';

withDefaults(
  defineProps<{
    name: keyof typeof IconPath;
    size?: number;
  }>(),
  { size: 24 },
);
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";

.icon {
  fill: transparent;
  stroke: palette.$text-primary-lighten;
  transition: stroke 250ms ease;

  &:hover { stroke: palette.$text-primary; }
}
</style>
