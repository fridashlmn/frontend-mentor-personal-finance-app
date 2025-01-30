<template>
  <div
    :class="[
      'rounded-3',
      `bg-${backgroundColor}`,
      { 'p-7': variant === 'large' },
      { 'p-6': variant === 'small' },
      { 'p-5 p-lg-6': variant === 'extraSmall' },
      { 'p-6 d-flex d-md-block align-items-end': variant === 'responsive' },
    ]"
  >
    <slot name="header" />
    <div :class="variant === 'large' ? 'mt-5' : 'mt-3'">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'extraSmall' | 'small' | 'large' | 'responsive'
  backgroundColor?: string
  color?: string
}
withDefaults(defineProps<Props>(), {
  variant: 'large',
  backgroundColor: 'white',
  color: 'grey-500',
})
</script>
