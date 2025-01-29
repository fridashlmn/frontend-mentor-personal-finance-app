<template>
  <div class="col col-lg-4">
    <div
      class="row fullHeight gx-6 row-cols-1 row-cols-md-2 row-cols-lg-1 justify-content-between align-content-lg-start"
    >
      <Card background-color="grey-900" variant="responsive" class="col mb-6">
        <template #header>
          <IconRecurringBills class="my-5 me-5 me-md-0" />
        </template>
        <template #content>
          <div class="text-white">
            <span class="fs-4 fw-normal">Total Bills</span>
            <p class="fs-1 fw-bold m-0">{{ recurringBillsTotalAmount }}</p>
          </div>
        </template>
      </Card>
      <Card variant="extraSmall" class="col mb-6">
        <template #header>
          <span class="fs-3 fw-bold mb-2">Summary</span>
        </template>
        <template #content>
          <div class="fs-5">
            <div class="d-flex justify-content-between">
              <span>Paid Bills</span>
              <span class="fw-bold">
                {{ paidBills.length }} ({{ paidBillsTotalAmount }})
              </span>
            </div>
            <hr class="dividerLine" />
            <div class="d-flex justify-content-between">
              <span>Total Upcoming</span>
              <span class="fw-bold">
                {{ totalUpcoming.length }} ({{ totalUpcomingTotalAmount }})
              </span>
            </div>
            <hr class="dividerLine" />
            <div class="d-flex justify-content-between text-red">
              <span>Due Soon</span>
              <span class="fw-bold">
                {{ dueSoon.length }} ({{ dueSoonTotalAmount }})
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from '~/components/layout/Card.vue'
import IconRecurringBills from '~/assets/images/icon-recurring-bills.svg?component'
import type { Transaction } from '~/@types/types'
import { computed } from 'vue'
import { toCurrency } from '~/utils/formatter'
interface Props {
  recurringBills: Transaction[]
  paidBills: Transaction[]
  totalUpcoming: Transaction[]
  dueSoon: Transaction[]
}
const props = defineProps<Props>()

const recurringBillsTotalAmount = computed(() => {
  return toCurrency(
    props.recurringBills
      .map((bill) => bill.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator - currentValue
      }, 0),
  )
})

const paidBillsTotalAmount = computed(() => {
  return toCurrency(
    props.paidBills
      .map((bill) => bill.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator - currentValue
      }, 0),
  )
})

const totalUpcomingTotalAmount = computed(() => {
  return toCurrency(
    props.totalUpcoming
      .map((bill) => bill.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator - currentValue
      }, 0),
  )
})

const dueSoonTotalAmount = computed(() => {
  return toCurrency(
    props.dueSoon
      .map((bill) => bill.amount)
      .reduce((accumulator, currentValue) => {
        return accumulator - currentValue
      }, 0),
  )
})
</script>
<style lang="scss">
@import 'assets/css/variables';

.fullHeight {
  height: 100%;
}
</style>
