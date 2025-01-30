<template>
  <div class="col d-flex justify-content-between align-items-center">
    <div>
      <span class="dot me-4" :style="`background-color: ${theme}`"></span>
      <span class="fs-2 fw-bold">{{ title }}</span>
    </div>
    <div class="dropend">
      <a
        class="dropdownEllipsisToggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <IconEllipsis />
      </a>
      <ul class="dropdown-menu">
        <li class="dropdown-item">{{ editLabel }}</li>
        <li><hr class="dropdown-divider" /></li>
        <li class="dropdown-item text-red">{{ deleteLabel }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconEllipsis from '~/assets/images/icon-ellipsis.svg?component'

interface Props {
  title: string
  theme: string
  editLabel: string
  deleteLabel: string
}

defineProps<Props>()
</script>
<style lang="scss">
.dropdownEllipsisToggle::after {
  border: none !important;
}
</style>
