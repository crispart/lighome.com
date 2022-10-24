<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    fill="none"
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
  [IconName.ADD]: IconPath.ADD,
  [IconName.CLOSE_CIRCLE]: IconPath.CLOSE_CIRCLE,
  [IconName.CLOSE_SQUARE]: IconPath.CLOSE_SQUARE,
  [IconName.INSTAGRAM]: IconPath.INSTAGRAM,
  [IconName.MENU]: IconPath.MENU,
  [IconName.SEND_2]: IconPath.SEND_2,
};

defineProps<{ name: keyof typeof iconPack; }>();
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";

.icon {
  stroke: palette.$text-primary-lighten;
  transition: stroke 250ms ease;

  &:hover { stroke: palette.$text-primary; }
}
</style>
