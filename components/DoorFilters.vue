<template>
  <div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <h2 class="text-lg sm:text-xl font-semibold mb-6">Фильтры</h2>

    <!-- Categories -->
    <div class="space-y-6">
      <div class="border-b pb-4">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Категории</h3>
        <div class="space-y-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="$emit('update:category', String(category.id) === selectedCategory ? '' : String(category.id))"
            class="w-full text-left px-3 py-2 rounded-md text-sm transition-colors relative"
            :class="String(category.id) === selectedCategory 
              ? 'bg-blue-50 text-blue-700 font-medium' 
              : 'hover:bg-gray-50 text-gray-700'"
          >
            {{ category.name }}
            <span 
              v-if="String(category.id) === selectedCategory"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"
            />
          </button>
        </div>
      </div>

      <!-- Price Range -->
      <div class="border-b pb-4">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Цена</h3>
        <div class="flex gap-3">
          <div class="flex-1">
            <label for="minPrice" class="sr-only">Минимальная цена</label>
            <div class="relative">
              <input
                id="minPrice"
                v-model="filters.minPrice"
                type="number"
                placeholder="От"
                class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                min="0"
              >
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₽</span>
            </div>
          </div>
          <div class="flex-1">
            <label for="maxPrice" class="sr-only">Максимальная цена</label>
            <div class="relative">
              <input
                id="maxPrice"
                v-model="filters.maxPrice"
                type="number"
                placeholder="До"
                class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                min="0"
              >
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₽</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stock Status -->
      <div class="border-b pb-4">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Наличие</h3>
        <label class="relative flex items-center gap-3 cursor-pointer group">
          <input
            v-model="filters.inStock"
            type="checkbox"
            class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
          >
          <span class="text-sm text-gray-700 group-hover:text-gray-900">В наличии</span>
        </label>
      </div>

      <!-- Sort -->
      <div>
        <h3 class="text-sm font-medium text-gray-900 mb-3">Сортировка</h3>
        <div class="relative">
          <button
            type="button"
            @click="isOpen = !isOpen"
            class="w-full text-left px-3 py-2 pr-10 rounded-md border border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer relative"
          >
            {{ sortLabels[filters.sort] }}
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <img :src="chevronDownIcon" alt="" class="w-5 h-5 text-gray-400" :class="{ 'rotate-180': isOpen }">
            </div>
          </button>
          
          <div
            v-show="isOpen"
            class="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
          >
            <button
              v-for="(label, value) in sortLabels"
              :key="value"
              @click="selectOption(value)"
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              :class="{ 'text-blue-600 bg-blue-50': filters.sort === value }"
            >
              {{ label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-6 space-y-3">
      <button
        @click="applyFilters"
        class="w-full bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Применить
      </button>
      <button
        @click="resetFilters"
        class="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Сбросить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import chevronDownIcon from '~/assets/icons/chevron-down.svg'
import { useSecureApi } from '~/composables/useSecureApi'
import type { Category } from '~/types/category'

// Props
const props = defineProps<{
  selectedCategory: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:category', value: string): void
  (e: 'update:filters', value: any): void
}>()

// State
const filters = ref({
  minPrice: '',
  maxPrice: '',
  inStock: false,
  sort: 'popular' as 'popular' | 'price_asc' | 'price_desc' | 'new'
})

const api = useSecureApi()
const categories = ref<Category[]>([])

// Загрузка категорий с сервера
const loadCategories = async () => {
  try {
    const response = await api.get('/api/categories')
    categories.value = response || []
  } catch (error) {
    console.error('Error loading categories:', error)
    categories.value = []
  }
}

onMounted(() => {
  loadCategories()
})

const isOpen = ref(false)

const sortLabels: Record<'popular' | 'price_asc' | 'price_desc' | 'new', string> = {
  popular: 'По популярности',
  price_asc: 'Сначала дешевле',
  price_desc: 'Сначала дороже',
  new: 'Сначала новые'
}

const selectOption = (value: string) => {
  filters.value.sort = value as 'popular' | 'price_asc' | 'price_desc' | 'new'
  isOpen.value = false
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target?.closest?.('.relative')) {
      isOpen.value = false
    }
  })
}

// Methods
const applyFilters = () => {
  emit('update:filters', {
    minPrice: filters.value.minPrice ? Number(filters.value.minPrice) : undefined,
    maxPrice: filters.value.maxPrice ? Number(filters.value.maxPrice) : undefined,
    inStock: filters.value.inStock,
    sort: filters.value.sort
  })
}

const resetFilters = () => {
  filters.value = {
    minPrice: '',
    maxPrice: '',
    inStock: false,
    sort: 'popular'
  }
  emit('update:category', '')
  emit('update:filters', {})
}

// Watch for filter changes
watch(filters, () => {
  applyFilters()
}, { deep: true })
</script>

<style scoped>
/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Custom select styles */
select {
  background-image: none;
  position: relative;
  z-index: 1;
}

select:focus {
  z-index: 1;
}

/* Ensure dropdown appears below */
select option {
  background-color: white;
  padding: 0.5rem;
  margin: 0.25rem 0;
}

/* Fix dropdown positioning */
select:focus + div {
  z-index: 0;
}

/* Override default select behavior */
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
  }
}

/* Force dropdown to appear below */
select {
  transform-origin: top;
}
</style> 