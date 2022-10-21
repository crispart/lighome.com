<template>
  <div class="menu">
    <!-- триггер открытия -->
    <AppIcon
      class="menu__icon"
      :name="IconName.TELEGRAM"
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
            class="menu__overlay__icon__item"
            :name="IconName.TELEGRAM"
          />
        </div>
        <!-- навигационный блок -->
        <nav class="menu__overlay__route">
          <NuxtLink
            v-for="route in ProjectRoute"
            :key="route.path"
            :to="route.path"
            class="menu__overlay__route__item"
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
            class="menu__overlay__social__link"
            target="_blank"
          >
            <AppIcon
              class="menu__overlay__social__link__icon"
              :name="social.icon"
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
import ProjectRoute from '@/constants/ProjectRoute';
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
    padding: 65px 4% 4% 4%;
    z-index: 1;
    background-color: palette.$app-secondary;

    &__icon {
      $icon: &;
      position: fixed;
      top: 0;
      right: 0;
      padding: 65px 4% 4% 4%;
      cursor: pointer;

      &:hover {
        #{ $icon }__item { fill: palette.$text-secondary; }
      }
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
        &__icon {
          &:hover { fill: palette.$text-secondary; }
        }
      }
    }
  }
}
</style>
