<template>
  <div class="custom-select">
    <button
      class="select-button"
      role="combobox"
      aria-labelledby="select button"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-controls="select-dropdown"
      @click="handleClick()"
    >
      <span class="selected-value">{{ selectedItem.label }}</span>
      <span class="arrow"></span>
    </button>
    <ul class="select-dropdown" role="listbox" id="select-dropdown">
      <li
        v-for="item in selectItems"
        :key="item.id"
        role="option"
        @click="handleSelect(item)"
      >
        <input
          type="radio"
          :id="item.id.toString()"
          name="select"
          :checked="item.id === 1"
        />
        <label :for="item.id.toString()">
          {{ item.label }}
        </label>
        <hr v-if="item.id < selectItems.length" class="divider" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  selectItems: { id: number; label: string }[]
}
const props = defineProps<Props>()
const selectedItem = ref({
  id: props.selectItems[0].id,
  label: props.selectItems[0].label,
})

function handleClick(): void {
  const customSelect: Element | null = document.querySelector('.custom-select')
  const selectBtn: Element | null = document.querySelector('.select-button')
  customSelect?.classList.toggle('active')
  selectBtn?.setAttribute(
    'aria-expanded',
    selectBtn?.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
  )
}

function handleSelect(selected: { id: number; label: string }): void {
  const customSelect: Element | null = document.querySelector('.custom-select')
  selectedItem.value = selected
  customSelect?.classList.remove('active')
}
</script>
<style lang="scss" scoped>
@import 'assets/css/variables';
.custom-select {
  position: relative;
  font-size: $preset-4;
  color: $grey-900;

  .select-button {
    width: 100%;
    font-size: $preset-4;
    background-color: transparent;
    padding: 0.75rem 1.25rem;
    border: 1px solid #caced1;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .selected-value {
      text-align: left;
    }

    .arrow {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid $grey-900;
    }
  }

  .select-dropdown {
    position: absolute;
    list-style: none;
    width: 86%;
    left: 8%;
    background-color: #fff;
    border-radius: 8px;
    padding: 12px 20px;
    margin-top: 10px;
    overflow-y: auto;
    opacity: 0;
    visibility: hidden;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);

    li {
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

      label {
        width: 100%;
        padding: 0;
        cursor: pointer;
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .divider {
        width: 100%;
        border: 1px solid $grey-100;
        margin: 12px 0;
      }
    }

    input[type='radio'] {
      position: absolute;
      left: 0;
      opacity: 0;
    }

    li:hover,
    input:checked ~ label,
    input:focus ~ label {
      font-weight: bold;
    }
  }
}

.custom-select.active .select-dropdown {
  opacity: 1;
  visibility: visible;
}

.custom-select.active .arrow {
  transform: rotate(180deg);
}
</style>
