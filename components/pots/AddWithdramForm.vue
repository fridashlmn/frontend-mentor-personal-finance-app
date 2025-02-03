<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <span class="fs-4 text-grey-500">New Amount</span>
      <span class="fs-1 fw-bold">
        {{ toCurrency(newAmount) }}
      </span>
    </div>
    <div class="progress-stacked my-4" style="--bs-progress-height: 0.5rem">
      <div
        aria-label="Segment one"
        :aria-valuenow="percentInitial"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width:${percentInitial}%;`"
        class="progress"
        role="progressbar"
      >
        <div class="progress-bar bg-grey-900" />
      </div>
      <div
        aria-label="Segment one"
        :aria-valuenow="percentEdited"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width:${percentEdited}%;`"
        class="progress"
        role="progressbar"
      >
        <div
          class="progress-bar"
          :style="`background-color: ${percentColor}`"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <span
        class="fs-5 text-grey-500 fw-bold"
        :style="`color: ${percentColor}`"
      >
        {{ percentTotal }}%
      </span>
      <span class="fs-4 text-grey-500">
        Target of {{ toCurrency(pot.target, 'short') }}
      </span>
    </div>
    <InputField
      placeholder="e.g. 2000"
      type="number"
      :label="inputLabel"
      class="mt-5 mb-4"
      :prefix="true"
      @update:modelValue="handleInput"
    >
      <template #prefix>$</template>
    </InputField>
  </div>
</template>
<script setup lang="ts">
import InputField from '~/components/layout/InputField.vue'
import type { Pot } from '~/@types/types'
import { computed, ref } from 'vue'
import { toCurrency } from '~/utils/formatter'

interface Props {
  variant: 'withdrawMoney' | 'addMoney'
  pot: Pot
}
const props = defineProps<Props>()
const input = ref<number>(0)

const inputLabel = computed(() =>
  props.variant === 'addMoney' ? 'Amount to Add' : 'Amount to Withdraw',
)

const newAmount = computed(() => {
  if (props.variant === 'addMoney') {
    return input.value
      ? Number(props.pot.total) + Number(input.value)
      : props.pot.total
  } else
    return input.value
      ? Number(props.pot.total) - Number(input.value)
      : props.pot.total
})

const percentInitial = computed(() => {
  if (input.value && props.variant === 'withdrawMoney') {
    return (
      ((Number(props.pot.total) - Number(input.value)) / props.pot.target) *
      100
    ).toFixed(1)
  }
  return ((props.pot.total / props.pot.target) * 100).toFixed(1)
})

const percentEdited = computed(() => {
  if (input.value) {
    return ((input.value / props.pot.target) * 100).toFixed(1)
  }
  return 0
})

const percentColor = computed(() => {
  if (input.value) {
    return props.variant === 'addMoney' ? props.pot.theme : '#c94736'
  }
  return 'grey-900'
})

const percentTotal = computed(() => {
  if (input.value) {
    return props.variant === 'addMoney'
      ? (
          ((Number(props.pot.total) + Number(input.value)) / props.pot.target) *
          100
        ).toFixed(1)
      : (
          ((Number(props.pot.total) - Number(input.value)) / props.pot.target) *
          100
        ).toFixed(1)
  }
  return percentInitial.value
})

function handleInput(event: Event): void {
  input.value = event
}
</script>
