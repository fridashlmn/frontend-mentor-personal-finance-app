<template>
  <div>
    <InputField
      placeholder="e.g. 2000"
      type="text"
      label="Pot Name"
      class="mb-4"
    />
    <InputField
      placeholder="e.g. 2000"
      type="text"
      label="Target"
      class="mb-4"
      :prefix="true"
    >
      <template #prefix>$</template>
    </InputField>
    <SelectDropdown
      :select-items="itemsByCategory"
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
import { selectColors } from '~/content/selects'
import type { Pot } from '~/@types/types'
import { computed } from 'vue'

interface Props {
  pots: Pot[]
}
const props = defineProps<Props>()

const itemsByCategory = computed(() => {
  for (let i = 0; i < props.pots.length; i++) {
    for (let j = 0; j < selectColors.length; j++) {
      if (props.pots[i].theme.toLowerCase() === selectColors[j].theme) {
        selectColors[j].disabled = true
      }
    }
  }
  return selectColors.sort((a, b) => a.disabled - b.disabled)
})
</script>
