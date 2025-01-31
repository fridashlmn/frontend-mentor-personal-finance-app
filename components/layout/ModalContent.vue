<template>
  <div class="p-7">
    <div class="modal-header d-flex flex-column">
      <div
        class="d-flex w-100 flex-row align-items-center justify-content-between"
      >
        <h1 class="fs-1 fw-bold">{{ title }}</h1>
        <NuxtLink data-bs-dismiss="modal">
          <IconCloseModal />
        </NuxtLink>
      </div>
      <span class="fs-4 colorGrey-500 my-5">{{ subLine }}</span>
    </div>
    <div class="modal-body">
      <slot />
    </div>
    <div class="modal-footer w-100 mt-5">
      <button type="button" class="btn btn-primary modalButton">
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconCloseModal from '~/assets/images/icon-close-modal.svg?component'

interface Props {
  title: string
  subLine: string
  buttonLabel: string
}
defineProps<Props>()
</script>
<style lang="scss">
.modalButton {
  max-width: none;
  width: 100%;
}
</style>
