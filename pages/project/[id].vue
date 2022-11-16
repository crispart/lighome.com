<template>
  <div class="project">
    <!-- предисловие -->
    <div class="introduction">
      <h1 class="introduction__name">{{ currentProject.name }}</h1>
      <p class="introduction__description">{{ currentProject.description }}</p>
    </div>
    <!-- сетка -->
    <div class="showcase">
      <div
        v-for="image in currentProject.images"
        :key="image.name"
        :style="{ width: `${100 / 12 * image.size}%` }"
        class="showcase__wrapper"
        @click="selectImage(image)"
      >
        <img
          :alt="image.description"
          :src="`/img/project/${currentProject.path}/${image.name}.jpg`"
          class="showcase__wrapper__image"
          loading="lazy"
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
    <!-- галерея -->
    <Transition name="fade-up">
      <div
        v-if="selectedImage"
        ref="galleryElement"
        class="gallery"
        @mousemove="controlHud"
      >
        <!-- оверлей -->
        <div
          class="gallery__overlay"
          @click="selectImage(null)"
        ></div>
        <!-- триггер закрытия -->
        <Transition name="fade-blur-slow">
          <div
            v-if="isHudShown"
            class="gallery__icon-close"
            @click="selectImage(null)"
            @mouseenter="isHudMouseOver = true"
            @mouseleave="isHudMouseOver = false"
          >
            <AppIcon
              :name="IconName.CROSS"
              class="gallery__icon-close__item"
            />
          </div>
        </Transition>
        <!-- стрелка влево -->
        <Transition name="fade-blur-slow">
          <div
            v-if="isHudShown && currentProject.images.length > 1"
            class="gallery__icon-left"
            @click="selectImage(previousImage)"
            @mouseenter="isHudMouseOver = true"
            @mouseleave="isHudMouseOver = false"
          >
            <AppIcon
              :name="IconName.ARROW_LEFT"
              class="gallery__icon-left__item"
            />
          </div>
        </Transition>
        <!-- стрелка вправо -->
        <Transition name="fade-blur-slow">
          <div
            v-if="isHudShown && currentProject.images.length > 1"
            class="gallery__icon-right"
            @click="selectImage(nextImage)"
            @mouseenter="isHudMouseOver = true"
            @mouseleave="isHudMouseOver = false"
          >
            <AppIcon
              :name="IconName.ARROW_RIGHT"
              class="gallery__icon-right__item"
            />
          </div>
        </Transition>
        <!-- индикатор загрузки -->
        <div
          v-show="isSpinnerShown"
          class="gallery__icon-spin"
        >
          <AppIcon
            :name="IconName.SPIN"
            class="gallery__icon-spin__item"
          />
        </div>
        <!-- изображение -->
        <Transition name="fade-blur-slow">
          <div
            :key="selectedImage?.name"
            class="gallery__image"
            @click="selectImage(null)"
          >
            <img
              :alt="selectedImage?.description"
              :src="`/img/project/${currentProject.path}/full-${selectedImage?.name}.jpg`"
              class="gallery__image__item"
              loading="lazy"
            >
            <div class="gallery__image__cover"></div>
          </div>
        </Transition>
        <!-- скрытый альбом | todo: найти аналог prefetch, работающий в сафари -->
        <div v-show="false">
          <img
            v-for="image in currentProject.images"
            :key="image.name"
            :alt="image.description"
            :src="`/img/project/${currentProject.path}/full-${image.name}.jpg`"
            class="gallery__album__image__item"
            height="0"
            loading="eager"
            width="0"
            @abort="isSpinnerShown = false"
            @error="isSpinnerShown = false"
            @load="isSpinnerShown = false"
            @loadstart="isSpinnerShown = true"
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { computed, ref } from '@vue/reactivity';
import { get, useDebounceFn, useMagicKeys, useThrottleFn } from '@vueuse/core';
import DesignProject from '~/constants/DesignProject';
import ProjectInterface from '~/models/interfaces/ProjectInterface';
import IconName from '~/constants/enum/IconName';
import ProjectImageInterface from '~/models/interfaces/ProjectImageInterface';
import { set } from '@vueuse/shared';
import { watchEffect } from '@vue/runtime-core';

const route = useRoute();

// текущий проект

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

const currentProject = computed<ProjectInterface>(() => (DesignProject[get(currentProjectIndex)]));

// другие проекты

