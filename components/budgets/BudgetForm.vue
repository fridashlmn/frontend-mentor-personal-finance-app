<template>
  <div>
    <SelectDropdown
      :select-items="selectCategories"
      label="Budget Category"
      class="mb-4"
      dropdown-direction="dropdown-center"
    />
    <InputField
      placeholder="e.g. 2000"
      type="text"
      label="Maximum Spend"
      class="mb-4"
      prefix="ads"
    >
      <template #prefix>$</template>
    </InputField>
    <SelectDropdown
      :select-items="selectItemsBudgetColors"
      label="Theme"
      dropdown-direction="dropdown-center"
      :themed="true"
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
  </div>
</template>
<script setup lang="ts">
import InputField from '~/components/layout/InputField.vue'
import SelectDropdown from '~/components/layout/SelectDropdown.vue'
import { selectCategories, selectColors } from '~/content/selects'
import type { Budget } from '~/@types/types'
import { computed } from 'vue'

interface Props {
  budgets: Budget[]
}
const props = defineProps<Props>()

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
</script>
