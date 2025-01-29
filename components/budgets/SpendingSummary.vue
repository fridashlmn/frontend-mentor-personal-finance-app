<template>
  <Card>
    <template #content>
      <div
        class="d-flex flex-column flex-md-row flex-lg-column align-items-center"
      >
        <DoughnutChart :data="chartData" style="height: 280px">
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
        <div style="width: 100%" class="ms-md-4">
          <span class="fs-2 fw-bold">Spending Summary</span>
          <div
            v-for="(budget, index) in budgets"
            :key="budget.category"
            class="mt-6"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <hr
                  class="themeBorder opacity-100 m-0"
                  :style="`border-color:${budget.theme}`"
                />
                <span class="fs-4 text-grey-500 ms-4">
                  {{ budget.category }}
                </span>
              </div>
              <div>
                <span class="fs-3 fw-bold">
                  {{ getCurrentAmountSpentByCategory(budget.category) }}
                </span>
                <span class="fs-5 text-grey-500">
                  of {{ toCurrency(budget.maximum) }}
                </span>
              </div>
            </div>
            <hr v-if="index < budgets.length - 1" class="dividerLine" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { toCurrency } from '~/utils/formatter'
import Card from '~/components/layout/Card.vue'
import DoughnutChart from '~/components/layout/DoughnutChart.vue'
import type { Budget, DoughnutChartData, Transaction } from '~/@types/types'
import { computed } from 'vue'

interface Props {
  currentTransactions: Transaction[]
  budgets: Budget[]
}
const props = defineProps<Props>()

const totalBudget = computed(() => {
  return props.budgets
    .map((budget) => budget.maximum)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
})

const totalAmountSpent = computed(() => {
  return amountSpentByCategory.value.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)
})

const amountSpentByCategory = computed(() => {
  const array = []
  for (let i = 0; i < props.budgets.length; i++) {
    array.push(
      props.currentTransactions
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

const chartData: DoughnutChartData = {
  labels: props.budgets.map((budget) => budget.category),
  datasets: [
    {
      backgroundColor: props.budgets.map((budget) => budget.theme),
      data: amountSpentByCategory.value,
    },
  ],
}

function getCurrentAmountSpentByCategory(category: string): string {
  const transactionCategory = props.currentTransactions.filter(
    (transaction) => transaction.category === category,
  )
  return (
    toCurrency(
      transactionCategory
        .map((t) => t.amount)
        .reduce((accumulator, currentValue) => {
          return accumulator - currentValue
        }, 0),
    ) + ' '
  )
}
</script>
