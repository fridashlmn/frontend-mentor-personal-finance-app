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
              @delete="openDeleteBudgetModal(budget)"
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
                :sub-line="modal.subLine"
                :back-link="modal.backLink"
                @close="closeModal"
              >
                <BudgetAddForm
                  v-if="modal.type === 'add'"
                  :budgets="budgets"
                  :type="modal.type"
                  :selected-budget="selectedBudget"
                  :button-label="modal.buttonLabel"
                  :button-variant="modal.buttonVariant"
                  @close="closeModal"
                />
                <FormContainer
                  v-if="modal.type === 'delete'"
                  :button-label="modal.buttonLabel"
                  :button-variant="modal.buttonVariant"
                  @handle-submit="deleteBudget"
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
import type { Budget, Transaction } from '~/@types/types'
import ModalContent from '~/components/layout/ModalContent.vue'
import BudgetAddForm from '~/components/budgets/BudgetAddForm.vue'
import { useBudgetsStore } from '~/stores/budgets'
import { useTransactionsStore } from '~/stores/transactions'
import { storeToRefs } from 'pinia'
import { useInputStore } from '~/stores/input'
import FormContainer from '~/components/layout/FormContainer.vue'

const budgetStore = useBudgetsStore()
const { budgets } = storeToRefs(budgetStore)
const transactionsStore = useTransactionsStore()
const transactions = computed(() => transactionsStore.transactions)
const inputStore = useInputStore(1)

// eslint-disable-next-line no-undef
const { $bootstrap } = useNuxtApp()
const today = globalToday.getDate()
const thisMonth = globalToday.getMonth()

const modal = ref({
  type: '',
  title: '',
  buttonLabel: '',
  buttonVariant: 'btn-primary ',
  subLine: '',
  backLink: '',
})

const state = reactive({
  modalBudgets: null,
})

const selectedBudget = ref<Budget>()

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
  // @ts-expect-error bootstrap import
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.type = 'add'
  modal.value.title = 'Add New Budget'
  modal.value.buttonLabel = 'Add Budget'
  modal.value.subLine =
    'Choose a category to set a spending budget. These categories can help you monitor spending.'
  state.modalBudgets!.show()
}

function openDeleteBudgetModal(budget: Budget): void {
  selectedBudget.value = budget
  // @ts-expect-error bootstrap import
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.type = 'delete'
  modal.value.title = `Delete '${budget.category}'`
  modal.value.buttonLabel = 'Yes, Confirm Deletion'
  modal.value.buttonVariant = 'btn-danger'
  modal.value.backLink = 'No, Go Back'
  modal.value.subLine =
    'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.'
  state.modalBudgets!.show()
}

function deleteBudget(): void {
  budgetStore.delete(selectedBudget.value!)
  closeModal()
}

function closeModal(): void {
  inputStore.clear()
  modal.value.type = ''
  state.modalBudgets!.hide()
}
</script>
