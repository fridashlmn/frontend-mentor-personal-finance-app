<template>
  <Container>
    <template #header>
      <h1 class="col fw-bold m-0">Budgets</h1>
      <button class="col btn btn-primary">+ Add New Budget</button>
    </template>
    <template #content>
      <div class="row row-cols-1 row-cols-lg-2 g-6 my-2 my-md-3">summary</div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import Container from '~/components/layout/Container.vue'
</script>
