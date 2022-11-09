<template>
  <svg
    :height="size"
    :width="size"
    class="icon"
    style="enable-background:new 0 0 24 24;"
    version="1.1"
    viewBox="0 0 24 24"
    x="0px"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    y="0px"
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
