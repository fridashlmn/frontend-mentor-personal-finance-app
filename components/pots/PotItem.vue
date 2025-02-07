<template>
  <div class="bg-white rounded-3 p-6">
    <div class="row pb-7">
      <ThemeCardHeader
        :title="pot.name"
        :theme="pot.theme"
        delete-label="Delete Pot"
        @delete="$emit('delete', pot)"
      />
    </div>
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fs-4 text-grey-500">Total saved</span>
          <span class="fs-1 fw-bold">
            {{ toCurrency(pot.total) }}
          </span>
        </div>
        <div
          class="progress my-4"
          role="progressbar"
          style="--bs-progress-height: 0.5rem"
        >
          <div
            class="progress-bar"
            :style="`width:${percent}%; background-color: ${pot.theme}`"
          />
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="fs-5 text-grey-500 fw-bold">{{ percent }}%</span>
          <span class="fs-4 text-grey-500">
            Target of {{ toCurrency(pot.target, 'short') }}
          </span>
        </div>
      </div>
    </div>
    <div class="row pt-7">
      <button
        class="btn btn-secondary col mx-4"
        @click="$emit('addMoney', pot)"
      >
        + Add Money
      </button>
      <button
        class="btn btn-secondary col me-4"
        @click="$emit('withdrawMoney', pot)"
      >
        Withdraw
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toCurrency } from '~/utils/formatter'
import { computed } from 'vue'
import ThemeCardHeader from '~/components/layout/ThemeCardHeader.vue'
import type { Pot } from '~/@types/types'

interface Props {
  pot: Pot
}
const props = defineProps<Props>()

const percent = computed<string>(() => {
  return ((props.pot.total / props.pot.target) * 100).toFixed(1)
})
</script>
