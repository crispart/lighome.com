// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    shim: false
  },
  css: [
    '/node_modules/modern-normalize/modern-normalize.css',
    '/sass/app.scss'
  ]
})
