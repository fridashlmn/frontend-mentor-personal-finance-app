<template>
  <div class="bg-white rounded-3 p-6">
    <div class="row pb-7">
      <div class="col d-flex justify-content-between align-items-center">
        <div>
          <span class="dot me-4" :style="`background-color: ${theme}`"></span>
          <span class="fs-2 fw-bold">{{ name }}</span>
        </div>
        <div class="dropend">
          <a
            class="dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <IconEllipsis />
          </a>
          <ul class="dropdown-menu">
            <li class="dropdown-item">Edit Pot</li>
            <li><hr class="dropdown-divider" /></li>
            <li class="dropdown-item text-red">Delete Pot</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fs-4 text-grey-500">Total saved</span>
          <span class="fs-1 fw-bold">
            {{ toCurrency(total) }}
          </span>
        </div>
        <div class="progress my-4" role="progressbar">
          <div
            class="progress-bar"
            :style="`width:${percent}%; background-color: ${theme}`"
          ></div>
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
import IconEllipsis from '~/assets/images/icon-ellipsis.svg?component'
import { toCurrency } from '~/utils/formatter'

interface Props {
  name: string
  target: number
  total: number
  theme: string
}
const props = defineProps<Props>()
// eslint-disable-next-line no-undef
const percent = computed(() => {
  return ((props.total / props.target) * 100).toFixed(1)
})
</script>
<style lang="scss">
.dot {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  display: inline-block;
}
</style>
