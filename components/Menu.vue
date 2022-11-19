<template>
  <div class="menu">
    <!-- триггер открытия -->
    <AppIcon
      :name="IconName.MENU"
      class="menu__icon"
      @click="isOverlayVisible = true"
    />
    <!-- оверлей -->
    <Transition name="fade">
      <div
        v-if="isOverlayVisible"
        class="menu__overlay"
      >
        <!-- триггер закрытия -->
        <div
          class="menu__overlay__icon"
          @click="isOverlayVisible = false"
        >
          <AppIcon
            :name="IconName.CROSS"
            class="menu__overlay__icon__item"
          />
        </div>
        <!-- навигационный блок -->
        <nav class="menu__overlay__route">
          <NuxtLink
            v-for="route in AppRoute"
            :key="route.path"
            :to="route.path"
            class="menu__overlay__route__item"
            @click="isOverlayVisible = false"
          >
            {{ route.label }}
          </NuxtLink>
        </nav>
        <!-- социальные сети -->
        <nav class="menu__overlay__social">
          <a
            v-for="social in SocialNetwork"
            :key="social.icon"
            :href="social.url"
            :title="social.icon"
            class="menu__overlay__social__link"
            target="_blank"
          >
            <AppIcon
              :name="social.icon"
              class="menu__overlay__social__link__icon"
            />
          </a>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { set } from '@vueuse/shared';
import IconName from '@/constants/enum/IconName';
import AppRoute from '~/constants/AppRoute';
import SocialNetwork from '@/constants/SocialNetwork';

const route = useRoute();

const isOverlayVisible = ref<boolean>(false);

watch(
  () => route.path,
  () => {
    set(isOverlayVisible, false);
  },
);
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";
@import "@/assets/sass/transition";

.menu {
  &__icon { cursor: pointer; }

  &__overlay {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    padding: 65px 4%;
    z-index: 1;
    background-color: palette.$app-secondary;

    &__icon {
      $icon: &;
      position: fixed;
      top: 0;
      right: 0;
      padding: 68px 4% 4% 4%;
      cursor: pointer;

      &:hover {
        #{ $icon }__item {
          stroke: palette.$text-secondary;
          transform: rotate(90deg);
        }
      }

      &__item { transition: transform 250ms ease; }
    }

    &__route {
      display: flex;
      flex-direction: column;
      text-align: center;

      &__item {
        margin-top: 5px;
        margin-bottom: 25px;
        font-size: 22px;

        &:hover,
        &.router-link-exact-active { color: palette.$text-secondary; }
      }
    }

    &__social {
      &__link {
        &:not(:first-child) { margin-left: 10px; }

        &__icon {
          &:hover { stroke: palette.$text-secondary; }
        }
      }
    }
  }
}
</style>
