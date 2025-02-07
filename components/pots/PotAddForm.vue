<template>
  <FormContainer
    :button-label="buttonLabel"
    :button-variant="buttonVariant"
    @handle-submit="addPot"
  >
    <InputField
      :store-i-d="1"
      label="Pot Name"
      placeholder="e.g. Rainy Days"
      type="text"
      :maxlength="30"
      class="mb-4"
    />
    <InputField
      :store-i-d="2"
      label="Target"
      placeholder="e.g. 2000"
      type="number"
      :prefix="true"
      class="mb-4"
    >
      <template #prefix>$</template>
    </InputField>
    <SelectDropdown
      title="Theme"
      dropdown-direction="dropdown-center"
      :select-items="selectOptionsColors"
      @select="(s) => (selectedPotColor = s.theme)"
    >
      <template #dropdownButtonPrefix="dropdownButtonPrefixProps">
        <span
          class="dot me-4"
          :style="`background-color: ${dropdownButtonPrefixProps.theme}`"
        />
      </template>
      <template #dropdownItemPrefix="dropdownItemPrefixProps">
        <span
          class="dot me-4"
          :style="`background-color: ${dropdownItemPrefixProps.theme}`"
        />
      </template>
      <template #dropdownItemSuffix>
        <span class="fs-5 colorGrey-500 nowrap">Already used</span>
      </template>
    </SelectDropdown>
  </FormContainer>
</template>
<script setup lang="ts">
import InputField from '~/components/layout/InputField.vue'
import SelectDropdown from '~/components/layout/SelectDropdown.vue'
import { selectColors } from '~/content/selects'
import type { Pot, SelectItem } from '~/@types/types'
import { computed, ref } from 'vue'
import { usePotsStore } from '~/stores/pots'
import { useInputStore } from '~/stores/input'
import { findUsedProperties } from '~/utils/array'
import FormContainer from '~/components/layout/FormContainer.vue'

interface Props {
  pots: Pot[]
  buttonVariant: string
  buttonLabel: string
  type: string
  selectedPot?: Pot
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const potsStore = usePotsStore()
const inputStore1 = useInputStore(1)
const inputStore2 = useInputStore(2)

const selectOptionsColors = computed<SelectItem[]>(() => {
  return findUsedProperties(
    props.pots as [],
    selectColors as [],
    'theme',
    'theme',
  )
})

const selectedPotColor = ref(selectOptionsColors.value[0].theme)

function addPot(): void {
  if (props.type === 'add') {
    if (!inputStore1.inputValue) {
      inputStore1.error = 'Cannot be empty'
      return
    }
    if (!inputStore2.inputValue) {
      inputStore2.error = 'Cannot be empty'
      return
    }
    const newPot: Pot = {
      name: inputStore1.inputValue,
      target: Number(inputStore2.inputValue),
      total: 0,
      theme: selectedPotColor.value || '',
    }
    potsStore.add(newPot)
  }
  emit('close')
}
</script>
