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
        :maxlength="maxlength"
        @input="error = ''"
      />
      <span class="inputPrefix fs-4 text-beige-500">
        <slot name="prefix" />
      </span>
      <div class="iconContainer">
        <component v-if="!inputValue" :is="icon" width="100%" height="100%" />
        <span v-else class="icon text-center" @click="clearField">x</span>
      </div>
    </div>
    <div v-if="error || maxlength" class="w-100 text-end">
      <span class="fs-5" :class="error ? 'text-red' : 'text.beige-500'">
        {{ error || helperMessage }}
      </span>
    </div>
  </form>
</template>
<script setup lang="ts">
import { type FunctionalComponent, computed } from 'vue'
import { useInputStore } from '~/stores/input'
import { storeToRefs } from 'pinia'

interface Props {
  storeID: number
  placeholder: string
  type?: string
  icon?: FunctionalComponent
  label?: string
  prefix?: boolean
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'input',
  prefix: false,
})

const inputStore = useInputStore(props.storeID)
const { inputValue, error } = storeToRefs(inputStore)

const helperMessage = computed<string>(() => {
  if (props.maxlength) {
    const charactersLeft = props.maxlength - inputValue.value.toString().length
    return `${charactersLeft} characters left`
  }
  return ''
})

function clearField(): void {
  inputStore.clear()
}
</script>
