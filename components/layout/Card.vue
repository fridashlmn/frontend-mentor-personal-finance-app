<template>
  <div>
    <div
      :class="[padding, variant, 'rounded-3 height ', `bg-${backgroundColor}`]"
    >
      <slot name="header" />
      <div
        class="row align-items-start"
        :class="variant === 'large' ? 'mt-5' : 'mt-3'"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'extraSmall' | 'small' | 'large' | 'responsive'
  backgroundColor?: string
  color?: string
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'large',
  backgroundColor: 'white',
  color: 'grey-500',
})

const padding = computed(() => {
  if (props.variant === 'large') {
    return 'p-7'
  }
  if (props.variant === 'small' || props.variant === 'responsive') {
    return 'p-6'
  }
  if (props.variant === 'extraSmall') {
    return 'p-5 p-lg-6'
  }
  return ''
})
</script>
<style lang="scss">
.height {
  height: auto;

  @media screen and (max-width: 991px) {
    height: 100%;
  }
}

.responsive {
  @media screen and (max-width: 767px) {
    display: flex;
    align-items: flex-end;
  }
}
</style>
