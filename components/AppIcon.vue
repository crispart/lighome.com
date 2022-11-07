<template>
  <svg
    class="icon"
    version="1.1"
    viewBox="0 0 24 24"
    :height="size"
    :width="size"
    xml:space="preserve"
    x="0px"
    y="0px"
    style="enable-background:new 0 0 24 24;"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
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

  &:hover {
    stroke: palette.$text-primary;
  }
}
</style>
