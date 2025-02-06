<template>
  <div>
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
    </div>
    <FormContainer
      :button-variant="buttonVariant"
      :button-label="buttonLabel"
      @handle-submit="handleSubmit"
    >
      <InputField
        :store-i-d="1"
        :label="inputLabel"
        placeholder="e.g. 2000"
        type="number"
        :prefix="true"
        class="mt-5 mb-4"
      >
        <template #prefix>$</template>
      </InputField>
    </FormContainer>
  </div>
</template>
<script setup lang="ts">
import InputField from '~/components/layout/InputField.vue'
import type { Pot } from '~/@types/types'
import { computed } from 'vue'
import { toCurrency } from '~/utils/formatter'
import { useInputStore } from '~/stores/input'
import { usePotsStore } from '~/stores/pots'
import { storeToRefs } from 'pinia'
import FormContainer from '~/components/layout/FormContainer.vue'

interface Props {
  type: 'withdrawMoney' | 'addMoney'
  pot: Pot
  buttonVariant: string
  buttonLabel: string
}
const props = defineProps<Props>()
const potsStore = usePotsStore()
const inputStore = useInputStore(1)
const { inputValue, error } = storeToRefs(inputStore)

const emit = defineEmits(['close'])

const inputLabel = computed(() =>
  props.type === 'addMoney' ? 'Amount to Add' : 'Amount to Withdraw',
)

const newAmount = computed(() => {
  if (props.type === 'addMoney') {
    return inputValue.value
      ? Number(props.pot.total) + Number(inputValue.value)
      : props.pot.total
  } else
    return inputValue.value
      ? Number(props.pot.total) - Number(inputValue.value)
      : props.pot.total
})

const percentInitial = computed(() => {
  if (inputValue.value && props.type === 'withdrawMoney') {
    return (
      ((Number(props.pot.total) - Number(inputValue.value)) /
        props.pot.target) *
      100
    ).toFixed(1)
  }
  return ((props.pot.total / props.pot.target) * 100).toFixed(1)
})

const percentEdited = computed(() => {
  if (inputValue.value) {
    return ((Number(inputValue.value) / props.pot.target) * 100).toFixed(1)
  }
  return 0
})

const percentColor = computed(() => {
  if (inputValue.value) {
    return props.type === 'addMoney' ? props.pot.theme : '#c94736'
  }
  return 'grey-900'
})

const percentTotal = computed(() => {
  if (inputValue.value) {
    return props.type === 'addMoney'
      ? (
          ((Number(props.pot.total) + Number(inputValue.value)) /
            props.pot.target) *
          100
        ).toFixed(1)
      : (
          ((Number(props.pot.total) - Number(inputValue.value)) /
            props.pot.target) *
          100
        ).toFixed(1)
  }
  return percentInitial.value
})

function handleSubmit(): void {
  if (!inputStore.inputValue) {
    error.value = 'Cannot be empty'
    return
  }
  if (props.type === 'withdrawMoney') {
    potsStore.withdraw(props.pot, Number(inputValue.value))
  }
  if (props.type === 'addMoney') {
    potsStore.addMoney(props.pot, Number(inputValue.value))
  }
  emit('close')
}
</script>
