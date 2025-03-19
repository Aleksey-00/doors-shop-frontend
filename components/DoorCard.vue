<template>
  <div v-if="hasValidImages" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Image container outside of NuxtLink -->
    <div class="relative aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/5] max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-hidden">
      <NuxtLink :to="`/doors/${door.id}`" class="block h-full">
        <div 
          v-if="hasValidImages"
          class="absolute inset-0 transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
        >
          <div 
            v-for="(url, index) in filteredImageUrls" 
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
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
          <div class="text-gray-400 text-center">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Фото скоро появится</p>
          </div>
        </div>
      </NuxtLink>

      <!-- Navigation buttons outside of NuxtLink -->
      <div v-if="hasValidImages && filteredImageUrls.length > 1" class="absolute inset-x-0 bottom-0 flex justify-between p-2">
        <button 
          @click.stop="prevImage" 
          class="bg-white/80 text-gray-700 p-1.5 sm:p-2 rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 z-10"
          :class="{ 'opacity-0 pointer-events-none': currentImageIndex === 0 }"
        >
          <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          @click.stop="nextImage" 
          class="bg-white/80 text-gray-700 p-1.5 sm:p-2 rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 z-10"
          :class="{ 'opacity-0 pointer-events-none': currentImageIndex === filteredImageUrls.length - 1 }"
        >
          <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Dots indicator outside of NuxtLink -->
      <div v-if="hasValidImages && filteredImageUrls.length > 1" class="absolute bottom-2 inset-x-0 z-10">
        <div class="flex justify-center gap-1.5">
          <button 
            v-for="(_, index) in filteredImageUrls" 
            :key="index"
            @click.stop="currentImageIndex = index"
            class="w-2 h-2 rounded-full transition-all duration-300 transform"
            :class="[
              index === currentImageIndex 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <NuxtLink :to="`/doors/${door.id}`" class="block">
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Props
const props = defineProps<{
  door: Door
}>()

// Emits
const emit = defineEmits(['favoriteChanged', 'cartChanged', 'click'])

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

const filteredImageUrls = computed(() => {
  if (!props.door.imageUrls || !Array.isArray(props.door.imageUrls)) return []
  return props.door.imageUrls.filter(url => 
    !url.includes('double_ring') && 
    !url.includes('photo_coming_soon')
  )
})

const hasValidImages = computed(() => filteredImageUrls.value.length > 0)

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

const isHovered = ref(false)

const handleClick = () => {
  emit('click', props.door)
}

const handleImageClick = (event: MouseEvent) => {
  event.stopPropagation()
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

.door-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.door-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.door-card__image-container {
  position: relative;
  width: 100%;
  padding-top: 75%; /* 4:3 Aspect Ratio */
  overflow: hidden;
}

.door-card__swiper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.door-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.door-card__content {
  padding: 16px;
}

.door-card__title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.door-card__price {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.door-card__category {
  font-size: 14px;
  color: #666;
}

/* Swiper styles */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 16px;
}

:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: white;
}

@media (max-width: 768px) {
  .door-card__title {
    font-size: 14px;
  }

  .door-card__price {
    font-size: 16px;
  }

  .door-card__category {
    font-size: 12px;
  }
}
</style> 