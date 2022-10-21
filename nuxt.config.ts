// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Anastasia Tyuleneva',
      meta: [
        {
          name: 'keywords',
          content:
            'Портфолио графического дизайнера Анастасии Тюленевой. Заказать дизайн-проект. Заказать услуги графического дизайнера. Заказать услуги веб-дизайнера.'
        },
        {
          name: 'description',
          content:
            'Портфолио графического дизайнера Анастасии Тюленевой. Заказать дизайн-проект. Заказать услуги графического дизайнера. Заказать услуги веб-дизайнера.'
        }
      ]
    }
  },
  typescript: {
    strict: true,
    shim: false
  },
  css: [
    '/node_modules/modern-normalize/modern-normalize.css',
    '/assets/sass/app.scss'
  ]
})
