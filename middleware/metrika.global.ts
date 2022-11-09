import { defineNuxtRouteMiddleware } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client && typeof ym !== 'undefined') {
    ym(67238050, 'hit', to.fullPath, {
      title: to.name,
      referer: from.fullPath,
    });
  }
});
