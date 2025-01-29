<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Recurring Bills</h1>
    </template>
    <template #content>
      <div class="row row-cols-1 row-cols-lg-2 my-5 my-md-7 gx-6">
        <RecurringBillsSummary
          :recurring-bills="recurringBills"
          :paid-bills="paidBills"
          :total-upcoming="totalUpcoming"
          :due-soon="dueSoon"
        />
        <div class="col col-lg-8 table-responsive bg-white rounded-3 p-7">
          <nav class="navbar row p-0 justify-content-between">
            <InputField
              class="col"
              placeholder="Search bills"
              type="search"
              :icon="IconSearch"
              style="max-width: 20rem"
            />
            <SelectDropdown
              class="col"
              :select-items="filterItems"
              helper-message="Sort by"
            />
          </nav>
          <DataTable
            class="mt-6"
            :table-head="tableHead"
            :data="recurringBills"
          >
            <tr v-for="item in displayItems" :key="item.date">
              <td class="tableName">
                <img
                  :src="item.avatar"
                  alt="avatar"
                  class="avatar me-4 rounded-circle"
                />
                {{ item.name }}
                <div
                  v-if="viewport.isLessThan('tablet')"
                  class="mobileDate"
                  :style="`color:${item.theme}`"
                >
                  Monthly-{{ formatDay(item.date) }}
                  <component v-if="item.icon" :is="item.icon" class="ms-2" />
                </div>
              </td>
              <td
                v-if="viewport.isGreaterOrEquals('tablet')"
                class="tableDate"
                :style="`color:${item.theme}`"
              >
                Monthly-{{ formatDay(item.date) }}
                <component v-if="item.icon" :is="item.icon" class="ms-2" />
              </td>
              <td class="tableAmount">
                {{ toCurrency(item.amount) }}
              </td>
            </tr>
          </DataTable>
        </div>
      </div>
    </template>
  </Container>
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
import { formatDay, toCurrency } from '~/utils/formatter'
import Container from '~/components/layout/Container.vue'
import RecurringBillsSummary from '~/components/recurringBills/RecurringBillsSummary.vue'
import { globalToday } from '~/content/date'

// eslint-disable-next-line no-undef
const viewport = useViewport()

const filterItems: { id: number; label: string }[] = [
  { id: 1, label: 'Latest' },
  { id: 2, label: 'Oldest' },
  { id: 3, label: 'A to Z' },
  { id: 4, label: 'Z to A' },
  { id: 5, label: 'Highest' },
  { id: 6, label: 'Lowest' },
]

const tableHead: string[] = ['Bill Title', 'Due Date', 'Amount']
const today = globalToday.getDate()

const recurringBills = computed(() => {
  return transactions
    .filter((transaction) => transaction.recurring)
    .sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name),
    )
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

const totalUpcoming = computed(() => {
  return recurringBills.value
    .filter((transaction) => new Date(transaction.date).getDate() > today)
    .map((obj) => ({ ...obj, theme: 'grey-500' }))
})

const displayItems = computed(() => {
  return [...paidBills.value, ...dueSoon.value, ...totalUpcoming.value]
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

  @media screen and (max-width: 530px) {
    vertical-align: bottom;
  }
}

.tableDate {
  font-size: $preset-5;
  vertical-align: middle;

  @media screen and (max-width: 530px) {
    vertical-align: middle;
  }
}

.mobileDate {
  font-weight: normal;
  font-size: $preset-5;
  margin-top: 0.5rem;
}
</style>
