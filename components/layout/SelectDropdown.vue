<template>
  <div>
    <span
      v-if="helperMessage && viewport.isGreaterOrEquals('tablet')"
      class="w-100 me-2 text-grey-500 fs-4 text-end"
    >
      {{ helperMessage }}
    </span>
    <div class="btn-group dropstart">
      <button
        v-if="viewport.isGreaterOrEquals('tablet')"
        class="btn btn-info dropdown-toggle with"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span class="me-4">{{ selectedItem.label }}</span>
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
      <ul class="dropdown-menu">
        <li v-for="item in selectItems" :key="item.id">
          <a
            class="dropdown-item"
            :class="{ active: item.id === selectedItem.id }"
            @click="handleSelect(item)"
          >
            {{ item.label }}
          </a>
          <hr v-if="item.id < selectItems.length" class="divider" />
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

interface Props {
  selectItems: { id: number; label: string }[]
  helperMessage?: string
  icon?: 'sort' | 'filter'
}
const props = defineProps<Props>()

// eslint-disable-next-line no-undef
const viewport = useViewport()

const selectedItem = ref({
  id: props.selectItems[0].id,
  label: props.selectItems[0].label,
})

function handleSelect(item: { id: number; label: string }): void {
  selectedItem.value = item
}
</script>
