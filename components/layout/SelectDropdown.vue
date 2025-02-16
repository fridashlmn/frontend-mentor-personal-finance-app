<template>
  <div class="d-flex align-items-center">
    <span
      v-if="helperMessage && viewport.isGreaterOrEquals('tablet')"
      class="w-100 me-2 colorGrey-500 fs-4 text-end"
    >
      {{ helperMessage }}
    </span>
    <div class="btn-group w-100 d-flex flex-column" :class="dropdownDirection">
      <span class="fs-5 fw-bold text-grey-500 mb-1">{{ title }}</span>
      <button
        v-if="viewport.isGreaterOrEquals('tablet') || !icon"
        class="btn btn-info dropdown-toggle with d-flex align-items-center justify-content-between"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span class="d-flex">
          <slot name="dropdownButtonPrefix" :theme="selectedItem.theme" />
          <span class="me-4">{{ selectedItem.label }}</span>
        </span>
        <IconCaretDown class="align-middle iconDark" />
      </button>
      <div
        v-else
        class="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <IconSort v-if="icon === 'sort'" />
        <IconFilter v-if="icon === 'filter'" />
      </div>
      <ul class="dropdown-menu w-100">
        <li v-for="(item, index) in selectItems" :key="item.id">
          <span class="d-flex align-items-center">
            <slot name="dropdownItemPrefix" :theme="item.theme" />
            <a
              class="dropdown-item"
              :class="{
                active: item.id === selectedItem.id,
                disabled: item.disabled,
              }"
              @click="handleSelect(item)"
            >
              {{ item.label }}
            </a>
            <slot v-if="item.disabled" name="dropdownItemSuffix" />
          </span>
          <hr v-if="index < selectItems.length - 1" class="divider" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconSort from '~/assets/images/icon-sort-mobile.svg'
import IconFilter from '~/assets/images/icon-filter-mobile.svg'
import IconCaretDown from '~/assets/images/icon-caret-down.svg?component'
import type { SelectItem } from '~/@types/types'

interface Props {
  title?: string
  helperMessage?: string
  icon?: 'sort' | 'filter'
  dropdownDirection?: string
  selectItems: SelectItem[]
}
const props = withDefaults(defineProps<Props>(), {
  dropdownDirection: 'dropstart',
})
// eslint-disable-next-line no-undef
const viewport = useViewport()
const emit = defineEmits(['select'])

const selectedItem = ref<SelectItem>({
  id: props.selectItems[0].id,
  label: props.selectItems[0].label,
  disabled: props.selectItems[0].disabled,
  theme: props.selectItems[0].theme || '',
})

function handleSelect(item: SelectItem): void {
  selectedItem.value = item
  emit('select', selectedItem.value)
}
</script>
