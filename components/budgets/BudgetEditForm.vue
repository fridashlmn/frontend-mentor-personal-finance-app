<template>
  <FormContainer
    :button-label="buttonLabel"
    :button-variant="buttonVariant"
    @handle-submit="editBudget"
  >
    <SelectDropdown
      class="mb-4"
      title="Budget Category"
      dropdown-direction="dropdown-center"
      :select-items="selectOptionsCategories"
      @select="(s) => (selectedCategory = s.category)"
    >
      <template #dropdownItemSuffix>
        <span class="fs-5 colorGrey-500 nowrap">Already used</span>
      </template>
    </SelectDropdown>
    <InputField
      :store-i-d="1"
      label="Maximum Spend"
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
      @select="(s) => (selectedColor = s.theme)"
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
import { selectCategories, selectColors } from '~/content/selects'
import type { Budget, SelectItem } from '~/@types/types'
import { computed, ref } from 'vue'
import { useBudgetsStore } from '~/stores/budgets'
import { useInputStore } from '~/stores/input'
import FormContainer from '~/components/layout/FormContainer.vue'
import { findUsedProperties } from '~/utils/array'

interface Props {
  budgets: Budget[]
  buttonVariant: string
  buttonLabel: string
  selectedBudget: Budget
}
const props = defineProps<Props>()

const emit = defineEmits(['close'])
const budgetStore = useBudgetsStore()
const inputStore = useInputStore(1)
const selectOptionsCategories = computed<SelectItem[]>(() => {
  const array = props.budgets.filter(
    (budget: Budget) => budget.category !== props.selectedBudget.category,
  )
  const categories = [...selectCategories].map((category) => ({ ...category }))
  return findUsedProperties(
    array as [],
    categories as [],
    'category',
    'label',
  ).filter((entry: SelectItem) => entry.label !== props.selectedBudget.category)
})

const selectOptionsColors = computed<SelectItem[]>(() => {
  const array = props.budgets.filter(
    (budget: Budget) => budget.theme !== props.selectedBudget.theme,
  )
  const colors = [...selectColors].map((color) => ({ ...color }))
  return findUsedProperties(array as [], colors as [], 'theme', 'theme').filter(
    (entry: SelectItem) => entry.label !== props.selectedBudget.theme,
  )
})

const selectedCategory = ref<string>(selectOptionsCategories.value[0].label)
const selectedColor = ref<string>(selectOptionsColors.value[0].theme!)

function editBudget(): void {
  if (!inputStore.inputValue) {
    inputStore.error = 'Cannot be empty'
    return
  }
  const newBudget: Budget = {
    category: selectedCategory.value,
    maximum: Number(inputStore.inputValue),
    theme: selectedColor.value || '',
  }
  budgetStore.edit(props.selectedBudget, newBudget)
  emit('close')
}
</script>
