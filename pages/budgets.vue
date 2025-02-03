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
              @delete="openDeleteBudgetModal"
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
                :button-label="modal.buttonLabel"
                :button-variant="modal.buttonVariant"
                :subline="modal.subline"
                :back-link="modal.backLink"
                @close="state.modalBudgets.hide()"
              >
                <BudgetForm
                  v-if="modal.variant === 'edit' || modal.variant === 'add'"
                  :budgets="budgets"
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
import { budgets, transactions } from '~/content/data.json'
import { globalToday } from '~/content/date'
import SpendingSummary from '~/components/budgets/SpendingSummary.vue'
import CategoryItem from '~/components/budgets/CategoryItem.vue'
import type { Transaction } from '~/@types/types'
import ModalContent from '~/components/layout/ModalContent.vue'
import BudgetForm from '~/components/budgets/BudgetForm.vue'

// eslint-disable-next-line no-undef
const { $bootstrap } = useNuxtApp()
const today = globalToday.getDate()
const thisMonth = globalToday.getMonth()
const modal = ref({
  variant: '',
  title: '',
  buttonLabel: '',
  buttonVariant: 'btn-primary ',
  subline: '',
  backLink: '',
})
const state = reactive({
  modalBudgets: null,
})

const currentTransactions = computed(() => {
  return transactions.filter(
    (transaction) =>
      new Date(transaction.date).getDate() < today &&
      new Date(transaction.date).getMonth() === thisMonth,
  )
})

function getCurrentTransactionsByCategory(category: string): Transaction[] {
  return currentTransactions.value.filter(
    (transaction) => transaction.category === category,
  )
}

function openAddBudgetModal(): void {
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.variant = 'add'
  modal.value.title = 'Add New Budget'
  modal.value.buttonLabel = 'Add Budget'
  modal.value.subline =
    'Choose a category to set a spending budget. These categories can help you monitor spending.'
  state.modalBudgets!.show()
}

function openEditBudgetModal(): void {
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.variant = 'edit'
  modal.value.title = 'Edit Budget'
  modal.value.buttonLabel = 'Save Changes'
  modal.value.subline =
    'As your budgets change, feel free to update your spending limits.'
  state.modalBudgets!.show()
}

function openDeleteBudgetModal(category: string): void {
  state.modalBudgets = new $bootstrap.Modal('#modalBudgets', {})
  modal.value.variant = 'delete'
  modal.value.title = `Delete '${category}'`
  modal.value.buttonLabel = 'Yes, Confirm Deletion'
  modal.value.buttonVariant = 'btn-danger'
  modal.value.backLink = 'No, Go Back'
  modal.value.subline =
    'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.'
  state.modalBudgets!.show()
}
</script>
