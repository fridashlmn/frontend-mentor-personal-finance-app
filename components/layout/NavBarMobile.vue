<template>
  <ul
    class="mobileNavBar fixed-bottom bg-grey-900 rounded-top-3 nav row g-0 align-items-end justify-content-around h-100"
  >
    <li
      v-for="item in navigationItems"
      :key="item.label"
      class="col link-item"
      style="max-width: 6.5rem"
    >
      <NuxtLink
        :to="item.link"
        class="link d-flex flex-column align-items-center text-beige-100 text-decoration-none fw-bold fs-5 border-bottom border-5 border-grey-900"
        activeClass="activeClass rounded-top-3 border-green"
      >
        <component
          v-if="item.icon"
          :is="item.icon"
          class="linkIcon mt-3 mb-2"
        />
        <span class="linkLabel pb-2">
          {{ item.label }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { navigationItems } from '~/content/navigation'
</script>
<style lang="scss">
@import 'assets/css/variables';
.mobileNavBar {
  height: $navBar-height-tablet;

  @media screen and (max-width: 530px) {
    height: $navBar-height-mobile;
  }
}

.linkLabel {
  @media screen and (max-width: 530px) {
    display: none;
  }
}

.linkIcon {
  @media screen and (max-width: 530px) {
    margin-bottom: 0.625rem !important;
  }
}
</style>
