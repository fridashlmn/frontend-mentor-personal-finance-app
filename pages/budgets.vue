<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Budgets</h1>
      <button class="col btn btn-primary" @click="openAddBudgetModal">
        + Add New Budget
      </button>
    </template>
    <template #content>
      <div class="row gx-6 mt-5 mt-md-7">
        <div class="col-lg-5">
          <SpendingSummary
            class="mb-6"
            :budgets="budgets"
            :current-transactions="currentTransactions"
          />
        </div>
        <div class="col-lg-7">
          <div v-for="budget in budgets" :key="budget.category">
            <CategoryItem
              class="mb-6"
              :budget="budget"
              :transactions="getCurrentTransactionsByCategory(budget.category)"
              @edit="openEditBudgetModal"
              @delete="openDeleteBudgetModal(budget.category)"
            />
          </div>
        </div>
      </div>
      <!--MODAL-->
      <div>
        <div
          class="modal fade"
          id="modalBudgets"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <ModalContent
                :title="modal.title"
                :subline="modal.subline"
                :back-link="modal.backLink"
                @close="closeModal"
              >
                <BudgetForm
                  :budgets="budgets"
                  :type="modal.type"
                  :selected-budget-category="selectedBudgetCategory"
                  :button-label="modal.buttonLabel"
                  :button-variant="modal.buttonVariant"
                  @close="closeModal"
                />
              </ModalContent>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import Container from '~/components/layout/Container.vue'
import { computed, reactive, ref } from 'vue'
import { globalToday } from '~/content/date'
import SpendingSummary from '~/components/budgets/SpendingSummary.vue'
import CategoryItem from '~/components/budgets/CategoryItem.vue'
import type { Transaction } from '~/@types/types'
import ModalContent from '~/components/layout/ModalContent.vue'
import BudgetForm from '~/components/budgets/BudgetForm.vue'
import { useBudgetsStore } from '~/stores/budgets'
import { useTransactionsStore } from '~/stores/transactions'
import { storeToRefs } from 'pinia'
import { useInputStore } from '~/stores/input'

const budgetStore = useBudgetsStore()
const { budgets } = storeToRefs(budgetStore)
const transactionsStore = useTransactionsStore()
const transactions = computed(() => transactionsStore.transactions)
const inputStore = useInputStore()

// eslint-disable-next-line no-undef
const { $bootstrap } = useNuxtApp()
const today = globalToday.getDate()
const thisMonth = globalToday.getMonth()
const modal = ref({
  type: '',
  title: '',
  buttonLabel: '',
  buttonVariant: 'btn-primary ',
  subline: '',
  backLink: '',
})

const state = reactive({
  modalBudgets: null,
  categoryInModal: '',
})

const selectedBudgetCategory = ref<string>()

const currentTransactions = computed(() => {
  return transactions.value.filter(
    (transaction: Transaction) =>
      new Date(transaction.date).getDate() < today &&
      new Date(transaction.date).getMonth() === thisMonth,
  )
})

function getCurrentTransactionsByCategory(category: string): Transaction[] {
  return currentTransactions.value.filter(
    (transaction: Transaction) => transaction.category === category,
  )
}

function openAddBudgetModal(): void {
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.type = 'add'
  modal.value.title = 'Add New Budget'
  modal.value.buttonLabel = 'Add Budget'
  modal.value.subline =
    'Choose a category to set a spending budget. These categories can help you monitor spending.'
  state.modalBudgets!.show()
}

function openEditBudgetModal(): void {
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.type = 'edit'
  modal.value.title = 'Edit Budget'
  modal.value.buttonLabel = 'Save Changes'
  modal.value.subline =
    'As your budgets change, feel free to update your spending limits.'
  state.modalBudgets!.show()
}

function openDeleteBudgetModal(category: string): void {
  selectedBudgetCategory.value = category
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.type = 'delete'
  modal.value.title = `Delete '${category}'`
  modal.value.buttonLabel = 'Yes, Confirm Deletion'
  modal.value.buttonVariant = 'btn-danger'
  modal.value.backLink = 'No, Go Back'
  modal.value.subline =
    'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.'
  state.modalBudgets!.show()
}

function closeModal(): void {
  inputStore.clear()
  state.modalBudgets!.hide()
}
</script>
