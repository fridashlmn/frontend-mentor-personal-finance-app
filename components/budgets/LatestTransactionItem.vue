<template>
  <div class="d-flex align-items-center justify-content-between">
    <div>
      <img
        :src="transaction.avatar"
        alt="avatar"
        class="me-4 rounded-circle mobileHidden"
        :class="small ? 'avatar' : 'avatarBig'"
      />
      <span class="fw-bold" :class="small ? 'fs-5' : 'f-4'">
        {{ transaction.name }}
      </span>
    </div>
    <div class="d-flex flex-column text-end">
      <span
        class="fw-bold text-end mb-1 fs-4"
        :class="{
          'colorGreen': transaction.amount > 0 && !!coloredAmount,
          'fs-5': small,
        }"
      >
        {{ toCurrency(transaction.amount) }}
      </span>
      <span class="text-grey-500 fs-5">{{ formatDate(transaction.date) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/@types/types'
import { formatDate, toCurrency } from '~/utils/formatter'

interface Props {
  transaction: Transaction
  coloredAmount?: boolean
  small?: boolean
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
