<template>
  <main class="container-fluid g-0">
    <div v-if="viewport.isGreaterThan('tablet')" class="row align-items-start">
      <SideBarDesktop class="min-vh-100 col" />
      <NuxtPage class="min-vh-100 col" />
    </div>
    <div v-else class="row align-items-start">
      <div class="col"><NuxtPage class="min-vh-100" /></div>
    </div>
  </main>
</template>
<script setup lang="ts">
import SideBarDesktop from '~/components/layout/SideBarDesktop.vue'

// eslint-disable-next-line no-undef
const viewport = useViewport()
</script>
