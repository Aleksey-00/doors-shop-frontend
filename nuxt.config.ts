// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-11',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Магазин входных дверей евро качества',
      titleTemplate: '%s | Евро Двери - магазин входных дверей',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Магазин входных дверей европейского качества. Большой выбор дверей премиум класса, стандарт и эконом. Доставка по всей России.' },
        { name: 'keywords', content: 'двери, входные двери, купить двери, евро двери, премиум двери, установка дверей' },
        { property: 'og:title', content: 'Магазин входных дверей евро качества' },
        { property: 'og:description', content: 'Магазин входных дверей европейского качества. Большой выбор дверей премиум класса, стандарт и эконом.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
        { rel: 'canonical', href: 'https://your-domain.com' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts'
  ],
  image: {
    provider: 'ipx',
    dir: 'public/images',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    presets: {
      door: {
        modifiers: {
          format: 'webp',
          quality: 80,
          loading: 'lazy',
          width: 400,
          height: 600
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          quality: 70,
          loading: 'lazy',
          width: 200,
          height: 300
        }
      }
    }
  },
  googleFonts: {
    families: {
      Roboto: [400, 500, 700],
      'Open Sans': [400, 600]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true
  },
  site: {
    url: 'https://your-domain.com'
  },
  sitemap: {
    urls: [
      '/',
      '/about',
      '/catalog',
      '/blog',
      '/faq',
      '/reviews',
      '/contacts',
      '/products',
      '/cart'
    ]
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
    timing: true,
    devProxy: {
      '/api': {
        target: process.env.API_BASE_URL || 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  tailwindcss: {
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue'
      ]
    }
  }
})