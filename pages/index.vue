<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Overview</h1>
    </template>
    <template #content>
      <div class="row gx-6 mt-5 mt-md-7">
        <div class="col mb-3">
          <OverviewCard
            title="Current Balance"
            variant="small"
            background-color="grey-900"
            color="white"
          >
            <span class="text-white fs-1 fw-bold">
              {{ toCurrency(balanceStore.balance.current) }}
            </span>
          </OverviewCard>
        </div>
        <div class="col mb-3">
          <OverviewCard class="fs-1 fw-bold" title="Income" variant="small">
            <span>{{ toCurrency(balanceStore.balance.income) }}</span>
          </OverviewCard>
        </div>
        <div class="col mb-7">
          <OverviewCard class="fs-1 fw-bold" title="Expenses" variant="small">
            <span>{{ toCurrency(balanceStore.balance.expenses) }}</span>
          </OverviewCard>
        </div>
      </div>
      <div class="gridContainer" id="masonry">
        <div class="gridSizer wSmall"></div>
        <div class="gridItem wBig">
          <OverviewCard
            title="Pots"
            link-label="See Details"
            link-target="/pots"
            class="me-lg-6"
          >
            <PotOverview :pots="potsStore.pots" />
          </OverviewCard>
        </div>
        <div class="gridItem wSmall">
          <OverviewCard
            title="Budgets"
            link-label="See Details"
            link-target="/budgets"
            class="mt-4 mt-md-6 mt-lg-0"
          >
            <BudgetOverview
              :budgets="budgetStore.budgets"
              :transactions="transactionsStore.transactions"
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
            <TransactionsOverview
              :transactions="transactionsStore.transactions.slice(0, 5)"
            />
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
import PotOverview from '~/components/pots/PotOverview.vue'
import RecurringBillsOverview from '~/components/recurringBills/RecurringBillsOverview.vue'
import BudgetOverview from '~/components/budgets/BudgetOverview.vue'
import { computed, onMounted } from 'vue'
import Container from '~/components/layout/Container.vue'
import { useBudgetsStore } from '~/stores/budgets'
import { useTransactionsStore } from '~/stores/transactions'
import { usePotsStore } from '~/stores/pots'
import { useBalanceStore } from '~/stores/balance'

const balanceStore = useBalanceStore()
const budgetStore = useBudgetsStore()
const transactionsStore = useTransactionsStore()
const potsStore = usePotsStore()

const uniqueRecurringBills = computed(() => {
  const recurringBills = transactionsStore.transactions.filter(
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
