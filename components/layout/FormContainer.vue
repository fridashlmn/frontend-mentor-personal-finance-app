<template>
  <form @submit.prevent="$emit('handle-submit')">
    <slot />
    <button
      type="submit"
      class="btn modalButton w-100 mt-5"
      :class="buttonVariant"
    >
      {{ buttonLabel }}
    </button>
  </form>
</template>
<script setup lang="ts">
interface Props {
  buttonVariant: string
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
