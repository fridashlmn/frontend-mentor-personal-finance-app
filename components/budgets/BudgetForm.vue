<template>
  <FormContainer
    :button-label="buttonLabel"
    :button-variant="buttonVariant"
    @handle-submit="handleSubmit"
  >
    <template v-if="type === 'edit' || type === 'add'">
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
    </template>
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
  type: string
  selectedBudget?: Budget
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])
const budgetStore = useBudgetsStore()
const inputStore1 = useInputStore(1)

const selectOptionsCategories = computed<SelectItem[]>(() => {
  return findUsedProperties(
    props.budgets as [],
    selectCategories as [],
    'category',
    'label',
  )
})

const selectOptionsColors = computed<SelectItem[]>(() => {
  return findUsedProperties(
    props.budgets as [],
    selectColors as [],
    'theme',
    'theme',
  )
})

const selectedCategory = ref<string>(selectOptionsCategories.value[0].label)
const selectedColor = ref<string>(selectOptionsColors.value[0].theme)

function handleSubmit(): void {
  if (props.type === 'delete') {
    budgetStore.delete(props.selectedBudget!)
  }
  if (props.type === 'add') {
    if (!inputStore1.inputValue) {
      inputStore1.error = 'Cannot be empty'
      return
    }
    const newBudget: Budget = {
      category: selectedCategory.value,
      maximum: Number(inputStore1.inputValue),
      theme: selectedColor.value || '',
    }
    budgetStore.add(newBudget)
  }
  emit('close')
}
</script>
<style lang="scss">
.modalButton {
  max-width: none;
  width: 100%;
}
</style>
