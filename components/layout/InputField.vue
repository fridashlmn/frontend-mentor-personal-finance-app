<template>
  <form class="formContainer">
    <span class="fs-5 fw-bold text-grey-500 mb-1">{{ label }}</span>
    <div class="inputClass">
      <input
        class="form-control field"
        :class="{ inputWithPrefix: prefix }"
        v-model="input"
        :type="type"
        :placeholder="placeholder"
        :aria-label="type"
      />
      <span class="inputPrefix fs-4 text-beige-500">
        <slot name="prefix" />
      </span>
      <div class="iconContainer">
        <component v-if="!input" :is="icon" width="100%" height="100%" />
        <span v-else class="icon text-center" @click="clearField">x</span>
      </div>
    </div>
    <span v-if="helperText">{{ helperText }}</span>
  </form>
</template>
<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { ref } from 'vue'

interface Props {
  placeholder: string
  type?: string
  icon?: FunctionalComponent
  helperText?: string
  label?: string
  prefix?: string
}

withDefaults(defineProps<Props>(), {
  type: 'input',
})

const input = ref('')

function clearField(): void {
  input.value = ''
}
</script>
