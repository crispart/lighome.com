<template>
  <svg
    class="icon"
    height="30"
    viewBox="0 0 30 24"
    width="30"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    v-html="iconPack[name]"
  >
  </svg>
</template>

<script lang="ts" setup>
import IconName from '@/constants/enum/IconName';
import IconPath from '@/constants/enum/IconPath';

const iconPack = {
  [IconName.INSTAGRAM]: IconPath.INSTAGRAM,
  [IconName.TELEGRAM]: IconPath.TELEGRAM,
};

defineProps<{ name: keyof typeof iconPack; }>();
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";

.icon {
  fill: palette.$text-primary-lighten;
  transition: fill 250ms ease;

  &:hover { fill: palette.$text-primary; }
}
</style>
