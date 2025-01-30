<template>
  <form class="formContainer">
    <div class="inputClass">
      <component v-if="prefixIcon" :is="prefixIcon" />
      <input
        class="form-control field"
        v-model="input"
        :type="type"
        :placeholder="placeholder"
        :aria-label="type"
      />
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
  prefixIcon?: string
  icon?: FunctionalComponent
  helperText?: string
}

withDefaults(defineProps<Props>(), {
  type: 'input',
})

const input = ref('')

function clearField(): void {
  input.value = ''
}
</script>
