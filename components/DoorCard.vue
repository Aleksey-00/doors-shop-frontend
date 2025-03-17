<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Link wrapper -->
    <NuxtLink :to="`/doors/${door.id}`" class="block">
      <!-- Image -->
      <div class="relative aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/5] max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-hidden">
        <div 
          class="absolute inset-0 transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
        >
          <div 
            v-for="(url, index) in door.imageUrls" 
            :key="index"
            class="absolute top-0 left-0 w-full h-full"
            :style="{ transform: `translateX(${index * 100}%)` }"
          >
            <img 
              :src="url" 
              :alt="door.title"
              class="w-full h-full object-contain transition-opacity duration-300"
              :class="{ 'opacity-100': index === currentImageIndex, 'opacity-0': index !== currentImageIndex }"
              loading="lazy"
            >
          </div>
        </div>

        <!-- Navigation buttons -->
        <div v-if="door.imageUrls && door.imageUrls.length > 1" class="absolute inset-x-0 bottom-0 flex justify-between p-2">
          <button 
            @click="prevImage" 
            class="bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-all transform hover:scale-105 active:scale-95"
            :class="{ 'opacity-0 pointer-events-none': currentImageIndex === 0 }"
          >
            <img src="~/assets/icons/chevron-left.svg" alt="Предыдущее" class="w-4 h-4 sm:w-6 sm:h-6">
          </button>
          <button 
            @click="nextImage" 
            class="bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-all transform hover:scale-105 active:scale-95"
            :class="{ 'opacity-0 pointer-events-none': currentImageIndex === door.imageUrls.length - 1 }"
          >
            <img src="~/assets/icons/chevron-right.svg" alt="Следующее" class="w-4 h-4 sm:w-6 sm:h-6">
          </button>
        </div>

        <!-- Dots indicator -->
        <div v-if="door.imageUrls && door.imageUrls.length > 1" class="absolute bottom-2 inset-x-0">
          <div class="flex justify-center gap-1.5">
            <button 
              v-for="(_, index) in door.imageUrls" 
              :key="index"
              @click="currentImageIndex = index"
              class="w-2 h-2 rounded-full transition-all duration-300 transform"
              :class="[
                index === currentImageIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-105'
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-3 sm:p-4">
        <h3 class="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{{ door.title }}</h3>
        
        <!-- Price -->
        <div class="mb-3 sm:mb-4">
          <div class="flex items-baseline gap-2">
            <span class="text-lg sm:text-xl font-bold">{{ formattedPrice }}</span>
            <span 
              v-if="door.oldPrice" 
              class="text-xs sm:text-sm text-gray-500 line-through"
            >
              {{ formattedOldPrice }}
            </span>
          </div>
        </div>

        <!-- Stock Status -->
        <div class="mb-3 sm:mb-4">
          <span 
            :class="[
              'px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm',
              door.inStock 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            ]"
          >
            {{ door.inStock ? 'В наличии' : 'Под заказ' }}
          </span>
        </div>
      </div>
    </NuxtLink>

    <!-- Actions -->
    <div class="p-3 sm:p-4 pt-0">
      <div class="flex flex-col space-y-2">
        <button 
          @click="addToCart"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Добавить в корзину
        </button>
        <button 
          @click="toggleFavorite"
          class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          {{ isFavorite ? 'Убрать из избранного' : 'В избранное' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Door } from '~/types/door'
import { usePrice } from '~/composables/usePrice'

// Props
const props = defineProps<{
  door: Door
}>()

// Emits
const emit = defineEmits<{
  (e: 'favoriteChanged', payload: { doorId: string; isFavorite: boolean }): void
  (e: 'cartChanged', isInCart: boolean): void
}>()

// State
const isFavorite = ref(false)
const currentImageIndex = ref(0)

// Composables
const { formatPrice } = usePrice()

// Check if door is in favorites on mount
onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Door[]
  isFavorite.value = favorites.some((item: Door) => item.id === props.door.id)
})

// Computed
const formattedPrice = computed(() => formatPrice(props.door.price))
const formattedOldPrice = computed(() => props.door.oldPrice ? formatPrice(props.door.oldPrice) : '')

// Methods
const nextImage = () => {
  if (!props.door.imageUrls) return
  currentImageIndex.value = (currentImageIndex.value + 1) % props.door.imageUrls.length
}

const prevImage = () => {
  if (!props.door.imageUrls) return
  currentImageIndex.value = currentImageIndex.value === 0 
    ? props.door.imageUrls.length - 1 
    : currentImageIndex.value - 1
}

const addToCart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Door[]
  if (!cartItems.some((item: Door) => item.id === props.door.id)) {
    cartItems.push(props.door)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cart',
      newValue: JSON.stringify(cartItems)
    }))
    emit('cartChanged', true)
  }
}

const toggleFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Door[]
  
  if (isFavorite.value) {
    const updatedFavorites = favorites.filter((item: Door) => item.id !== props.door.id)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  } else {
    favorites.push(props.door)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'favorites',
    newValue: localStorage.getItem('favorites')
  }))
  
  isFavorite.value = !isFavorite.value
  emit('favoriteChanged', { doorId: props.door.id, isFavorite: isFavorite.value })
}
</script>

<style scoped>
.transition-transform {
  will-change: transform;
}

.transition-opacity {
  will-change: opacity;
}

button {
  transition: all 0.3s ease-in-out;
}

button:active {
  transform: scale(0.95);
}
</style> 