<template>
  <footer class="footer">
    <!-- заказать дизайн -->
    <NuxtLink
      v-if="route.name !== 'about'"
      class="footer__link"
      to="/about?focus=form"
    >
      <span class="footer__link__label">Order&nbsp;</span>
      <AppIcon
        :name="IconName.HEART_FILLED"
        :size="16"
        class="footer__link__icon"
      />
      <span class="footer__link__label">&nbsp;design</span>
    </NuxtLink>
    <!-- разработчик -->
    <a
      v-if="route.name === 'about'"
      class="footer__link"
      href="https://t.me/crispart"
    >
      <span class="footer__link__label">Made with&nbsp;</span>
      <AppIcon
        :name="IconName.HEART_OUTLINE"
        :size="16"
        class="footer__link__icon"
      />
      <span class="footer__link__label">&nbsp;by crispart</span>
    </a>
  </footer>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import IconName from '~/constants/enum/IconName';

const route = useRoute();
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;

  &__link {
    $link: &;

    &__label { transition: color 250ms ease; }

    &__icon {
      fill: palette.$text-primary-lighten;
      transition: fill 250ms ease, stroke 250ms ease;
    }

    &:hover {
      #{ $link }__label { color: palette.$text-primary; }

      #{ $link }__icon {
        stroke: palette.$text-primary;
        fill: palette.$text-primary;
      }
    }
  }
}
</style>
