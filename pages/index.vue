<template>
  <div class="portfolio">
    <ProjectCover
      v-for="project in DesignProject"
      :key="project.name"
      :name="project.name"
      :path="project.path"
      :sphere="project.sphere"
      class="portfolio__project"
    />
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import DesignProject from '@/constants/DesignProject';

useHead({ title: 'Portfolio | Anastasia Tyuleneva' });
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/mq";

.portfolio {
  display: grid;
  column-gap: 6px;
  row-gap: 6px;

  @media screen and (max-width: mq.$phone) { grid-template-columns: 1fr; }

  @media screen and (min-width: mq.$phone) { grid-template-columns: repeat(2, 1fr); }

  @media screen and (min-width: mq.$tablet) { padding: 0 4%; }
}
</style>
