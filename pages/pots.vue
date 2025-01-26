<template>
  <div class="container overflow-hidden px-8 py-6 py-md-7">
    <div class="row align-items-center justify-content-around mb-7">
      <h1 class="fw-bold col">Pots</h1>
      <button class="btn btn-primary col">+ Add New Pot</button>
    </div>
    <div class="row row-cols-1 row-cols-lg-2 g-6">
      <div v-for="(item, index) in pots" :key="index" class="col">
        <PotCard
          :name="item.name"
          :target="item.target"
          :total="item.total"
          :theme="item.theme"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { pots } from '~/content/data.json'
import PotCard from '~/components/pots/PotCard.vue'
</script>
