<template>
  <Card variant="large" :background-color="backgroundColor" :color="color">
    <template #header>
      <div class="row align-items-start my-0 mx-auto">
        <h2 v-if="variant === 'large'" class="fw-bold col p-0">
          {{ title }}
        </h2>
        <h4 v-else class="col p-0 m-0" :class="`text-${color}`">
          {{ title }}
        </h4>
        <button
          v-if="linkLabel && linkTarget && variant === 'large'"
          class="d-flex align-items-center justify-content-end col btn-dark text-end"
          @click="$router.push({ path: linkTarget })"
        >
          <span class="me-4">
            {{ linkLabel }}
          </span>
          <IconCaretRight />
        </button>
      </div>
    </template>
    <template #content><slot /></template>
  </Card>
</template>
<script setup lang="ts">
import Card from '~/components/layout/Card.vue'
import IconCaretRight from '~/assets/images/icon-caret-right.svg?component'

interface Props {
  variant?: 'small' | 'large'
  title: string
  linkLabel?: string
  linkTarget?: string
  backgroundColor?: string
  color?: string
}
withDefaults(defineProps<Props>(), {
  variant: 'large',
  backgroundColor: 'white',
  color: 'grey-500',
})
</script>
