<template>
  <nav
    class="desktopSidebar rounded-end-4 bg-grey-900 testContainer d-flex flex-column justify-content-between align-items-baseline pb-6"
  >
    <div :class="!isMenuCollapsed ? 'w-100' : ''">
      <div class="pt-8 pb-8 px-7">
        <NuxtLink to="/">
          <LogoSmall v-if="isMenuCollapsed" />
          <LogoLarge v-else />
        </NuxtLink>
      </div>
      <ul class="nav flex-column justify-content-start pt-6 me-6">
        <li v-for="item in navigationItems" :key="item.label">
          <NuxtLink
            :to="item.link"
            class="d-flex px-7 pt-4 pb-4 align-items-center text-beige-100 fw-bold text-decoration-none h-6"
            activeClass="activeClass rounded-end-3 border-start border-5 border-green"
          >
            <component
              v-if="item.icon"
              :is="item.icon"
              class="me-5"
              style="height: 1.5rem"
            />
            <span v-if="!isMenuCollapsed">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <button
      class="px-7 p-0 btn btn-link text-grey-300 text-decoration-none"
      @click="toggleSidebar()"
    >
      <IconMinimize class="rotateSvg" />
      <span v-if="!isMenuCollapsed" class="ms-5">Minimize Menu</span>
    </button>
  </nav>
</template>
<script setup lang="ts">
import LogoLarge from '~/assets/images/logo-large.svg?component'
import LogoSmall from '~/assets/images/logo-small.svg?component'
import { ref } from 'vue'
import IconMinimize from '~/assets/images/icon-minimize-menu.svg?component'
import { navigationItems } from '~/content/navigation'

const isMenuCollapsed = ref<boolean>(false)

function toggleSidebar(): void {
  const sidebar: Element | null = document.querySelector('.desktopSidebar')
  sidebar?.classList.toggle('collapsed')
  if (isMenuCollapsed.value) {
    setTimeout(() => {
      isMenuCollapsed.value = !isMenuCollapsed.value
    }, 200)
  } else {
    isMenuCollapsed.value = !isMenuCollapsed.value
  }
}
</script>
