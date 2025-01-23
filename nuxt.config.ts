import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  css: ['~/assets/css/main.scss'],

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          api: 'modern-compiler',
          silenceDeprecations: ['mixed-decls'],
        },
        sass: {
          quietDeps: true,
          silenceDeprecations: ['mixed-decls'],
        },
      },
    },
    plugins: [svgLoader()],
    optimizeDeps: {
      include: ['fast-deep-equal'],
    },
  },
})
