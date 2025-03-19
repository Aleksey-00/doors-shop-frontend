<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Управление заявками</h1>
    <RequestsList />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script> 