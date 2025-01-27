<template>
  <div class="container px-4 px-md-8 pt-6 pb-9 pt-md-7 pb-md-10 py-lg-7">
    <div class="row align-items-center justify-content-around">
      <slot name="header" />
    </div>
    <slot name="content" />
  </div>
</template>

<script setup lang="ts"></script>
