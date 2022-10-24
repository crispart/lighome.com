<template>
  <div class="portfolio">
    <ProjectCover
      v-for="project in projects"
      :key="project.name"
      :description="project.description"
      :project="project.name"
      class="portfolio__project"
    />
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import ProjectInterface from '@/models/interfaces/ProjectInterface';

useHead({ title: 'Portfolio | Anastasia Tyuleneva' });

const projects: Array<ProjectInterface> = [
  {
    name: 'collage',
    description: 'Collage',
  },
  {
    name: 'whiskey',
    description: 'Whiskey',
  },
  {
    name: 'wine',
    description: 'Wine',
  },
  {
    name: 'faina',
    description: 'Faina',
  },
  {
    name: 'font',
    description: 'Font',
  },
  {
    name: 'trid',
    description: 'Trid',
  },
];
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

  &__project { width: 100%; }
}
</style>
