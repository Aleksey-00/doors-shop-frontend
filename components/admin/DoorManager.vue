<template>
  <div>
    <!-- Добавим компонент для уведомлений -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50">
      <div :class="[
        'px-4 py-3 rounded-lg shadow-lg',
        notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      ]">
        <div class="flex items-center">
          <div v-if="notification.type === 'success'" class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-else class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">{{ notification.message }}</p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                @click="notification.show = false"
                class="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600"
              >
                <span class="sr-only">Закрыть</span>
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Используем существующий компонент Alert -->
    <Alert 
      v-if="showAlert" 
      :type="alertType" 
      :message="alertMessage" 
      :show="showAlert"
      @close="showAlert = false"
    />

    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Управление дверями</h2>
      <div class="mt-2 flex flex-wrap gap-2">
        <button
          @click="openPriceModal(null)"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          Изменить все цены
        </button>
        
        <!-- Поиск по категории -->
        <div class="flex items-center">
          <div class="relative">
            <input
              type="text"
              v-model="categorySearchQuery"
              placeholder="Поиск по категории"
              class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              @input="loadDoors"
            />
            <button 
              v-if="categorySearchQuery" 
              @click="clearCategorySearch" 
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Door Form -->
    <form @submit.prevent="handleSubmit" class="mb-8 bg-white p-6 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label for="title" class="block text-sm font-medium text-gray-700">Название</label>
          <input
            type="text"
            id="title"
            v-model="newDoor.title"
            required
            class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          >
        </div>
        <div class="space-y-2 relative">
          <label for="category" class="block text-sm font-medium text-gray-700">Категория</label>
          <div class="relative">
            <button
              type="button"
              @click="isDropdownOpen = !isDropdownOpen"
              class="mt-1 relative w-full bg-white rounded-md border-2 border-gray-300 shadow-sm pl-4 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <span class="block truncate">
                {{ newDoor.category ? getCategoryName(newDoor.category) : 'Выберите категорию' }}
              </span>
              <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </span>
            </button>
            <div
              v-if="isDropdownOpen"
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <div
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(String(category.id)); isDropdownOpen = false"
                class="cursor-pointer select-none relative py-2 pl-4 pr-9 hover:bg-blue-50"
                :class="{ 'bg-blue-50': newDoor.category === String(category.id) }"
              >
                <span class="block truncate" :class="{ 'font-semibold': newDoor.category === String(category.id) }">
                  {{ category.name }}
                </span>
                <span
                  v-if="newDoor.category === String(category.id)"
                  class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
                >
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <input type="hidden" name="category" :value="newDoor.category" required>
        </div>
        <div class="space-y-2">
          <label for="price" class="block text-sm font-medium text-gray-700">Цена</label>
          <input
            type="number"
            id="price"
            v-model.number="newDoor.price"
            required
            min="0"
            class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          >
        </div>
        <div class="space-y-2">
          <label for="oldPrice" class="block text-sm font-medium text-gray-700">Старая цена</label>
          <input
            type="number"
            id="oldPrice"
            v-model.number="newDoor.oldPrice"
            min="0"
            class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          >
        </div>
        <div class="space-y-2">
          <label for="imageUrls" class="block text-sm font-medium text-gray-700">URL изображений (через запятую)</label>
          <input
            type="text"
            id="imageUrls"
            v-model="newDoor.imageUrls"
            required
            class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          >
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">В наличии</label>
          <div class="mt-1">
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="newDoor.inStock"
                class="rounded border-2 border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-600">Да</span>
            </label>
          </div>
        </div>
        <div class="md:col-span-2">
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Добавить дверь
          </button>
        </div>
      </div>
    </form>

    <!-- Doors List -->
    <div class="bg-white shadow overflow-x-auto sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Изображение</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Цена</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Старая цена</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">В наличии</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="door in doors" :key="door.id">
            <td class="px-4 py-4">
              <div class="relative group">
                <img 
                  :src="door.imageUrls && door.imageUrls.length > 0 ? door.imageUrls[0] : ''"
                  :alt="door.title"
                  class="h-16 w-16 object-cover rounded cursor-pointer"
                />
                <div v-if="door.imageUrls && door.imageUrls.length > 1" class="absolute hidden group-hover:flex bg-white border rounded-lg p-2 z-10 gap-2 -right-2 top-0 transform translate-x-full shadow-lg">
                  <img 
                    v-for="(url, index) in door.imageUrls.slice(1)"
                    :key="index"
                    :src="url"
                    :alt="`${door.title} - изображение ${index + 2}`"
                    class="h-16 w-16 object-cover rounded"
                  />
                </div>
              </div>
            </td>
            <td class="px-4 py-4">
              <div class="text-sm font-medium text-gray-900 break-words max-w-xs">{{ door.title }}</div>
            </td>
            <td class="px-4 py-4">
              <div class="flex flex-col space-y-2">
                <button 
                  @click="openPriceModal(door.category)"
                  class="text-blue-600 hover:text-blue-900 text-sm"
                >
                  {{ getCategoryName(door.category) }}
                </button>
                <button
                  @click="openTitleModal(door.category)"
                  class="text-blue-600 hover:text-blue-900 text-sm"
                >
                  (изменить названия)
                </button>
              </div>
            </td>
            <td class="px-4 py-4 text-sm text-gray-500">{{ door.price }} ₽</td>
            <td class="px-4 py-4 text-sm text-gray-500">{{ door.oldPrice }} ₽</td>
            <td class="px-4 py-4 text-sm text-gray-500">
              {{ door.inStock ? 'Да' : 'Нет' }}
            </td>
            <td class="px-4 py-4 text-sm">
              <button
                @click="deleteDoor(door.id)"
                class="text-red-600 hover:text-red-900"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <DoorPagination
      v-if="totalPages > 1"
      v-model:page="currentPage"
      :total-pages="totalPages"
      :current-page="currentPage"
      class="mt-4"
    />

    <!-- Price Update Modal -->
    <div v-if="showPriceModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ selectedCategory ? `Изменить цены для категории "${selectedCategoryName}"` : 'Изменить все цены' }}
        </h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Увеличить цену на (%)
          </label>
          <input
            type="number"
            v-model="priceIncreasePercent"
            min="0"
            step="1"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="closePriceModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            @click="updatePrices"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Применить
          </button>
        </div>
      </div>
    </div>

    <!-- Title Update Modal -->
    <div v-if="showTitleModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Изменить названия дверей в категории "{{ selectedCategoryName }}"
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Заменить текст
            </label>
            <input
              type="text"
              v-model="titleSearchText"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Например: Входная дверь Рекс"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              На текст
            </label>
            <input
              type="text"
              v-model="titleReplaceText"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Например: Входная дверь Фрегат"
            >
            <p class="mt-1 text-sm text-gray-500">
              К новому названию будет автоматически добавлен уникальный идентификатор (7 символов).
            </p>
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="closeTitleModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            @click="updateTitles"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRuntimeConfig } from '#app'
import { useSecureApi } from '~/composables/useSecureApi'
import type { Category } from '~/types/category'
import type { Door } from '~/types/door'
import DoorPagination from '~/components/DoorPagination.vue'
import Alert from '~/components/Alert.vue'

