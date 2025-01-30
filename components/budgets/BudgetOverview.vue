<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center justify-content-around mt-7 mb-2"
  >
    <DoughnutChart :data="chartData">
      <div
        class="innerCircle d-flex flex-column align-items-center justify-content-center"
      >
        <span class="fs-1 fw-bold m-0">
          {{ toCurrency(totalAmountSpent, 'short') }}
        </span>
        <span class="fs-5 text-grey-500 m-0">
          of {{ toCurrency(totalBudget, 'short') }} limit
        </span>
      </div>
    </DoughnutChart>
    <div :class="{ 'w-100': viewport.isLessThan('tablet') }">
      <div
        class="mt-4"
        :class="{
          'row row-cols-2 g-0 w-100': viewport.isLessThan('tablet'),
        }"
      >
        <DataLegend
          :data="legendData"
          :variant="viewport.isLessThan('tablet') ? 'horizontal' : 'vertical'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DoughnutChart from '~/components/layout/DoughnutChart.vue'
import type {
  Budget,
  DoughnutChartData,
  Legend,
  Transaction,
} from '~/@types/types'
import { computed } from 'vue'
import { globalToday } from '~/content/date'
import { toCurrency } from '~/utils/formatter'
import DataLegend from '~/components/layout/DataLegend.vue'

// eslint-disable-next-line no-undef
const viewport = useViewport()

interface Props {
  budgets: Budget[]
  transactions: Transaction[]
}

const props = defineProps<Props>()
const today = globalToday.getDate()
const thisMonth = globalToday.getMonth()

const totalBudget = computed(() => {
  return props.budgets
    .map((budget) => budget.maximum)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
})

const currentTransactions = computed(() => {
  return props.transactions.filter(
    (transaction) =>
      new Date(transaction.date).getDate() < today &&
      new Date(transaction.date).getMonth() === thisMonth,
  )
})

const amountSpentByCategory = computed(() => {
  const array = []
  for (let i = 0; i < props.budgets.length; i++) {
    array.push(
      currentTransactions.value
        .filter(
          (transaction) => transaction.category === props.budgets[i].category,
        )
        .map((t) => t.amount)
        .reduce((accumulator, currentValue) => {
          return accumulator - currentValue
        }, 0),
    )
  }
  return array
})

const totalAmountSpent = computed(() => {
  return amountSpentByCategory.value.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)
})

const chartData: DoughnutChartData = {
  labels: props.budgets.map((budget) => budget.category),
  datasets: [
    {
      backgroundColor: props.budgets.map((budget) => budget.theme),
      data: amountSpentByCategory.value,
    },
  ],
}

const legendData = computed(() => {
  const array: Legend[] = []
  for (let i = 0; i < props.budgets.length; i++) {
    array.push({
      theme: props.budgets[i].theme,
      label: props.budgets[i].category,
      value: toCurrency(props.budgets[i].maximum, 'short'),
    })
  }
  return array
})
</script>
<style lang="scss">
.innerCircle {
  transform: translate(0%, -238%);
}
</style>
