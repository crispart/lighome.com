<template>
  <div class="project">
    <!-- предисловие -->
    <div class="introduction">
      <h1 class="introduction__name">{{ currentProject.name }}</h1>
      <p class="introduction__description">{{ currentProject.description }}</p>
    </div>
    <!-- галерея -->
    <div class="showcase">
      <div
        v-for="image in currentProject.images"
        :key="image.name"
        :style="{ width: `${100 / 12 * image.size}%` }"
        class="showcase__wrapper"
      >
        <img
          :alt="image.description"
          :src="`/img/project/${currentProject.path}/${image.name}.jpg`"
          class="showcase__wrapper__image"
        >
        <div class="showcase__wrapper__cover"></div>
      </div>
    </div>
    <!-- другие проекты -->
    <div class="other">
      <p class="other__label">Other projects</p>
      <div class="other__projects">
        <ProjectCover
          :name="previousProject.name"
          :path="previousProject.path"
          :sphere="previousProject.sphere"
        />
        <ProjectCover
          :name="nextProject.name"
          :path="nextProject.path"
          :sphere="nextProject.sphere"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { computed } from '@vue/reactivity';
import { get } from '@vueuse/core';
import DesignProject from '~/constants/DesignProject';
import ProjectInterface from '~/models/interfaces/ProjectInterface';

const route = useRoute();

const currentProjectIndex = computed<number>(() => {
  const LAST_ROUTE_ARRAY_PART = 2;
  const projectPath = route.path.split('/')[LAST_ROUTE_ARRAY_PART];
  for (let i = 0; i < DesignProject.length; i++) {
    if (DesignProject[i].path === projectPath) {
      return i;
    }
  }
  return 0;
});

const previousProjectIndex = computed<number>(() => (
  get(currentProjectIndex) === 0 ? DesignProject.length - 1 : get(currentProjectIndex) - 1
));

const nextProjectIndex = computed<number>(() => (
  get(currentProjectIndex) === DesignProject.length - 1 ? 0 : get(currentProjectIndex) + 1
));

const currentProject = computed<ProjectInterface>(() => (DesignProject[get(currentProjectIndex)]));

const previousProject = computed<ProjectInterface>(() => (DesignProject[get(previousProjectIndex)]));

const nextProject = computed<ProjectInterface>(() => (DesignProject[get(nextProjectIndex)]));
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";
@use "@/assets/sass/fragments/mq";

.project {
  @media screen and (min-width: mq.$tablet) { padding: 0 4%; }

  .introduction {
    margin: auto;
    width: 100%;
    max-width: 620px;
    padding: 30px 30px 80px 30px;
    text-align: center;

    &__name {
      margin: 0 0 20px 0;
      font-size: 22px;
      color: palette.$text-primary;
    }

    &__description { margin: 0; }
  }

  .showcase {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 10px);
    margin: -10px -5px;

    &__wrapper {
      position: relative;
      display: flex;
      padding: 10px 5px;

      @media screen and (max-width: mq.$phone) { width: 100% !important; }

      &__image {
        object-fit: cover;
        width: 100%;
      }

      &__cover {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
  }

  .other {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 60px 0 0 0;

    &__label {
      margin-bottom: 30px;
      color: palette.$text-primary;

      @media screen and (max-width: mq.$tablet) { padding: 0 4%; }
    }

    &__projects {
      display: grid;
      column-gap: 6px;
      row-gap: 6px;

      @media screen and (max-width: mq.$phone) { grid-template-columns: 1fr; }

      @media screen and (min-width: mq.$phone) { grid-template-columns: repeat(2, 1fr); }
    }
  }
}
</style>
