<template>
  <div>
    <div v-for="item in displayItems" :key="item.label" class="row g-0 mb-3">
      <div
        class="col d-flex justify-content-between bg-beige-100 border-start border-4 rounded-3 py-5 px-4 fs-4"
        :class="`border-${item.theme}`"
      >
        <span class="text-grey-500">{{ item.label }}</span>
        <span class="fw-bold">{{ item.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/@types/types'
import { toCurrency } from '~/utils/formatter'
import { computed } from 'vue'
import { globalToday } from '~/content/date'

interface Props {
  transactions: Transaction[]
}

const props = defineProps<Props>()
const today: number = globalToday.getDate()

const paidBillsAmount = computed(() => {
  const paidBills = props.transactions.filter(
    (transaction) => new Date(transaction.date).getDate() < globalToday,
  )
  return toCurrency(
    paidBills
      .map((bill) => bill.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0),
  )
})

const totalUpcoming = computed(() => {
  const unpaidBills = props.transactions.filter(
    (transaction) => new Date(transaction.date).getDate() > today,
  )
  return toCurrency(
    unpaidBills
      .map((bill) => bill.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0),
  )
})

const dueSoon = computed(() => {
  const unpaidBillsDueInSevenDays = props.transactions.filter(
    (transaction) =>
      new Date(transaction.date).getDate() > today &&
      new Date(transaction.date).getDate() - today < 7,
  )
  return toCurrency(
    unpaidBillsDueInSevenDays
      .map((bill) => bill.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0),
  )
})

const displayItems = computed(() => {
  return [
    {
      label: 'Paid Bills',
      amount: paidBillsAmount,
      theme: 'green',
    },
    {
      label: 'Total Upcoming',
      amount: totalUpcoming,
      theme: 'yellow',
    },
    {
      label: 'Due Soon',
      amount: dueSoon,
      theme: 'cyan',
    },
  ]
})
</script>
