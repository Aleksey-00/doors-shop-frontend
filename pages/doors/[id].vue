<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li><NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Главная</NuxtLink></li>
        <li><span class="text-gray-500">/</span></li>
        <li><NuxtLink to="/doors" class="text-gray-500 hover:text-gray-700">Двери</NuxtLink></li>
        <li><span class="text-gray-500">/</span></li>
        <li><span class="text-gray-900">{{ door?.title }}</span></li>
      </ol>
    </nav>

    <div v-if="door" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Image Gallery -->
      <div class="relative">
        <div class="aspect-[4/3] relative overflow-hidden rounded-lg">
          <img 
            :src="currentImage" 
            :alt="door.title"
            class="w-full h-full object-contain"
          >
        </div>
        
        <!-- Thumbnails -->
        <div v-if="door.imageUrls && door.imageUrls.length > 1" class="mt-4">
          <div class="flex space-x-2 overflow-x-auto pb-2">
            <button
              v-for="(url, index) in door.imageUrls"
              :key="index"
              @click="currentImageIndex = index"
              class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors"
              :class="currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'"
            >
              <img :src="url" :alt="door.title" class="w-full h-full object-cover">
            </button>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold mb-4">{{ door.title }}</h1>
        
        <!-- Price -->
        <div class="mb-6">
          <div class="flex items-baseline gap-3">
            <span class="text-3xl font-bold">{{ formattedPrice }}</span>
            <span v-if="door.oldPrice" class="text-xl text-gray-500 line-through">
              {{ formattedOldPrice }}
            </span>
          </div>
        </div>

        <!-- Stock Status -->
        <div class="mb-6">
          <span 
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              door.inStock 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            ]"
          >
            {{ door.inStock ? 'В наличии' : 'Под заказ' }}
          </span>
        </div>

        <!-- Actions -->
        <div class="space-y-4 mb-8">
          <button 
            @click="addToCart(door)"
            class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Добавить в корзину
          </button>
          <button 
            @click="toggleFavorite"
            class="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {{ isFavorite ? 'Убрать из избранного' : 'В избранное' }}
          </button>
        </div>

        <!-- Order Forms -->
        <div class="space-y-4 mb-8">
          <button 
            @click="showMeasurementForm = true"
            class="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Заказать замер
          </button>
          <button 
            @click="showCallbackForm = true"
            class="w-full border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition-colors"
          >
            Заказать звонок
          </button>
        </div>

        <!-- Installation Services -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 class="text-lg font-semibold mb-4">Услуги по установке</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Демонтаж старой двери - от 500₽</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Установка новой двери - от 2500₽</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Расширение проема - от 3000₽</span>
            </li>
          </ul>
          <NuxtLink 
            to="/services" 
            class="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Все услуги по установке →
          </NuxtLink>
        </div>

        <!-- Specifications -->
        <div v-if="door.specifications" class="border-t pt-6">
          <h3 class="text-lg font-semibold mb-4">Характеристики</h3>
          <dl class="grid grid-cols-1 gap-3">
            <div v-for="(value, key) in door.specifications" :key="key" class="grid grid-cols-2 gap-4">
              <dt class="text-gray-600">{{ key }}</dt>
              <dd class="font-medium">{{ value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Similar Products -->
    <div v-if="similarDoors.length > 0" class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Похожие товары</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DoorCard
          v-for="door in similarDoors"
          :key="door.id"
          :door="door"
          @favorite-changed="toggleFavorite"
        />
      </div>
    </div>

    <!-- Recently Viewed -->
    <div v-if="viewedDoors.length > 0" class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Вы недавно смотрели</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DoorCard
          v-for="door in viewedDoors"
          :key="door.id"
          :door="door"
          @favorite-changed="toggleFavorite"
        />
      </div>
    </div>

    <!-- Measurement Form Modal -->
    <Modal v-model="showMeasurementForm">
      <template #header>Заказать замер</template>
      <MeasurementForm @submit="submitMeasurementForm" />
    </Modal>

    <!-- Callback Form Modal -->
    <Modal v-model="showCallbackForm">
      <template #header>Заказать звонок</template>
      <CallbackForm @submit="submitCallbackForm" />
    </Modal>

    <Alert
      :show="showAlertValue"
      :message="alertMessage"
      :type="alertType"
      @close="hideAlert"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Door } from '~/types/door'
import type { MeasurementFormData } from '~/components/MeasurementForm.vue'
import type { CallbackFormData } from '~/components/CallbackForm.vue'
import { usePrice } from '~/composables/usePrice'
import { useAlert } from '~/composables/useAlert'

// Route
const route = useRoute()
const router = useRouter()

// Composables
const { formatPrice } = usePrice()
const { showAlert, hideAlert } = useAlert()

// State
const door = ref<Door | null>(null)
const currentImageIndex = ref(0)
const isFavorite = ref(false)
const showAlertValue = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'error' | 'info'>('success')
const similarDoors = ref<Door[]>([])
const viewedDoors = ref<Door[]>([])

// Form state
const showMeasurementForm = ref(false)
const showCallbackForm = ref(false)

// Methods
const loadDoor = async () => {
  try {
    const response = await $fetch<Door>(`/api/doors/${route.params.id}`)
    door.value = response
    updateRecentlyViewed(response)
    loadSimilarDoors()
  } catch (error) {
    console.error('Error loading door:', error)
    showAlert('Ошибка при загрузке данных', 'error')
  }
}

// Load similar doors
const loadSimilarDoors = async () => {
  if (!door.value) return
  try {
    const response = await $fetch<Door[]>(`/api/doors/similar/${door.value.id}`)
    similarDoors.value = response
  } catch (error) {
    console.error('Error loading similar doors:', error)
  }
}

// Update recently viewed
const updateRecentlyViewed = (currentDoor: Door) => {
  const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]') as Door[]
  const updatedViewed = [
    currentDoor,
    ...viewed.filter((item: Door) => item.id !== currentDoor.id)
  ].slice(0, 4)
  localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed))
  viewedDoors.value = updatedViewed.filter((item: Door) => item.id !== currentDoor.id)
}

