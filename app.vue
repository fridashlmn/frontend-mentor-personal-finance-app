<template>
  <main class="container-fluid g-0">
    <div v-if="viewport.isGreaterThan('tablet')" class="row align-items-start">
      <NavBarDesktop class="min-vh-100 col" />
      <NuxtPage class="min-vh-100 col" />
    </div>
    <div v-else class="row align-items-start">
      <NuxtPage />
      <NavBarMobile />
    </div>
  </main>
</template>
<script setup lang="ts">
import NavBarDesktop from '~/components/layout/NavBarDesktop.vue'
import NavBarMobile from '~/components/layout/NavBarMobile.vue'

// eslint-disable-next-line no-undef
const viewport = useViewport()
</script>
