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
          <div v-for="(pot, index) in store.pots" :key="index" class="col">
            <PotItem
              class="mb-6"
              :pot="pot"
              @edit="openEditPotModal"
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
              :button-label="modal.buttonLabel"
              :button-variant="modal.buttonVariant"
              :subline="modal.subline"
              :back-link="modal.backLink"
              @close="state.modalPots.hide()"
            >
              <PotForm
                v-if="modal.variant === 'edit' || modal.variant === 'add'"
                :pots="store.pots"
              />
              <AddWithdramForm
                v-if="
                  modal.variant === 'addMoney' ||
                  modal.variant === 'withdrawMoney'
                "
                :variant="modal.variant"
                :pot="selectedPot"
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
import { reactive, ref } from 'vue'
import PotForm from '~/components/pots/PotForm.vue'
import AddWithdramForm from '~/components/pots/AddWithdramForm.vue'
import type { Pot } from '~/@types/types'
import { usePotsStore } from '@/stores/pots'

// eslint-disable-next-line no-undef
const { $bootstrap } = useNuxtApp()
const modal = ref({
  variant: '',
  title: '',
  buttonLabel: '',
  buttonVariant: 'btn-primary ',
  subline: '',
  backLink: '',
})
const state = reactive({
  modalPots: null,
})
const selectedPot = ref<Pot>()
const store = usePotsStore()

function openAddPotModal(): void {
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  modal.value.variant = 'add'
  modal.value.title = 'Add New Pot'
  modal.value.buttonLabel = 'Add Pot'
  modal.value.backLink = ''
  modal.value.subline =
    'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'
  state.modalPots!.show()
}

function openEditPotModal(): void {
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  modal.value.variant = 'edit'
  modal.value.title = 'Edit Pot'
  modal.value.buttonLabel = 'Save Changes'
  modal.value.backLink = ''
  modal.value.subline =
    'If your saving targets change, feel free to update your pots.'
  state.modalPots!.show()
}

function openDeletePotModal(pot: Pot): void {
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  modal.value.variant = 'delete'
  modal.value.title = `Delete '${pot.name}'`
  modal.value.buttonLabel = 'Yes, Confirm Deletion'
  modal.value.buttonVariant = 'btn-danger'
  modal.value.backLink = 'No, Go Back'
  modal.value.subline =
    'Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.'
  state.modalPots!.show()
}

function openAddMoneyModal(pot: Pot): void {
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  selectedPot.value = pot
  modal.value.variant = 'addMoney'
  modal.value.title = `Add to '${pot.name}'`
  modal.value.buttonLabel = 'Confirm Addition'
  modal.value.backLink = ''
  modal.value.subline =
    'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.'
  state.modalPots!.show()
}

function openWithdrawMoneyModal(pot: Pot): void {
  state.modalPots = new $bootstrap.Modal('#modalPots', {})
  selectedPot.value = pot
  modal.value.variant = 'withdrawMoney'
  modal.value.title = `Withdraw from '${pot.name}'`
  modal.value.buttonLabel = 'Confirm Withdrawal'
  modal.value.backLink = ''
  modal.value.subline =
    'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.'
  state.modalPots!.show()
}
</script>
