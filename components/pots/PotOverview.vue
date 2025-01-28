<template>
  <div class="row row-cols-1 row-cols-md-2 gx-5">
    <div>
      <div
        class="col d-flex bg-beige-100 rounded-3 align-items-center p-4"
        style="max-width: 15.625rem"
      >
        <IconPot class="ms-1 me-5" />
        <div>
          <p class="fs-4 text-grey-500 m-0">Total Saved</p>
          <p class="fw-bold fs-1 text-grey-900 m-0">{{ totalAmountSaved }}</p>
        </div>
      </div>
    </div>
    <div class="col mt-5 mt-md-0">
      <div class="row row-cols-2 g-0">
        <DataLegend :data="legendData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toCurrency } from '~/utils/formatter'
import IconPot from '~/assets/images/icon-pot.svg?component'
import type { Pot, Legend } from '~/@types/types'
import { computed } from 'vue'
import DataLegend from '~/components/layout/DataLegend.vue'

interface Props {
  pots: Pot[]
}

const props = defineProps<Props>()

const totalAmountSaved = computed(() => {
  const totalAmount = props.pots
    .map((pot) => pot.total)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
  return toCurrency(totalAmount, 'short')
})

const legendData = computed(() => {
  const array: Legend[] = []
  for (let i = 0; i < props.pots.length; i++) {
    array.push({
      theme: props.pots[i].theme,
      label: props.pots[i].name,
      value: toCurrency(props.pots[i].total, 'short'),
    })
  }
  return array
})
</script>
