<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Pots</h1>
      <button class="col btn btn-primary">+ Add New Pot</button>
    </template>
    <template #content>
      <div class="row row-cols-1 row-cols-lg-2 g-6 my-2 my-md-3">
        <div v-for="(item, index) in pots" :key="index" class="col">
          <PotItem
            :name="item.name"
            :target="item.target"
            :total="item.total"
            :theme="item.theme"
          />
        </div>
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import { pots } from '~/content/data.json'
import PotItem from '~/components/pots/PotItem.vue'
import Container from '~/components/layout/Container.vue'
</script>
