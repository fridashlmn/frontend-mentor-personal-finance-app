<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Recurring Bills</h1>
    </template>
    <template #content>
      <div class="row gx-6 mt-5 mt-md-7">
        <div class="col-lg-4">
          <RecurringBillsSummary
            :recurring-bills="recurringBills"
            :paid-bills="paidBills"
            :total-upcoming="totalUpcoming"
            :due-soon="dueSoon"
          />
        </div>
        <div class="col-lg-8">
          <div class="table bg-white rounded-3 p-7">
            <nav class="navbar row p-0 justify-content-between">
              <InputField
                :store-i-d="1"
                placeholder="Search bills"
                type="search"
                :icon="IconSearch"
                class="col col-md-4 col-lg-4"
              />
              <SelectDropdown
                class="col col-md-4 col-lg-4 d-flex justify-content-end align-items-center"
                :select-items="filterItems"
                helper-message="Sort by"
                @select="sortTransactions"
              />
            </nav>
            <DataTable class="mt-6" :table-head="tableHead">
              <tr v-for="(item, index) in sortedItems" :key="index">
                <td class="fw-bold fs-4 align-md-middle align-bottom">
                  <img
                    :src="item.avatar"
                    alt="avatar"
                    class="avatar me-4 rounded-circle"
                  />
                  {{ item.name }}
                  <div
                    v-if="viewport.isLessThan('tablet')"
                    class="fw-normal fs-5 mt-2"
                    :style="`color:${item.theme}`"
                  >
                    Monthly-{{ formatDay(item.date) }}
                    <component v-if="item.icon" :is="item.icon" class="ms-2" />
                  </div>
                </td>
                <td
                  v-if="viewport.isGreaterOrEquals('tablet')"
                  class="fs-5 align-middle"
                  :style="`color:${item.theme}`"
                >
                  Monthly-{{ formatDay(item.date) }}
                  <component v-if="item.icon" :is="item.icon" class="ms-2" />
                </td>
                <td class="fw-bold fs-4 align-md-middle align-bottom">
                  {{ toCurrency(item.amount) }}
                </td>
              </tr>
            </DataTable>
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import InputField from '~/components/layout/InputField.vue'
import SelectDropdown from '~/components/layout/SelectDropdown.vue'
import IconSearch from '~/assets/images/icon-search.svg?component'
import IconDue from '~/assets/images/icon-bill-due.svg?component'
import IconPaid from '~/assets/images/icon-bill-paid.svg?component'
import { ref, markRaw } from 'vue'
import DataTable from '~/components/layout/DataTable.vue'
import { formatDay, toCurrency } from '~/utils/formatter'
import Container from '~/components/layout/Container.vue'
import RecurringBillsSummary from '~/components/recurringBills/RecurringBillsSummary.vue'
import { globalToday } from '~/content/date'
import type { SortOption } from '~/@types/types'
import { useTransactionsStore } from '~/stores/transactions'

// eslint-disable-next-line no-undef
const viewport = useViewport()
const transactionsStore = useTransactionsStore()

const filterItems: SortOption[] = [
  { id: 1, label: 'Latest', direction: 'asc', sortBy: 'date' },
  { id: 2, label: 'Oldest', direction: 'desc', sortBy: 'date' },
  { id: 3, label: 'A to Z', direction: 'asc', sortBy: 'name' },
  { id: 4, label: 'Z to A', direction: 'desc', sortBy: 'name' },
  { id: 5, label: 'Highest', direction: 'asc', sortBy: 'amount' },
  { id: 6, label: 'Lowest', direction: 'desc', sortBy: 'amount' },
]

const tableHead: string[] = ['Bill Title', 'Due Date', 'Amount']
const today = globalToday.getDate()

const recurringBills = transactionsStore.transactions
  .filter((transaction) => transaction.recurring)
  .filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name),
  )
  .sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())
const paidBills = recurringBills
  .filter((transaction) => new Date(transaction.date).getDate() < today)
  .map((obj) => ({ ...obj, theme: '#277c78', icon: markRaw(IconPaid) }))
const dueSoon = recurringBills
  .filter(
    (transaction) =>
      new Date(transaction.date).getDate() > today &&
      new Date(transaction.date).getDate() - today < 7,
  )
  .map((obj) => ({ ...obj, theme: '#c94736', icon: markRaw(IconDue) }))
const totalUpcoming = recurringBills
  .filter(
    (transaction) =>
      new Date(transaction.date).getDate() > today &&
      new Date(transaction.date).getDate() - today > 7,
  )
  .map((obj) => ({ ...obj, theme: 'grey-500' }))

const sortedItems = ref([...paidBills, ...dueSoon, ...totalUpcoming])

function sortTransactions(selectedItem: SortOption): void {
  if (selectedItem.sortBy === 'date') {
    if (selectedItem.direction === 'asc') {
      sortedItems.value.sort(
        (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate(),
      )
    } else if (selectedItem.direction === 'desc') {
      sortedItems.value.sort(
        (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate(),
      )
    }
  } else {
    sortRegularTransactions(selectedItem)
  }
}

function sortRegularTransactions(selectedItem: SortOption): void {
  if (selectedItem.direction === 'asc') {
    sortedItems.value.sort((a, b) =>
      a[selectedItem.sortBy] == b[selectedItem.sortBy]
        ? 0
        : a[selectedItem.sortBy] < b[selectedItem.sortBy]
          ? -1
          : 1,
    )
  } else if (selectedItem.direction === 'desc') {
    sortedItems.value.sort((a, b) =>
      a[selectedItem.sortBy] == b[selectedItem.sortBy]
        ? 0
        : a[selectedItem.sortBy] < b[selectedItem.sortBy]
          ? 1
          : -1,
    )
  }
}
</script>
