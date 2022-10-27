<template>
  <footer class="footer">
    <NuxtLink
      v-if="route.name !== 'about'"
      class="footer__link"
      to="/about?focus=form"
    >
      Order design
    </NuxtLink>
    <a
      v-if="route.name === 'about'"
      href="https://t.me/crispart"
    >
      Made with &nbsp;♡&nbsp; by crispart
    </a>
  </footer>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';

const route = useRoute();
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
}
</style>
