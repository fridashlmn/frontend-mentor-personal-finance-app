<template>
  <form class="formContainer">
    <span class="fs-5 fw-bold text-grey-500 mb-1">{{ label }}</span>
    <div class="inputClass">
      <input
        class="form-control field"
        :class="{ inputWithPrefix: prefix }"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :aria-label="type"
      />
      <span class="inputPrefix fs-4 text-beige-500">
        <slot name="prefix" />
      </span>
      <div class="iconContainer">
        <component v-if="!inputValue" :is="icon" width="100%" height="100%" />
        <span v-else class="icon text-center" @click="clearField">x</span>
      </div>
    </div>
    <span v-if="helperText">{{ helperText }}</span>
  </form>
</template>
<script setup lang="ts">
import { type FunctionalComponent } from 'vue'
import { useInputStore } from '~/stores/input'
import { storeToRefs } from 'pinia'

interface Props {
  placeholder: string
  type?: string
  icon?: FunctionalComponent
  helperText?: string
  label?: string
  prefix?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'input',
  prefix: false,
})
const inputStore = useInputStore()
const { inputValue } = storeToRefs(inputStore)

function clearField(): void {
  inputStore.clear()
}
</script>
