// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('bootstrap', bootstrap)
})
