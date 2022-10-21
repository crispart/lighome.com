<template>
  <div
    class="project"
    @mouseenter="isDescriptionShown = true"
    @mouseleave="isDescriptionShown = false"
  >
    <!-- изображение -->
    <img
      :alt="description"
      :src="`/img/project/${project}/cover.jpg`"
      class="project__cover"
    />
    <!-- затемнение -->
    <div class="project__overlay"></div>
    <!-- описание -->
    <Transition name="fade-up">
      <div
        v-if="isDescriptionShown"
        class="project__description"
      >
        <p class="project__description__name">{{ description }}</p>
        <p class="project__description__year">2022</p>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';

defineProps<{
  project: string,
  description: string;
}>();

const isDescriptionShown = ref<boolean>(false);
</script>

<style lang="scss" scoped>
@use '@/assets/sass/fragments/palette';
@import "@/assets/sass/transition";

.project {
  position: relative;
  cursor: pointer;

  &__cover {
    height: 100%;
    width: 100%;
  }

  &__overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    opacity: 0;
    background-color: palette.$app-secondary;
    transition: opacity 250ms ease;

    &:hover { opacity: .9; }
  }

  &__description {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    top: 0;
    pointer-events: none;

    &__name {
      margin: 0;
      font-weight: 700;
      font-size: 24px;
      color: palette.$text-secondary;
    }

    &__year {
      margin: 6px 0 0 0;
      color: palette.$text-secondary-darken;
    }
  }
}
</style>
