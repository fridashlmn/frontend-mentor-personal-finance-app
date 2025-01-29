<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Transactions</h1>
    </template>
    <template #content>
      <div class="table-responsive bg-white rounded-3 p-7 mt-6">
        <nav class="navbar row p-0 justify-content-between">
          <InputField
            class="col"
            placeholder="Search transaction"
            type="search"
            :icon="IconSearch"
          />
          <div class="col d-flex justify-content-end align-items-center">
            <SelectDropdown
              :select-items="sortFilterItems"
              helper-message="Sort by"
              icon="sort"
            />
            <SelectDropdown
              class="ms-6"
              :select-items="categoryFilterItems"
              helper-message="Category"
              icon="filter"
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
          :total-items="transactions.length"
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
import { transactions } from '~/content/data.json'
import { ref, computed } from 'vue'
import Pagination from '~/components/layout/Pagination.vue'
// eslint-disable-next-line no-undef
const viewport = useViewport()
const displayCurrentPage = ref(1)
const itemsPerPage = 10

const tableHead: string[] = [
  'Recipient/ Sender',
  'Category',
  'Transaction Date',
  'Amount',
]

const sortFilterItems: { id: number; label: string }[] = [
  { id: 1, label: 'Latest' },
  { id: 2, label: 'Oldest' },
  { id: 3, label: 'A to Z' },
  { id: 4, label: 'Z to A' },
  { id: 5, label: 'Highest' },
  { id: 6, label: 'Lowest' },
]

const categoryFilterItems: { id: number; label: string }[] = [
  { id: 1, label: 'All Transactions' },
  { id: 2, label: 'Entertainment' },
  { id: 3, label: 'Bills' },
  { id: 4, label: 'Groceries' },
  { id: 5, label: 'Dining Out' },
  { id: 6, label: 'Transportation' },
  { id: 7, label: 'Personal Care' },
]

const displayedPosts = computed(() => {
  const startIndex = (displayCurrentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return Array.isArray(transactions)
    ? transactions.slice(startIndex, endIndex)
    : []
})
</script>
<style lang="scss">
@import 'assets/css/variables';

.colorGrey-500 {
  color: $grey-500 !important;
}
</style>
