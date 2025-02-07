<template>
  <Card variant="small">
    <template #header>
      <ThemeCardHeader
        :theme="budget.theme"
        :title="budget.category"
        delete-label="Delete Budget"
        @delete="$emit('delete', budget)"
      />
    </template>
    <template #content>
      <span class="fs-4 text-grey-500">
        Maximum of {{ toCurrency(budget.maximum) }}
      </span>
      <div
        class="d-flex align-items-center bg-beige-100 rounded-3 my-4"
        style="height: 2rem"
      >
        <div class="progress progressbarLarge my-4 mx-1" role="progressbar">
          <div
            class="progress-bar"
            :style="`width:${percent}%; background-color: ${budget.theme};`"
          />
        </div>
      </div>
      <div class="row d-flex">
        <div class="col d-flex">
          <hr
            class="themeBorder opacity-100 m-0"
            :style="`border-color:${budget.theme}`"
          />
          <div class="d-flex flex-column ms-4">
            <span class="fs-5 text-grey-500 mb-1">Spent</span>
            <span class="fs-4 fw-bold">
              {{ toCurrency(amountSpent) }}
            </span>
          </div>
        </div>
        <div class="col d-flex">
          <hr class="themeBorder opacity-100 m-0 border-beige-100" />
          <div class="d-flex flex-column ms-4">
            <span class="fs-5 text-grey-500 mb-1">Remaining</span>
            <span class="fs-4 fw-bold">
              {{ toCurrency(budget.maximum - amountSpent) }}
            </span>
          </div>
        </div>
      </div>
      <Card background-color="beige-100" class="mt-5" variant="small">
        <template #header>
          <div class="d-flex align-items-center justify-content-between">
            <span class="fs-3 fw-bold">Latest Spending</span>
            <div>
              <NuxtLink
                to="/transactions"
                class="btn-dark text-decoration-none d-flex align-items-center"
              >
                <span class="fs-4 me-4">See All</span>
                <IconCaretRight />
              </NuxtLink>
            </div>
          </div>
        </template>
        <template #content>
          <div v-for="(transaction, index) in transactions" :key="index">
            <LatestTransactionItem :transaction="transaction" :small="true" />
            <hr
              v-if="index < transactions.length - 1"
              class="lineDark dividerLine"
            />
          </div>
        </template>
      </Card>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '~/components/layout/Card.vue'
import type { Budget, Transaction } from '~/@types/types'
import ThemeCardHeader from '~/components/layout/ThemeCardHeader.vue'
import { computed } from 'vue'
import { toCurrency } from '~/utils/formatter'
import LatestTransactionItem from '~/components/budgets/LatestTransactionItem.vue'
import IconCaretRight from '~/assets/images/icon-caret-right.svg?component'

interface Props {
  budget: Budget
  transactions: Transaction[]
}
const props = defineProps<Props>()

const amountSpent = computed<number>(() => {
  return props.transactions
    .map((transaction) => transaction.amount)
    .reduce((accumulator, currentValue) => {
      return accumulator - currentValue
    }, 0)
})

const percent = computed<string>(() => {
  return ((amountSpent.value / props.budget.maximum) * 100).toFixed(1)
})
</script>
