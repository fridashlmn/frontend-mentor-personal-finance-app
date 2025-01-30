<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Budgets</h1>
      <button class="col btn btn-primary">+ Add New Budget</button>
    </template>
    <template #content>
      <div class="row gx-6 mt-5 mt-md-7">
        <div class="col-lg-5">
          <SpendingSummary
            class="mb-6"
            :budgets="budgets"
            :current-transactions="currentTransactions"
          />
        </div>
        <div class="col-lg-7">
          <div v-for="budget in budgets" :key="budget.category">
            <CategoryItem
              class="mb-6"
              :budget="budget"
              :transactions="getCurrentTransactionsByCategory(budget.category)"
            />
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import Container from '~/components/layout/Container.vue'
import { computed } from 'vue'
import { budgets, transactions } from '~/content/data.json'
import { globalToday } from '~/content/date'
import SpendingSummary from '~/components/budgets/SpendingSummary.vue'
import CategoryItem from '~/components/budgets/CategoryItem.vue'
import type { Transaction } from '~/@types/types'

const today = globalToday.getDate()
const thisMonth = globalToday.getMonth()

const currentTransactions = computed(() => {
  return transactions.filter(
    (transaction) =>
      new Date(transaction.date).getDate() < today &&
      new Date(transaction.date).getMonth() === thisMonth,
  )
})

function getCurrentTransactionsByCategory(category: string): Transaction[] {
  return currentTransactions.value.filter(
    (transaction) => transaction.category === category,
  )
}
</script>
