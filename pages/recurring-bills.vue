<template>
  <div class="container overflow-hidden px-4 px-md-8 py-6 py-md-7">
    <div class="row">
      <h1 class="col fw-bold">Recurring Bills</h1>
    </div>
    <div class="row">
      <div class="col-4">Card 1</div>
      <div class="col-8 table-responsive bg-white rounded-3 p-7">
        <nav class="navbar row">
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
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Bill Title</th>
              <th scope="col">Due Date</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recurringBills" :key="item.date">
              <td>
                <img
                  :src="item.avatar"
                  alt="avatar"
                  class="avatar rounded-circle"
                />
                {{ item.name }}
              </td>
              <td>{{ formattedDueDate(item.date) }}</td>
              <td>{{ toCurrency(item.amount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-4">Card 2</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toCurrency } from '~/utils/formatter'
import { transactions } from '~/content/data.json'
import InputField from '~/components/layout/InputField.vue'
import SelectDropdown from '~/components/layout/SelectDropdown.vue'
import IconSearch from '~/assets/images/icon-search.svg?component'
import { computed } from 'vue'

const recurringBills = computed(() => {
  const recurringBills = transactions
    .filter((transaction) => transaction.recurring)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  return recurringBills.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name),
  )
})

const filterItems: { id: number; label: string }[] = [
  { id: 1, label: 'Latest' },
  { id: 2, label: 'Oldest' },
  { id: 3, label: 'A to Z' },
  { id: 4, label: 'Z to A' },
  { id: 5, label: 'Highest' },
  { id: 6, label: 'Lowest' },
]

function formattedDueDate(date: string) {
  const number = new Date(date).getDate()
  const nthNumber =
    number > 0
      ? ['th', 'st', 'nd', 'rd'][
          (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
        ]
      : ''
  return `Monthly-${number}${nthNumber}`
}
</script>
<style>
.avatar {
  width: 2rem;
  height: 2rem;
}
</style>
