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
      ],
      script: [
        {
          children: `!function(e,t,c,n,r,a,m){e.ym=e.ym||function(){(e.ym.a=e.ym.a||[]).push(arguments)},e.ym.l=1*new Date;for(var s=0;s<document.scripts.length;s++)if(document.scripts[s].src===n)return;a=t.createElement(c),m=t.getElementsByTagName(c)[0],a.async=1,a.src=n,m.parentNode.insertBefore(a,m)}(window,document,"script","https://mc.yandex.ru/metrika/tag.js"),ym(67238050,"init",{defer:!0,clickmap:!0,trackLinks:!0,accurateTrackBounce:!0,webvisor:!0});`,
          type: 'text/javascript',
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
