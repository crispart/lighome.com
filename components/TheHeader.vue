<template>
  <header class="navbar">
    <!-- навигационный блок -->
    <nav class="navbar__route">
      <NuxtLink
        v-for="route in AppRoute"
        :key="route.path"
        :to="route.path"
        class="navbar__route__item"
      >
        {{ route.label }}
      </NuxtLink>
    </nav>
    <!-- логотип -->
    <nav class="navbar__logo">
      <NuxtLink
        class="navbar__logo__label"
        to="/"
      >
        Anastasia Tyuleneva
      </NuxtLink>
    </nav>
    <!-- социальные сети -->
    <nav class="navbar__social">
      <a
        v-for="social in SocialNetwork"
        :key="social.icon"
        :href="social.url"
        class="navbar__social__link"
        target="_blank"
      >
        <AppIcon :name="social.icon"/>
      </a>
    </nav>
    <!-- мобильное меню -->
    <Menu class="navbar__menu"/>
  </header>
</template>

<script lang="ts" setup>
import AppRoute from '~/constants/AppRoute';
import SocialNetwork from '@/constants/SocialNetwork';
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";
@use "@/assets/sass/fragments/mq";

.navbar {
  display: grid;
  align-items: center;
  height: 160px;
  padding: 0 4%;

  @media screen and (max-width: mq.$tablet) { grid-template-columns: auto 30px; }

  @media screen and (min-width: mq.$tablet) { grid-template-columns: 1fr auto 1fr; }

  &__route {
    @media screen and (max-width: mq.$tablet) { display: none; }

    @media screen and (min-width: mq.$tablet) { display: flex; }

    &__item {
      &:not(:last-child) { margin-right: 20px; }
    }
  }

  &__logo {
    display: flex;
    justify-content: center;

    @media screen and (max-width: mq.$tablet) { margin-left: 30px; }

    &__label {
      width: 150px;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      letter-spacing: -0.5px;
      line-height: 26px;
      color: palette.$text-primary;
    }
  }

  &__social {
    @media screen and (max-width: mq.$tablet) { display: none; }

    @media screen and (min-width: mq.$tablet) {
      display: flex;
      justify-content: flex-end;
    }

    &__link {
      display: flex;
      align-items: center;

      &:not(:first-child) { margin-left: 10px; }
    }
  }

  &__menu {
    @media screen and (max-width: mq.$tablet) {
      display: flex;
      justify-content: flex-end;
    }

    @media screen and (min-width: mq.$tablet) { display: none; }
  }
}
</style>
