<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Избранное</h1>
    
    <div v-if="favorites.length === 0" class="text-center py-8">
      <p class="text-gray-600">Список избранного пуст</p>
      <NuxtLink 
        to="/" 
        class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <DoorCard
        v-for="door in favorites"
        :key="door.id"
        :door="door"
        @favorite-changed="handleFavoriteChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Door } from '~/types/door'

const favorites = ref<Door[]>([])

const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
}

const handleFavoriteChange = ({ doorId }: { doorId: string, isFavorite: boolean }) => {
  // Немедленно удаляем товар из списка на странице
  favorites.value = favorites.value.filter(door => door.id !== doorId)
}

onMounted(() => {
  loadFavorites()
  
  // Listen for storage changes from other tabs
  window.addEventListener('storage', (event) => {
    if (event.key === 'favorites') {
      loadFavorites()
    }
  })
})
</script> 