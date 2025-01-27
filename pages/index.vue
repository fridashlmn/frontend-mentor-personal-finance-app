<template>
  <div class="container overflow-hidden px-4 px-md-8 py-6 py-md-7">
    <h1 class="fw-bold">Overview</h1>
    <div class="row gx-6 my-5 my-md-7 gy-3 gy-md-0">
      <div class="col">
        <Card
          title="Current Balance"
          variant="small"
          background-color="grey-900"
          color="white"
        >
          <span class="text-white fs-1 fw-bold">
            {{ toCurrency(data.balance.current) }}
          </span>
        </Card>
      </div>
      <div class="col">
        <Card class="fs-1 fw-bold" title="Income" variant="small">
          <span>{{ toCurrency(data.balance.income) }}</span>
        </Card>
      </div>
      <div class="col">
        <Card class="fs-1 fw-bold" title="Expenses" variant="small">
          <span>{{ toCurrency(data.balance.expenses) }}</span>
        </Card>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-lg-2 g-6">
      <div class="col">
        <Card title="Pots" link-label="See Details" link-target="/pots">
          <PotOverview :pots="data.pots" />
        </Card>
      </div>
      <div class="col order-2 order-lg-1">
        <Card title="Budgets" link-label="See Details" link-target="/budgets">
          <p>CONTENT</p>
        </Card>
      </div>
      <div class="col order-1 order-lg-2">
        <Card
          title="Transactions"
          link-label="View All"
          link-target="/transactions"
        >
          <p>CONTENT</p>
        </Card>
      </div>
      <div class="col order-last order-lg-last">
        <Card
          title="Recurring Bills"
          link-label="See Details"
          link-target="/recurring-bills"
        >
          <RecurringBillsOverview :transactions="uniqueRecurringBills" />
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from '~/components/layout/Card.vue'
import { toCurrency } from '~/utils/formatter'
import data from '~/content/data.json'
import PotOverview from '~/components/pots/PotOverview.vue'
import RecurringBillsOverview from '~/components/recurringBills/RecurringBillsOverview.vue'
import { computed } from 'vue'

const uniqueRecurringBills = computed(() => {
  const recurringBills = data.transactions.filter(
    (transaction) => transaction.recurring,
  )
  return recurringBills.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name),
  )
})
</script>
