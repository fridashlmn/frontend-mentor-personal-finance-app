<template>
  <div class="row row-cols-1 row-cols-lg-2 g-0">
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
    <div class="col row row-cols-2 g-0 mt-5 mt-lg-0 ms-lg-5">
      <div
        v-for="(item, index) in data.slice(0, 4)"
        :key="index"
        class="col d-flex firstRowMargin"
      >
        <hr
          class="lineBorder opacity-100 m-0"
          :style="`border-color:${item.theme}`"
        />
        <div class="ms-4 fs-5 align-self-center">
          <p class="text-grey-500 m-0 pb-1">
            {{ item.name }}
          </p>
          <p class="color-grey-900 fw-bold m-0">
            {{ toCurrency(item.total, 'short') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toCurrency } from '~/utils/formatter'
import IconPot from '~/assets/images/icon-pot.svg?component'

type Pot = {
  name: string
  target: number
  total: number
  theme: string
}

interface Props {
  data: Pot[]
}

const props = defineProps<Props>()

// eslint-disable-next-line no-undef
const totalAmountSaved = computed(() => {
  const totalAmount = props.data
    .map((pot) => pot.total)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
  return toCurrency(totalAmount, 'short')
})
</script>
<style lang="scss">
.lineBorder {
  border-style: solid;
  border-width: 0.125rem;
  border-radius: 0.5rem;
}

.firstRowMargin:first-of-type,
.firstRowMargin:nth-of-type(2) {
  margin-bottom: 1rem;
}
</style>
