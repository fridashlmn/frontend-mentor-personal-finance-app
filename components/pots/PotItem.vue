<template>
  <div class="bg-white rounded-3 p-6">
    <div class="row pb-7">
      <ThemeCardHeader
        :title="name"
        :theme="theme"
        edit-label="Edit Pot"
        delete-label="Delete Pot"
      />
    </div>
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fs-4 text-grey-500">Total saved</span>
          <span class="fs-1 fw-bold">
            {{ toCurrency(total) }}
          </span>
        </div>
        <div
          class="progress my-4"
          role="progressbar"
          style="--bs-progress-height: 0.5rem"
        >
          <div
            class="progress-bar"
            :style="`width:${percent}%; background-color: ${theme}`"
          />
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="fs-5 text-grey-500 fw-bold">{{ percent }}%</span>
          <span class="fs-4 text-grey-500">
            Target of {{ toCurrency(target, 'short') }}
          </span>
        </div>
      </div>
    </div>
    <div class="row pt-7">
      <button class="btn btn-secondary col mx-4">+ Add Money</button>
      <button class="btn btn-secondary col me-4">Withdraw</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toCurrency } from '~/utils/formatter'
import { computed } from 'vue'
import ThemeCardHeader from '~/components/layout/ThemeCardHeader.vue'

interface Props {
  name: string
  target: number
  total: number
  theme: string
}
const props = defineProps<Props>()

const percent = computed(() => {
  return ((props.total / props.target) * 100).toFixed(1)
})
</script>
