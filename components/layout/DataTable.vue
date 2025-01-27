<template>
  <table class="table">
    <thead v-if="viewport.isGreaterThan('tablet')" class="tHead">
      <tr>
        <th v-for="(item, index) in tableHead" :key="index" scope="col">
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody class="tBody">
      <slot />
    </tbody>
  </table>
</template>
<script setup lang="ts">
interface Props {
  tableHead: string[]
}
defineProps<Props>()

// eslint-disable-next-line no-undef
const viewport = useViewport()
</script>
<style lang="scss">
@import 'assets/css/variables';
.table > .tHead > * > * {
  color: $grey-500;
  padding: 0.75rem 0.75rem;
  font-size: $preset-5;
  font-weight: normal;
}

.table > .tBody > * > * {
  color: $grey-900;
  padding: 1.25rem 0;
}
</style>
