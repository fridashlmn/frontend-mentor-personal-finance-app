<template>
  <div>
    <Container>
      <template #header>
        <h1 class="col fw-bold m-0">Pots</h1>
        <button class="col btn btn-primary" @click="openAddPotModal">
          + Add New Pot
        </button>
      </template>
      <template #content>
        <div class="row row-cols-1 row-cols-lg-2 gx-6 mt-5 mt-md-7">
          <div v-for="(pot, index) in pots" :key="index" class="col">
            <PotItem
              class="mb-6"
              :pot="pot"
              @delete="openDeletePotModal"
              @add-money="openAddMoneyModal"
              @withdraw-money="openWithdrawMoneyModal"
            />
          </div>
        </div>
      </template>
      <!--MODAL-->
    </Container>
    <div>
      <div class="modal fade" id="modalPots" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <ModalContent
              :title="modal.title"
              :sub-line="modal.subLine"
              :back-link="modal.backLink"
              @close="closeModal"
            >
              <PotAddForm
                v-if="modal.type === 'add' && selectedPot"
                :pots="pots"
                :type="modal.type"
                :button-label="modal.buttonLabel"
                :button-variant="modal.buttonVariant"
                :selected-pot="selectedPot"
                @close="closeModal"
              />
              <AddWithdrawForm
                v-if="
                  (modal.type === 'addMoney' ||
                    modal.type === 'withdrawMoney') &&
                  selectedPot
                "
                :type="modal.type"
                :pot="selectedPot"
                :button-label="modal.buttonLabel"
                :button-variant="modal.buttonVariant"
                @close="closeModal"
              />

              <FormContainer
                v-if="modal.type === 'delete'"
                :button-label="modal.buttonLabel"
                :button-variant="modal.buttonVariant"
                @handle-submit="deletePot"
              />
            </ModalContent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PotItem from '~/components/pots/PotItem.vue'
import Container from '~/components/layout/Container.vue'
import ModalContent from '~/components/layout/ModalContent.vue'
import { reactive, ref, computed } from 'vue'
import PotAddForm from '~/components/pots/PotAddForm.vue'
import AddWithdrawForm from '~/components/pots/AddWithdrawForm.vue'
import type { Pot } from '~/@types/types'
import { usePotsStore } from '@/stores/pots'
import { useInputStore } from '~/stores/input'
import FormContainer from '~/components/layout/FormContainer.vue'

const potStore = usePotsStore()
const pots = computed(() => potStore.pots)
const inputStore1 = useInputStore(1)
const inputStore2 = useInputStore(2)

// eslint-disable-next-line no-undef
const { $bootstrap } = useNuxtApp()
const modal = ref({
  type: '',
  title: '',
  buttonLabel: '',
  buttonVariant: 'btn-primary ',
  subLine: '',
  backLink: '',
})
const state = reactive({
  modalPots: null,
})
const selectedPot = ref<Pot>()

function openAddPotModal(): void {
  // @ts-expect-error bootstrap import
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  modal.value.type = 'add'
  modal.value.title = 'Add New Pot'
  modal.value.buttonLabel = 'Add Pot'
  modal.value.backLink = ''
  modal.value.subLine =
    'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'
  state.modalPots!.show()
}

function openDeletePotModal(pot: Pot): void {
  // @ts-expect-error bootstrap import
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  selectedPot.value = pot
  modal.value.type = 'delete'
  modal.value.title = `Delete '${pot.name}'`
  modal.value.buttonLabel = 'Yes, Confirm Deletion'
  modal.value.buttonVariant = 'btn-danger'
  modal.value.backLink = 'No, Go Back'
  modal.value.subLine =
    'Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.'
  state.modalPots!.show()
}

function openAddMoneyModal(pot: Pot): void {
  // @ts-expect-error bootstrap import
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  selectedPot.value = pot
  modal.value.type = 'addMoney'
  modal.value.title = `Add to '${pot.name}'`
  modal.value.buttonLabel = 'Confirm Addition'
  modal.value.backLink = ''
  modal.value.subLine =
    'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.'
  state.modalPots!.show()
}

function openWithdrawMoneyModal(pot: Pot): void {
  // @ts-expect-error bootstrap import
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  selectedPot.value = pot
  modal.value.type = 'withdrawMoney'
  modal.value.title = `Withdraw from '${pot.name}'`
  modal.value.buttonLabel = 'Confirm Withdrawal'
  modal.value.backLink = ''
  modal.value.subLine =
    'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.'
  state.modalPots!.show()
}

function closeModal(): void {
  inputStore1.clear()
  inputStore2.clear()
  state.modalPots!.hide()
}

function deletePot() {
  potStore.delete(selectedPot.value!)
}
</script>
