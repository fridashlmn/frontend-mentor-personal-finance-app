<template>
  <form @submit.prevent="handleSubmit">
    <template v-if="type === 'edit' || type === 'add'">
      <SelectDropdown
        :select-items="selectCategories"
        label="Budget Category"
        class="mb-4"
        dropdown-direction="dropdown-center"
        @select="(s) => (selectedCategory = s.label)"
      />
      <InputField
        placeholder="e.g. 2000"
        type="text"
        label="Maximum Spend"
        class="mb-4"
        :prefix="true"
      >
        <template #prefix>$</template>
      </InputField>
      <SelectDropdown
        :select-items="selectItemsBudgetColors"
        label="Theme"
        dropdown-direction="dropdown-center"
        :themed="true"
        @select="(s) => (selectedBudgetColor = s.theme)"
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
    <button
      type="submit"
      class="btn modalButton w-100 mt-5"
      :class="buttonVariant"
    >
      {{ buttonLabel }}
    </button>
  </form>
</template>
<script setup lang="ts">
import InputField from '~/components/layout/InputField.vue'
import SelectDropdown from '~/components/layout/SelectDropdown.vue'
import { selectCategories, selectColors } from '~/content/selects'
import type { Budget } from '~/@types/types'
import { computed, ref } from 'vue'
import { useBudgetsStore } from '~/stores/budgets'
import { useInputStore } from '~/stores/input'

const budgetStore = useBudgetsStore()
const inputStore = useInputStore()

interface Props {
  budgets: Budget[]
  buttonVariant: string
  buttonLabel: string
  type: string
  selectedBudgetCategory?: string
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const selectItemsBudgetColors = computed(() => {
  for (let i = 0; i < props.budgets.length; i++) {
    for (let j = 0; j < selectColors.length; j++) {
      if (props.budgets[i].theme === selectColors[j].theme) {
        selectColors[j].disabled = true
      }
    }
  }
  return selectColors.sort((a, b) => a.disabled - b.disabled)
})

const selectedCategory = ref<string>(selectCategories[0].label)
const selectedBudgetColor = ref(selectItemsBudgetColors.value[0].theme)

function handleSubmit(): void {
  if (props.type === 'delete') {
    budgetStore.delete(props.selectedBudgetCategory)
  }
  if (props.type === 'add') {
    budgetStore.add(
      selectedCategory.value,
      Number(inputStore.inputValue),
      selectedBudgetColor.value,
    )
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
