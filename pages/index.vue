<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Overview</h1>
    </template>
    <template #content>
      <div class="row gx-6 my-5 my-md-7 gy-3 gy-md-0">
        <div class="col">
          <OverviewCard
            title="Current Balance"
            variant="small"
            background-color="grey-900"
            color="white"
          >
            <span class="text-white fs-1 fw-bold">
              {{ toCurrency(data.balance.current) }}
            </span>
          </OverviewCard>
        </div>
        <div class="col">
          <OverviewCard class="fs-1 fw-bold" title="Income" variant="small">
            <span>{{ toCurrency(data.balance.income) }}</span>
          </OverviewCard>
        </div>
        <div class="col">
          <OverviewCard class="fs-1 fw-bold" title="Expenses" variant="small">
            <span>{{ toCurrency(data.balance.expenses) }}</span>
          </OverviewCard>
        </div>
      </div>
      <div class="gridContainer" id="masonry">
        <div class="gridSizer"></div>
        <div class="gridItem">
          <OverviewCard
            title="Pots"
            link-label="See Details"
            link-target="/pots"
            class="me-lg-6"
          >
            <PotOverview :pots="data.pots" />
          </OverviewCard>
        </div>
        <div class="gridItem">
          <OverviewCard
            title="Budgets"
            link-label="See Details"
            link-target="/budgets"
            style="height: 25.625rem"
          >
            <BudgetOverview
              :budgets="data.budgets"
              :transactions="data.transactions"
            />
          </OverviewCard>
        </div>
        <div class="gridItem">
          <OverviewCard
            title="Transactions"
            link-label="View All"
            link-target="/transactions"
            class="me-lg-6 mt-4 mt-md-6"
          >
            <p>CONTENT</p>
          </OverviewCard>
        </div>
        <div class="gridItem">
          <OverviewCard
            title="Recurring Bills"
            link-label="See Details"
            link-target="/recurring-bills"
            class="mt-4 mt-md-6"
          >
            <RecurringBillsOverview :transactions="uniqueRecurringBills" />
          </OverviewCard>
        </div>
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import data from '~/content/data.json'
import PotOverview from '~/components/pots/PotOverview.vue'
import RecurringBillsOverview from '~/components/recurringBills/RecurringBillsOverview.vue'
import BudgetOverview from '~/components/budgets/BudgetOverview.vue'
import { computed, onMounted } from 'vue'
import Container from '~/components/layout/Container.vue'

const uniqueRecurringBills = computed(() => {
  const recurringBills = data.transactions.filter(
    (transaction) => transaction.recurring,
  )
  return recurringBills.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name),
  )
})

onMounted(async () => {
  // eslint-disable-next-line no-undef
  if (process.browser) {
    let { default: Masonry } = await import('masonry-layout')
    new Masonry('#masonry', {
      itemSelector: '.gridItem',
      columnWidth: '.gridSizer',
      percentPosition: true,
    })
  }
})
</script>
<style>
.gridContainer {
  padding-bottom: 4rem;
}
.gridContainer:after {
  content: '';
  display: block;
  clear: both;
}
.gridSizer,
.gridItem {
  width: 50%;

  @media screen and (max-width: 769px) {
    width: 100%;
  }
}

.gridItem {
  height: fit-content;
}
</style>
