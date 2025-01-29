<template>
  <div>
    <div v-for="(transaction, index) in transactions" :key="index">
      <LatestTransactionItem
        :transaction="transaction"
        :colored-amount="true"
      />
      <hr v-if="index < transactions.length - 1" class="dividerLine" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/@types/types'
import LatestTransactionItem from '~/components/budgets/LatestTransactionItem.vue'

interface Props {
  transactions: Transaction[]
}
defineProps<Props>()
</script>
