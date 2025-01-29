<template>
  <div class="d-flex align-items-center justify-content-between">
    <div>
      <img
        :src="transaction.avatar"
        alt="avatar"
        class="avatar me-4 rounded-circle mobileHidden"
      />
      <span class="fs-5 fw-bold">{{ transaction.name }}</span>
    </div>
    <div class="d-flex flex-column fs-5 text-end">
      <span class="fw-bold mb-1">{{ toCurrency(transaction.amount) }}</span>
      <span class="text-grey-500">{{ formatDate(transaction.date) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/@types/types'
import { formatDate, toCurrency } from '~/utils/formatter'

interface Props {
  transaction: Transaction
}
defineProps<Props>()
</script>
<style lang="scss">
.mobileHidden {
  @media screen and (max-width: 530px) {
    display: none;
  }
}
</style>
