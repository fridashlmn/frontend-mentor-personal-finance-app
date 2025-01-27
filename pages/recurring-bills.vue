<template>
  <div class="container overflow-hidden px-4 px-md-8 py-6 py-md-7">
    <div class="row">
      <h1 class="col fw-bold">Recurring Bills</h1>
    </div>
    <div class="row">
      <div class="col-4">Card 1</div>
      <div class="col-8 table-responsive bg-white rounded-3 p-7">
        <nav class="navbar row p-0">
          <InputField
            class="col-6"
            placeholder="Search bills"
            type="search"
            :icon="IconSearch"
          />
          <SelectDropdown
            class="col-md-3 offset-md-3"
            :select-items="filterItems"
          />
        </nav>
        <DataTable class="mt-6" :table-head="tableHead" :data="recurringBills">
          <tr v-for="item in displayItems" :key="item.date">
            <td class="tableName">
              <img
                :src="item.avatar"
                alt="avatar"
                class="avatar me-4 rounded-circle"
              />
              {{ item.name }}
            </td>
            <td class="tableDate" :style="`color:${item.theme}`">
              <div class="test">
                {{ formattedDueDate(item.date) }}
                <component v-if="item.icon" :is="item.icon" class="ms-2" />
              </div>
            </td>
            <td class="tableAmount">{{ toCurrency(item.amount) }}</td>
          </tr>
        </DataTable>
      </div>
      <div class="col-4">Card 2</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { transactions } from '~/content/data.json'
import InputField from '~/components/layout/InputField.vue'
import SelectDropdown from '~/components/layout/SelectDropdown.vue'
import IconSearch from '~/assets/images/icon-search.svg?component'
import IconDue from '~/assets/images/icon-bill-due.svg?component'
import IconPaid from '~/assets/images/icon-bill-paid.svg?component'
import { computed } from 'vue'
import DataTable from '~/components/layout/DataTable.vue'
import { formattedDueDate, toCurrency } from '~/utils/formatter'

const filterItems: { id: number; label: string }[] = [
  { id: 1, label: 'Latest' },
  { id: 2, label: 'Oldest' },
  { id: 3, label: 'A to Z' },
  { id: 4, label: 'Z to A' },
  { id: 5, label: 'Highest' },
  { id: 6, label: 'Lowest' },
]

const tableHead: string[] = ['Bill Title', 'Due Date', 'Amount']
const today = new Date().getDate()

const recurringBills = computed(() => {
  return transactions
    .filter((transaction) => transaction.recurring)
    .sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())
})

const paidBills = computed(() => {
  return recurringBills.value
    .filter((transaction) => new Date(transaction.date).getDate() < today)
    .map((obj) => ({ ...obj, theme: '#277c78', icon: IconPaid }))
})

const dueSoon = computed(() => {
  return recurringBills.value
    .filter(
      (transaction) =>
        new Date(transaction.date).getDate() > today &&
        new Date(transaction.date).getDate() - today < 7,
    )
    .map((obj) => ({ ...obj, theme: '#c94736', icon: IconDue }))
})

const dueLater = computed(() => {
  return recurringBills.value
    .filter((transaction) => new Date(transaction.date).getDate() > today)
    .map((obj) => ({ ...obj, theme: 'grey-500' }))
})

const displayItems = computed(() => {
  return [...paidBills.value, ...dueSoon.value, ...dueLater.value].filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name),
  )
})
</script>
<style lang="scss">
@import 'assets/css/variables';
.avatar {
  width: 2rem;
  height: 2rem;
}

.tableName,
.tableAmount {
  font-weight: bold;
  font-size: $preset-4;
  vertical-align: middle;
}

.tableDate {
  font-size: $preset-5;
  vertical-align: middle;
}
</style>
