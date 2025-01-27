<template>
  <nav
    class="col-2-5 sidebar rounded-end-4 bg-grey-900 min-vh-100 d-flex flex-column justify-content-between align-items-baseline pb-6"
  >
    <div :class="!isMenuCollapsed ? 'w-100' : ''">
      <div class="pt-8 pb-8 px-7">
        <LogoSmall v-if="isMenuCollapsed" />
        <LogoLarge v-else />
      </div>
      <ul class="nav flex-column justify-content-start pt-6 me-6">
        <li v-for="item in navigationItems" :key="item.label" class="link-item">
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
  const sidebar: Element | null = document.querySelector('.sidebar')
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
<style lang="scss">
@import 'assets/css/variables';
body {
  overflow-x: hidden;
}

.sidebar {
  width: $sidebar-width;
  height: 100vh;
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: $sidebar-width-collapsed !important;
}

.btn-link:hover {
  color: $grey-100 !important;

  svg {
    path {
      fill: $grey-100 !important;
    }
  }
}

.collapsed .rotateSvg {
  transform: rotate(180deg);
}

.activeClass {
  background-color: $beige-100;
  color: $grey-900 !important;

  svg {
    path {
      fill: $green !important;
    }
  }
}
</style>
