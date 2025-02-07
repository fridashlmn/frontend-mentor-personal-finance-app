<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Transactions</h1>
    </template>
    <template #content>
      <div class="table bg-white rounded-3 p-7 mt-5 mt-md-7">
        <nav class="navbar row p-0 justify-content-between">
          <InputField
            :store-i-d="1"
            placeholder="Search transaction"
            type="search"
            :icon="IconSearch"
            class="col col-md-3 col-lg-4"
          />
          <div
            class="col col-md-9 col-lg-8 d-flex justify-content-end align-items-center"
          >
            <SelectDropdown
              :select-items="selectSorting"
              helper-message="Sort by"
              icon="sort"
              @select="sortTransactions"
            />
            <SelectDropdown
              class="ms-6"
              :select-items="selectCategoriesWithAll"
              helper-message="Category"
              icon="filter"
              @select="filterTransactions"
            />
          </div>
        </nav>
        <DataTable class="mt-6" :table-head="tableHead">
          <template v-if="viewport.isGreaterOrEquals('tablet')">
            <tr v-for="(item, index) in displayedPosts" :key="index">
              <td class="fs-4 fw-bold">
                <img
                  :src="item.avatar"
                  alt="avatar"
                  class="avatar me-4 rounded-circle"
                />
                {{ item.name }}
              </td>
              <td class="fs-5 colorGrey-500">{{ item.category }}</td>
              <td class="fs-5 colorGrey-500">{{ formatDate(item.date) }}</td>
              <td
                class="fs-4 fw-bold text-end"
                :class="item.amount > 0 ? 'colorGreen' : ''"
              >
                <span class="pe-3">
                  {{ toCurrency(item.amount) }}
                </span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(item, index) in displayedPosts" :key="index">
              <td class="d-flex">
                <img
                  :src="item.avatar"
                  alt="avatar"
                  class="avatar me-4 rounded-circle"
                />
                <div class="d-flex flex-column">
                  <span class="fs-4 fw-bold">{{ item.name }}</span>
                  <span class="fs-5 colorGrey-500">{{ item.category }}</span>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <span
                    class="fs-4 fw-bold text-end"
                    :class="item.amount > 0 ? 'colorGreen' : ''"
                  >
                    {{ toCurrency(item.amount) }}
                  </span>
                  <span class="fs-5 colorGrey-500 text-end">
                    {{ formatDate(item.date) }}
                  </span>
                </div>
              </td>
            </tr>
          </template>
        </DataTable>
        <Pagination
          :total-items="sortedTransactions.length"
          :items-per-page="10"
          :max-pages-shown="5"
          v-model="displayCurrentPage"
        />
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import Container from '~/components/layout/Container.vue'
import DataTable from '~/components/layout/DataTable.vue'
import SelectDropdown from '~/components/layout/SelectDropdown.vue'
import InputField from '~/components/layout/InputField.vue'
import IconSearch from '~/assets/images/icon-search.svg?component'
import { formatDate, toCurrency } from '~/utils/formatter'
import type { SortOption, Transaction } from '~/@types/types'
import { ref, computed, watch } from 'vue'
import Pagination from '~/components/layout/Pagination.vue'
import { selectCategoriesWithAll, selectSorting } from '~/content/selects'
import { useTransactionsStore } from '~/stores/transactions'
import { useInputStore } from '~/stores/input'
import { storeToRefs } from 'pinia'

const transactionsStore = useTransactionsStore()
const inputStore = useInputStore(1)
const { inputValue } = storeToRefs(inputStore)

// eslint-disable-next-line no-undef
const viewport = useViewport()
const displayCurrentPage = ref(1)
const sortedTransactions = ref(transactionsStore.transactions)
const itemsPerPage = 10

const tableHead: string[] = [
  'Recipient/ Sender',
  'Category',
  'Transaction Date',
  'Amount',
]

const displayedPosts = computed(() => {
  const startIndex = (displayCurrentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const sorted = Array.isArray(sortedTransactions.value)
    ? sortedTransactions.value.slice(startIndex, endIndex)
    : []
  if (inputValue) {
    return sorted.filter((transaction: Transaction) =>
      transaction.name.toLowerCase().includes(inputValue.value.toLowerCase()),
    )
  }
  return sorted
})

function filterTransactions(selectedItem: { id: number; label: string }) {
  if (selectedItem.label === 'All Transactions') {
    sortedTransactions.value = transactionsStore.transactions
  } else {
    sortedTransactions.value = transactionsStore.transactions.filter(
      (transaction) => transaction.category === selectedItem.label,
    )
  }
}

function sortTransactions(selectedItem: SortOption) {
  if (selectedItem.direction === 'asc') {
    sortedTransactions.value.sort((a, b) =>
      a[selectedItem.sortBy] == b[selectedItem.sortBy]
        ? 0
        : a[selectedItem.sortBy] < b[selectedItem.sortBy]
          ? -1
          : 1,
    )
  } else if (selectedItem.direction === 'desc') {
    sortedTransactions.value.sort((a, b) =>
      a[selectedItem.sortBy] == b[selectedItem.sortBy]
        ? 0
        : a[selectedItem.sortBy] < b[selectedItem.sortBy]
          ? 1
          : -1,
    )
  }
}
</script>
