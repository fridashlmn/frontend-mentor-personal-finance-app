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
      <span class="fs-4 colorGrey-500 my-5 align-self-baseline">
        {{ subline }}
      </span>
    </div>
    <div class="modal-body">
      <slot />
    </div>
    <div class="modal-footer w-100 mt-5">
      <button type="button" class="btn modalButton" :class="buttonVariant">
        {{ buttonLabel }}
      </button>
      <button
        v-if="backLink"
        class="mt-5 btn btn-dark w-100"
        @click="$emit('close')"
      >
        {{ backLink }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconCloseModal from '~/assets/images/icon-close-modal.svg?component'

interface Props {
  title: string
  subline: string
  buttonLabel: string
  buttonVariant: string
  backLink?: string
}
defineProps<Props>()
</script>
<style lang="scss">
.modalButton {
  max-width: none;
  width: 100%;
}
</style>
