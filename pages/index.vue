<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import DoorCard from '~/components/DoorCard.vue'
import DoorFilters from '~/components/DoorFilters.vue'
import DoorFAQ from '~/components/DoorFAQ.vue'
import DoorBlog from '~/components/DoorBlog.vue'
import DoorReviews from '~/components/DoorReviews.vue'
import DoorPagination from '~/components/DoorPagination.vue'
import SchemaMeta from '~/components/SchemaMeta.vue'
import type { Door, DoorsResponse, DoorFilters as DoorFiltersType } from '~/types/door'
import { useHead, useRoute } from '#imports'
import filterIcon from '~/assets/icons/filter.svg'
import closeIcon from '~/assets/icons/close.svg'

const config = useRuntimeConfig()
const route = useRoute()

// State
const loading = ref(true)
const doors = ref<Door[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const selectedCategory = ref('')
const activeFilters = ref<Partial<DoorFiltersType>>({})
const isFilterOpen = ref(false)

// SEO setup
useHead({
  title: route.path === '/' 
    ? 'Купить входные двери европейского качества | Премиум двери'
    : null,
  meta: route.path === '/' ? [
    {
      name: 'description',
      content: 'Большой выбор входных дверей европейского качества. Премиум, стандарт и эконом класс. Доставка по всей России. Профессиональная установка.'
    },
    {
      name: 'keywords',
      content: 'двери, входные двери, купить двери, евро двери, премиум двери'
    }
  ] : [],
})

// Methods
const fetchDoors = async () => {
  loading.value = true
  try {
    const filters: DoorFiltersType = {
      page: currentPage.value,
      limit: 12,
      ...activeFilters.value,
      category: selectedCategory.value || undefined
    }

    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })
    
    const response = await fetch(`${config.public.apiBase}/api/doors?${queryParams.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch doors')
    }
    const data: DoorsResponse = await response.json()
    doors.value = data.doors || []
    totalPages.value = data.totalPages || 1
  } catch (error) {
    console.error('Error fetching doors:', error)
    doors.value = []
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const updateFilters = (filters: Partial<DoorFiltersType>) => {
  activeFilters.value = filters
  currentPage.value = 1 // Reset to first page when filters change
  fetchDoors()
}

const toggleFilters = () => {
  isFilterOpen.value = !isFilterOpen.value
}

// Watchers
watch([currentPage, selectedCategory], () => {
  fetchDoors()
})

// Lifecycle
onMounted(() => {
  fetchDoors()
})
</script>

<template>
  <div>
    <!-- SEO Meta Components -->
    <SchemaMeta type="Organization" />
    <SchemaMeta type="WebSite" />
    <SchemaMeta
      v-if="selectedCategory"
      type="BreadcrumbList"
      :category="selectedCategory"
    />

    <div class="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
      <!-- SEO Header -->
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
        Входные двери европейского качества
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl">
        Широкий ассортимент входных дверей европейского качества. У нас вы найдете двери премиум класса, стандарт и эконом варианты. Гарантия качества, профессиональная установка и доставка по всей России.
      </p>

      <!-- Mobile Filters Button -->
      <button 
        @click="toggleFilters"
        class="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <img 
          :src="isFilterOpen ? closeIcon : filterIcon" 
          :alt="isFilterOpen ? 'Закрыть фильтры' : 'Показать фильтры'"
          class="w-6 h-6"
        >
      </button>

      <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-4 lg:mt-8">
        <!-- Filters Sidebar -->
        <aside 
          class="lg:w-1/4 overflow-hidden transition-all duration-300 bg-white fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-auto"
          :class="[
            isFilterOpen ? 'translate-x-0 opacity-100' : 'translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100',
          ]"
          role="complementary" 
          aria-label="Фильтры дверей"
        >
          <div class="h-full w-full bg-white p-4 lg:p-0 overflow-y-auto">
            <DoorFilters
              :selectedCategory="selectedCategory"
              @update:category="selectedCategory = $event"
              @update:filters="updateFilters"
            />
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:w-3/4" role="main">
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Загрузка дверей...</p>
          </div>

          <div v-else>
            <!-- Grid of Door Cards -->
            <div v-if="doors.length === 0" class="text-center py-8">
              <p class="text-gray-600">Двери не найдены</p>
            </div>
            <div v-else>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <DoorCard
                  v-for="door in doors"
                  :key="door.id"
                  :door="door"
                />
              </div>

              <!-- Pagination -->
              <DoorPagination
                v-if="totalPages > 1"
                v-model:page="currentPage"
                :total-pages="totalPages"
                :current-page="currentPage"
                class="mt-6 sm:mt-8"
              />
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Reviews Section -->
    <DoorReviews class="mt-8 sm:mt-12 lg:mt-16" />

    <!-- FAQ Section -->
    <DoorFAQ class="mt-8 sm:mt-12 lg:mt-16" />

    <!-- Blog Section -->
    <DoorBlog class="mt-8 sm:mt-12 lg:mt-16" />
  </div>
</template>