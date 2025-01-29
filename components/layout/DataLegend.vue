<template>
  <div
    v-for="(item, index) in data.slice(0, 4)"
    :key="index"
    class="col d-flex"
    :class="{
      'firstRowMargin': variant === 'horizontal',
      'mb-4': variant === 'vertical',
    }"
  >
    <hr
      class="themeBorder opacity-100 m-0"
      :style="`border-color:${item.theme}`"
    />
    <div class="ms-4 fs-5 align-self-center">
      <p class="text-grey-500 m-0 pb-1">
        {{ item.label }}
      </p>
      <p class="color-grey-900 fw-bold m-0">
        {{ item.value }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Legend } from '~/@types/types'

interface Props {
  data: Legend[]
  variant: 'horizontal' | 'vertical'
}

defineProps<Props>()
</script>
<style lang="scss">
.firstRowMargin:first-of-type,
.firstRowMargin:nth-of-type(2) {
  margin-bottom: 1rem;
}
</style>
