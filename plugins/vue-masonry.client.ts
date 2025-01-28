import masonry from 'masonry-layout'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('masonry', masonry)
})