// Load recently viewed
const loadRecentlyViewed = () => {
  const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]') as Door[]
  viewedDoors.value = viewed.filter((item: Door) => item.id !== route.params.id)
}

// Computed
const currentImage = computed(() => {
  if (!door.value?.imageUrls || door.value.imageUrls.length === 0) {
    return 'https://placehold.co/600x800/e2e8f0/1e293b?text=Нет+изображения'
  }
  return door.value.imageUrls[currentImageIndex.value]
})

const formattedPrice = computed(() => {
  if (!door.value) return ''
  return formatPrice(door.value.price)
})

const formattedOldPrice = computed(() => {
  if (!door.value?.oldPrice) return ''
  return formatPrice(door.value.oldPrice)
})

// Methods
const addToCart = (item: Door) => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Door[]
  if (!cartItems.some((cartItem: Door) => cartItem.id === item.id)) {
    cartItems.push(item)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    showAlert('Товар добавлен в корзину', 'success')
  } else {
    showAlert('Товар уже в корзине', 'info')
  }
}

const toggleFavorite = () => {
  if (!door.value) return
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Door[]
  
  if (isFavorite.value) {
    const updatedFavorites = favorites.filter((item: Door) => item.id !== door.value?.id)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  } else {
    favorites.push(door.value)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'favorites',
    newValue: localStorage.getItem('favorites')
  }))
  
  isFavorite.value = !isFavorite.value
  showAlert(
    isFavorite.value ? 'Дверь добавлена в избранное' : 'Дверь удалена из избранного',
    'info'
  )
}

const submitMeasurementForm = async (formData: MeasurementFormData) => {
  try {
    await $fetch('/api/measurement-requests', {
      method: 'POST',
      body: {
        doorId: door.value?.id,
        ...formData
      }
    })
    showAlert('Заявка на замер успешно отправлена', 'success')
    showMeasurementForm.value = false
  } catch (error) {
    showAlert('Ошибка при отправке заявки', 'error')
  }
}

const submitCallbackForm = async (formData: CallbackFormData) => {
  try {
    await $fetch('/api/callback-requests', {
      method: 'POST',
      body: {
        doorId: door.value?.id,
        ...formData
      }
    })
    showAlert('Заявка на обратный звонок успешно отправлена', 'success')
    showCallbackForm.value = false
  } catch (error) {
    showAlert('Ошибка при отправке заявки', 'error')
  }
}

// Lifecycle
onMounted(async () => {
  await loadDoor()
  loadRecentlyViewed()
  
  // Check if door is in favorites
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Door[]
  isFavorite.value = favorites.some((item: Door) => item.id === route.params.id)
})
</script> 