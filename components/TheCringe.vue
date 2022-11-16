<template>
  <img
    v-if="isCringeModeEnabled"
    :src="`/img/cringe/image-0${cringePhotoIndex}.jpg`"
    :style="{
      left: `${x + 5}px`,
      top: `${y + 5}px`,
    }"
    alt="Cringe"
    class="the-cringe"
    width="100"
    height="100"
  >
</template>

<script lang="ts" setup>
import { get, useMagicKeys, useMouse } from '@vueuse/core';
import { watchEffect } from '@vue/runtime-core';
import { ref } from '@vue/reactivity';
import { set } from '@vueuse/shared';

const { x, y } = useMouse({ touch: false });
const { control, alt, c } = useMagicKeys();

const isCringeModeEnabled = ref<boolean>(false);
const cringePhotoIndex = ref<number>(1);

const getRandomNumber = (min: number, max: number): number => (Math.floor(Math.random() * (max - min + 1) + min));

(function changeCringePhoto(): void {
  setTimeout(() => {
    set(cringePhotoIndex, getRandomNumber(1, 2));
    changeCringePhoto();
  }, getRandomNumber(1, 10) * 100);
}());

watchEffect(() => {
  if (get(control) && get(alt) && get(c)) {
    set(isCringeModeEnabled, !get(isCringeModeEnabled));
  }
});
</script>

<style lang="scss" scoped>
.the-cringe {
  position: fixed;
  border-radius: 10px;
}
</style>
