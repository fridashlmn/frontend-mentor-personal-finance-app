<template>
  <main class="container-fluid g-0">
    <div v-if="viewport.isGreaterThan('tablet')" class="row">
      <NavBarDesktop class="min-vh-100 col-2-5" />
      <NuxtPage class="min-vh-100 col" />
    </div>
    <template v-else>
      <NuxtPage />
      <NavBarMobile />
    </template>
  </main>
</template>
<script setup lang="ts">
import NavBarDesktop from '~/components/layout/NavBarDesktop.vue'
import NavBarMobile from '~/components/layout/NavBarMobile.vue'
import { onMounted } from 'vue'
import data from '~/content/data.json'
import type { Budget, Pot } from '~/@types/types'

// eslint-disable-next-line no-undef
const viewport = useViewport()

onMounted(() => {
  // eslint-disable-next-line no-undef
  if (process.browser) {
    data.budgets.sort((a: Budget, b: Budget) =>
      a.category.localeCompare(b.category),
    )
    data.pots.sort((a: Pot, b: Pot) => a.name.localeCompare(b.name))
    localStorage.setItem('budgets', JSON.stringify(data.budgets))
    localStorage.setItem('pots', JSON.stringify(data.pots))
    localStorage.setItem('transactions', JSON.stringify(data.transactions))
    localStorage.setItem('balance', JSON.stringify(data.balance))
  }
})
</script>