const previousProjectIndex = computed<number>(() => (
  get(currentProjectIndex) === 0 ? DesignProject.length - 1 : get(currentProjectIndex) - 1
));

const nextProjectIndex = computed<number>(() => (
  get(currentProjectIndex) === DesignProject.length - 1 ? 0 : get(currentProjectIndex) + 1
));

const previousProject = computed<ProjectInterface>(() => (DesignProject[get(previousProjectIndex)]));

const nextProject = computed<ProjectInterface>(() => (DesignProject[get(nextProjectIndex)]));

// галерея изображений

const selectedImage = ref<ProjectImageInterface | null>(null);

const selectedImageIndex = computed<number>(() => {
  for (let i = 0; i < get(currentProject).images.length; i++) {
    if (get(currentProject).images[i].name === get(selectedImage)?.name) {
      return i;
    }
  }
  return 0;
});

const previousImageIndex = computed<number>(() => (
  get(selectedImageIndex) === 0 ? get(currentProject).images.length - 1 : get(selectedImageIndex) - 1
));

const nextImageIndex = computed<number>(() => (
  get(selectedImageIndex) === get(currentProject).images.length - 1 ? 0 : get(selectedImageIndex) + 1
));

const previousImage = computed<ProjectImageInterface>(() => (
  get(currentProject).images[get(previousImageIndex)]),
);

const nextImage = computed<ProjectImageInterface>(() => (
  get(currentProject).images[get(nextImageIndex)]),
);

// управление спиннером

const isSpinnerShown = ref<boolean>(true);

// автоскрытие при бездействии

const isHudShown = ref<boolean>(true);
const isHudMouseOver = ref<boolean>(false);

const showHudThrottled = useThrottleFn(() => {
  set(isHudShown, true);
}, 100);

const hideHudDebounced = useDebounceFn(() => {
  if (get(selectedImage) && !get(isHudMouseOver)) {
    set(isHudShown, false);
  }
}, 2000);

const controlHud = (): void => {
  showHudThrottled();
  hideHudDebounced();
};

const selectImage = (image: ProjectImageInterface | null): void => {
  set(selectedImage, image);
  controlHud();
};

// навигация стрелками

const { arrowLeft, arrowRight, escape } = useMagicKeys();

watchEffect(() => {
  if (get(arrowLeft)) {
    selectImage(get(previousImage));
  }
  if (get(arrowRight)) {
    selectImage(get(nextImage));
  }
  if (get(escape)) {
    selectImage(null);
  }
});
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";
@use "@/assets/sass/fragments/mq";
@import "@/assets/sass/transition";

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
    margin: -3px;

    &__wrapper {
      position: relative;
      display: flex;
      padding: 3px;

      @media screen and (max-width: mq.$phone) { width: 100% !important; }

      &__image {
        object-fit: cover;
        width: 100%;
      }

      &__cover {
        position: absolute;
        width: calc(100% - 10px);
        height: calc(100% - 20px);
        left: 5px;
        top: 10px;
        cursor: zoom-in;
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

  .gallery {
    position: fixed;
    display: flex;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    user-select: none;

    @media (hover: none) and (pointer: coarse) { display: none }

    &__overlay {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      cursor: pointer;
      background-color: palette.$app-secondary-alpha;
    }

    &__icon-close,
    &__icon-left,
    &__icon-right,
    &__icon-spin {
      position: fixed;
      top: 0;
      padding: 68px 4% 4% 4%;
      cursor: pointer;

      &:hover {
        ::v-deep(.icon) { stroke: palette.$text-secondary; }
      }
    }

    &__icon-close {
      right: 0;
      z-index: 2;

      &:hover {
        ::v-deep(.icon) { transform: rotate(90deg); }
      }

      &__item { transition: transform 250ms ease; }
    }

    &__icon-left,
    &__icon-right,
    &__icon-spin {
      display: flex;
      align-items: center;
      height: 100%;
      z-index: 1;

      &__item { transition: transform 250ms ease; }
    }

    &__icon-left {
      left: 0;

      &:hover {
        ::v-deep(.icon) { transform: translateX(-20px); }
      }
    }

    &__icon-right {
      right: 0;

      &:hover {
        ::v-deep(.icon) { transform: translateX(20px); }
      }
    }

    &__icon-spin {
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;

      &__item { animation: spin 1000ms linear infinite; }
    }

    &__image {
      position: fixed;
      max-height: 100%;
      max-width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: auto;

      &__item {
        max-height: 100vh;
        max-width: 100vw;
      }

      &__cover {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
