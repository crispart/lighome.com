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
        v-for="gridItem in currentProject.grid"
        :key="gridItem.name"
        :style="{ width: `${100 / 12 * gridItem.size}%` }"
        class="showcase__wrapper"
        @click="selectGridItem(gridItem.type === ProjectGridItemType.IMAGE ? gridItem : null)"
      >
        <!-- изображение -->
        <img
          v-if="gridItem.type !== ProjectGridItemType.VIDEO"
          :alt="gridItem.description"
          :src="`/img/project/${currentProject.path}/${gridItem.name}.jpg`"
          class="showcase__wrapper__image"
          loading="lazy"
        >
        <div
          :class="{'showcase__wrapper__cover--masked': gridItem.hasMask}"
          class="showcase__wrapper__cover"
        ></div>
        <!-- видео -->
        <video
          v-if="gridItem.type === ProjectGridItemType.VIDEO"
          :src="`/img/project/${currentProject.path}/${gridItem.name}.mp4`"
          class="showcase__wrapper__video"
          controls
          controlslist="nodownload"
          disablepictureinpicture
          playsinline
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
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
          :year="previousProject.year"
        />
        <ProjectCover
          :name="nextProject.name"
          :path="nextProject.path"
          :sphere="nextProject.sphere"
          :year="nextProject.year"
        />
      </div>
    </div>
    <!-- галерея -->
    <Transition name="fade-up">
      <div
        v-if="selectedImage"
        ref="galleryElement"
        v-overflow
        class="gallery"
        @mousemove="controlHud"
      >
        <!-- оверлей -->
        <div
          class="gallery__overlay"
          @click="selectGridItem(null)"
        ></div>
        <!-- триггер закрытия -->
        <Transition name="fade-blur-slow">
          <div
            v-if="isHudShown"
            class="gallery__icon-close"
            @click="selectGridItem(null)"
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
            v-if="isHudShown && currentProjectImages.length > 1"
            class="gallery__icon-left"
            @click="selectGridItem(previousImage)"
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
            v-if="isHudShown && currentProjectImages.length > 1"
            class="gallery__icon-right"
            @click="selectGridItem(nextImage)"
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
        <Transition name="fade-blur-slow">
          <div
            v-show="isSpinnerShown"
            class="gallery__icon-spin"
          >
            <AppIcon
              :name="IconName.SPIN"
              class="gallery__icon-spin__item"
            />
          </div>
        </Transition>
        <!-- изображение -->
        <Transition name="fade-blur-slow">
          <div
            :key="selectedImage?.name"
            class="gallery__image"
            @click="selectGridItem(null)"
          >
            <img
              :alt="selectedImage?.description"
              :src="`/img/project/${currentProject.path}/full-${selectedImage?.name}.jpg`"
              class="gallery__image__item"
              loading="eager"
              @abort="isSpinnerShown = false"
              @error="isSpinnerShown = false"
              @load="isSpinnerShown = false"
            >
            <div class="gallery__image__cover"></div>
          </div>
        </Transition>
        <!-- предзагрузка изображений | todo: найти аналог prefetch, работающий в сафари -->
        <div v-show="false">
          <!-- предыдущее изображение -->
          <img
            :alt="previousImage.description"
            :src="`/img/project/${currentProject.path}/full-${previousImage.name}.jpg`"
            loading="eager"
          >
          <!-- следующее изображение -->
          <img
            :alt="nextImage.description"
            :src="`/img/project/${currentProject.path}/full-${nextImage.name}.jpg`"
            loading="eager"
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { computed, ref } from '@vue/reactivity';
import { get, useDebounceFn, useMagicKeys, useSwipe, useThrottleFn } from '@vueuse/core';
import DesignProject from '~/constants/DesignProject';
import ProjectInterface from '~/models/interfaces/ProjectInterface';
import IconName from '~/constants/enum/IconName';
import ProjectGridItemInterface from '~/models/interfaces/ProjectGridItemInterface';
import { set } from '@vueuse/shared';
import { watch, watchEffect } from '@vue/runtime-core';
import ProjectGridItemType from '~/constants/enum/ProjectGridItemType';
import SwipeDirection from '~/constants/enum/SwipeDirection';

const route = useRoute();

// директива для скрытия полос прокрутки

const vOverflow = {
  mounted: () => (document.documentElement.style.overflow = 'hidden'),
  unmounted: () => (document.documentElement.style.overflow = 'auto'),
};

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

const currentProjectImages = computed<Array<ProjectGridItemInterface>>(() => {
  return get(currentProject).grid.filter(({ type }) => (type === ProjectGridItemType.IMAGE));
});

const selectedImage = ref<ProjectGridItemInterface | null>(null);

const selectedImageIndex = computed<number>(() => {
  for (let i = 0; i < get(currentProjectImages).length; i++) {
    if (get(currentProjectImages)[i].name === get(selectedImage)?.name) {
      return i;
    }
  }
  return 0;
});

const previousImageIndex = computed<number>(() => (
  get(selectedImageIndex) === 0 ? get(currentProjectImages).length - 1 : get(selectedImageIndex) - 1
));

const nextImageIndex = computed<number>(() => (
  get(selectedImageIndex) === get(currentProjectImages).length - 1 ? 0 : get(selectedImageIndex) + 1
));

const previousImage = computed<ProjectGridItemInterface>(() => (
  get(currentProjectImages)[get(previousImageIndex)]),
);

const nextImage = computed<ProjectGridItemInterface>(() => (
  get(currentProjectImages)[get(nextImageIndex)]),
);

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

const selectGridItem = (gridItem: ProjectGridItemInterface | null): void => {
  if (gridItem?.type === ProjectGridItemType.VIDEO) {
    return;
  }
  set(selectedImage, gridItem);
  controlHud();
};

// навигация стрелками

const { arrowLeft, arrowRight, escape } = useMagicKeys();

watchEffect(() => {
  if (get(arrowLeft)) {
    selectGridItem(get(previousImage));
  }
  if (get(arrowRight)) {
    selectGridItem(get(nextImage));
  }
  if (get(escape)) {
    selectGridItem(null);
  }
});

// обработка тач-эвентов

const galleryElement = ref<HTMLDivElement | null>(null);

const { isSwiping, direction: swipeDirection } = useSwipe(galleryElement);

watch(
  () => (get(isSwiping)),
  () => {
    if (!get(isSwiping)) {
      return;
    }
    if (get(swipeDirection) === SwipeDirection.LEFT) {
      selectGridItem(get(nextImage));
    } else if (get(swipeDirection) === SwipeDirection.RIGHT) {
      selectGridItem(get(previousImage));
    }
  },
);

// управление спиннером

const isSpinnerShown = ref<boolean>(true);

watch(
  () => (get(selectedImage)?.name),
  () => (set(isSpinnerShown, true)),
);
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
    width: calc(100% + 6px);
    margin: -3px;

    @media screen and (max-width: mq.$phone) {
      width: 100%;
      margin: 0;
    }

    &__wrapper {
      position: relative;
      display: flex;
      padding: 3px;

      @media screen and (max-width: mq.$phone) {
        width: 100% !important;
        padding: 3px 0;
      }

      &__image,
      &__video {
        object-fit: cover;
        width: 100%;
      }

      &__video { cursor: pointer; }

      &__cover {
        position: absolute;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        left: 3px;
        top: 3px;
        cursor: zoom-in;

        &--masked { background-color: palette.$app-primary-alpha }
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

    &__icon-left,
    &__icon-right {
      @media (hover: none) and (pointer: coarse) { display: none }
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
