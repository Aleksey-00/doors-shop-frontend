<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="hover:opacity-90 transition-opacity">
            <img src="/images/logo.svg" alt="Евро Двери" class="h-12" />
          </NuxtLink>
          <nav class="flex items-center space-x-4">
            <!-- Прайс-лист -->
            <NuxtLink 
              to="/price-list" 
              class="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="ml-1 hidden sm:inline">Прайс-лист</span>
            </NuxtLink>
            <!-- Избранное -->
            <NuxtLink 
              to="/favorites" 
              class="flex items-center text-gray-700 hover:text-blue-600 transition-colors relative"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span 
                v-if="favoritesCount > 0"
                class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ favoritesCount }}
              </span>
            </NuxtLink>
            <!-- Корзина -->
            <NuxtLink 
              to="/cart" 
              class="flex items-center text-gray-700 hover:text-blue-600 transition-colors relative"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span 
                v-if="cartItemsCount > 0"
                class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartItemsCount }}
              </span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-50 h-full">
      <div class="h-full">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-center">
          <NuxtLink to="/" class="hover:opacity-90 transition-opacity">
            <img src="/images/logo.svg" alt="Евро Двери" class="h-8 mr-2 brightness-200" />
          </NuxtLink>
          <p>&copy; 2024 Магазин дверей евро качества. Все права защищены.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const cartItemsCount = ref(0)
const favoritesCount = ref(0)

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cartItemsCount.value = cart.length
}

const updateFavoritesCount = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  favoritesCount.value = favorites.length
}

onMounted(() => {
  updateCartCount()
  updateFavoritesCount()
  window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
      updateCartCount()
    }
    if (event.key === 'favorites') {
      updateFavoritesCount()
    }
  })
})

watch(() => localStorage.getItem('cart'), updateCartCount)
watch(() => localStorage.getItem('favorites'), updateFavoritesCount)
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 