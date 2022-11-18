<template>
  <NuxtLink
    :to="`/project/${path}`"
    class="project-cover"
    @mouseenter="isDescriptionShown = true"
    @mouseleave="isDescriptionShown = false"
  >
    <!-- изображение -->
    <img
      :alt="name"
      :src="`/img/project/${path}/cover.jpg`"
      class="project-cover__image"
      loading="lazy"
    />
    <!-- затемнение -->
    <div class="project-cover__overlay"></div>
    <!-- описание -->
    <Transition name="fade-up">
      <div
        v-if="isDescriptionShown"
        class="project-cover__description"
      >
        <p class="project-cover__description__name">{{ name }}</p>
        <p class="project-cover__description__year">{{ sphere }} · {{ year }}</p>
      </div>
    </Transition>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import ProjectSphere from '~/constants/enum/ProjectSphere';

defineProps<{
  path: string,
  name: string,
  sphere: ProjectSphere;
  year: number;
}>();

const isDescriptionShown = ref<boolean>(false);
</script>

<style lang="scss" scoped>
@use '@/assets/sass/fragments/palette';
@import "@/assets/sass/transition";

.project-cover {
  position: relative;

  &__image {
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