const config = useRuntimeConfig()
const api = useSecureApi()
const categories = ref<Category[]>([])
const doors = ref<Door[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 10
const newDoor = ref<Partial<Door>>({
  title: '',
  category: '',
  price: 0,
  oldPrice: 0,
  imageUrls: [],
  inStock: true,
})

// Модальные окна
const showPriceModal = ref(false)
const showTitleModal = ref(false)
const selectedCategory = ref<string | null>(null)
const priceIncreasePercent = ref(0)
const titleSearchText = ref('')
const titleReplaceText = ref('')
const isDropdownOpen = ref(false)
const categorySearchQuery = ref('')

// Добавим состояние для уведомлений
const notification = ref({
  show: false,
  message: '',
  type: 'success',
  timeout: null
})

// Типизируем alertType правильно
const alertMessage = ref('')
const alertType = ref<'success' | 'error' | 'info'>('success')
const showAlert = ref(false)

const loadCategories = async () => {
  try {
    const data = await api.get('/api/categories')
    categories.value = data
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const loadDoors = async () => {
  try {
    let endpoint = `/api/doors?page=${currentPage.value}&limit=${itemsPerPage}`
    
    // Добавляем параметр поиска по категории, если есть запрос
    if (categorySearchQuery.value) {
      endpoint += `&category=${categorySearchQuery.value}`
    }
    
    const data = await api.get(endpoint)
    doors.value = data.doors
    totalPages.value = data.totalPages
  } catch (error) {
    console.error('Error loading doors:', error)
  }
}

const handleSubmit = async () => {
  try {
    const imageUrlsInput = (newDoor.value.imageUrls as unknown) as string;
    const doorData = {
      ...newDoor.value,
      imageUrls: imageUrlsInput ? imageUrlsInput.split(',').map(url => url.trim()).filter(Boolean) : []
    }

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
    }
    
    const response = await api.post('/api/doors', doorData, { headers })
    
    if (response) {
      newDoor.value = {
        title: '',
        category: '',
        price: 0,
        oldPrice: 0,
        imageUrls: [],
        inStock: true,
      }
      await loadDoors()
    }
  } catch (error) {
    console.error('Error creating door:', error)
  }
}

const deleteDoor = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить эту дверь?')) {
    return
  }

  try {
    const response = await api.remove(`/api/doors/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
    })
    
    if (response.ok) {
      await loadDoors()
    }
  } catch (error) {
    console.error('Error deleting door:', error)
  }
}

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(c => String(c.id) === categoryId)
  return category ? category.name : categoryId
}

const selectedCategoryName = computed(() => {
  return selectedCategory.value ? getCategoryName(selectedCategory.value) : ''
})

const openPriceModal = (categoryId: string | null) => {
  selectedCategory.value = categoryId
  priceIncreasePercent.value = 0
  showPriceModal.value = true
}

const closePriceModal = () => {
  showPriceModal.value = false
  selectedCategory.value = null
  priceIncreasePercent.value = 0
}

// Функция для показа уведомлений через Alert
const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  alertMessage.value = message
  alertType.value = type
  showAlert.value = true
  
  // Автоматически скрываем через 3 секунды
  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

const updatePrices = async () => {
  try {
    const response = await api.post('/api/doors/update-prices', {
      category: selectedCategory.value,
      increasePercent: priceIncreasePercent.value
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
    })
    
    if (response.ok) {
      await loadDoors()
      closePriceModal()
      showNotification(`Цены успешно обновлены для категории "${selectedCategoryName.value}"`)
    } else {
      const errorData = await response.json()
      showNotification(errorData.message || 'Ошибка при обновлении цен', 'error')
    }
  } catch (error) {
    console.error('Error updating prices:', error)
    showNotification('Произошла ошибка при обновлении цен', 'error')
  }
}

const openTitleModal = (categoryId: string) => {
  selectedCategory.value = categoryId
  showTitleModal.value = true
  titleSearchText.value = ''
  titleReplaceText.value = ''
}

const closeTitleModal = () => {
  showTitleModal.value = false
  selectedCategory.value = null
  titleSearchText.value = ''
  titleReplaceText.value = ''
}

const updateTitles = async () => {
  try {
    const response = await api.post('/api/doors/update-titles', {
      category: selectedCategory.value,
      searchText: titleSearchText.value,
      replaceText: titleReplaceText.value,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
    })
    
    if (response.ok) {
      await loadDoors()
      closeTitleModal()
      showNotification(`Названия успешно обновлены для категории "${selectedCategoryName.value}"`)
    } else {
      const errorData = await response.json()
      showNotification(errorData.message || 'Ошибка при обновлении названий', 'error')
    }
  } catch (error) {
    console.error('Error updating titles:', error)
    showNotification('Произошла ошибка при обновлении названий', 'error')
  }
}

const selectCategory = (categoryId: string) => {
  newDoor.value.category = categoryId
}

const clearCategorySearch = () => {
  categorySearchQuery.value = ''
  loadDoors()
}

// Следим за изменением запроса поиска
watch(categorySearchQuery, () => {
  currentPage.value = 1 // Сбрасываем на первую страницу при изменении поиска
  loadDoors()
})

// Следим за изменением страницы
watch(currentPage, () => {
  loadDoors()
})

onMounted(() => {
  loadCategories()
  loadDoors()
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      isDropdownOpen.value = false
    }
  })
})
</script> 