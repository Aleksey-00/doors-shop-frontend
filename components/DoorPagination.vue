<template>
  <nav class="mt-8 flex justify-center items-center gap-1" aria-label="Навигация по страницам">
    <!-- Кнопка "Назад" -->
    <button
      @click="$emit('update:page', Number(props.currentPage) - 1)"
      :disabled="Number(props.currentPage) === 1"
      class="p-2 rounded-md flex items-center justify-center w-10 h-10"
      :class="Number(props.currentPage) === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'"
    >
      <img src="~/assets/icons/chevron-left.svg" alt="Назад" class="w-5 h-5" />
    </button>

    <!-- Страницы и многоточия -->
    <template v-for="(item, index) in paginationRange" :key="index">
      <button
        v-if="typeof item === 'number'"
        @click="$emit('update:page', item)"
        :class="[
          'w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium',
          Number(props.currentPage) === item ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        ]"
      >
        {{ item }}
      </button>
      <button
        v-else
        @click="$emit('update:page', handleDotsClick(index === 1))"
        class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
      >
        {{ item }}
      </button>
    </template>

    <!-- Кнопка "Вперед" -->
    <button
      @click="$emit('update:page', Number(props.currentPage) + 1)"
      :disabled="Number(props.currentPage) === Number(props.totalPages)"
      class="p-2 rounded-md flex items-center justify-center w-10 h-10"
      :class="Number(props.currentPage) === Number(props.totalPages) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'"
    >
      <img src="~/assets/icons/chevron-right.svg" alt="Вперед" class="w-5 h-5" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  currentPage: number
  totalPages: number
}>(), {
  currentPage: 1,
  totalPages: 1
})

defineEmits<{
  (e: 'update:page', page: number): void
}>()

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const DOTS = '...'

const paginationRange = computed(() => {
  const currentPage = Number(props.currentPage)
  const totalPages = Number(props.totalPages)

  // Проверка валидности входных данных
  if (isNaN(currentPage) || isNaN(totalPages) || totalPages < 1) {
    console.error('Invalid pagination props:', { currentPage, totalPages })
    return [1]
  }

  // Базовый случай
  if (totalPages <= 1) return [1]

  // Показываем все страницы, если их мало
  if (totalPages <= 7) {
    return range(1, totalPages)
  }

  // Начало (первые страницы)
  if (currentPage <= 3) {
    return [1, 2, 3, DOTS, totalPages]
  }

  // Конец (последние страницы)
  if (currentPage >= totalPages - 2) {
    return [1, DOTS, totalPages - 2, totalPages - 1, totalPages]
  }

  // Середина
  return [
    1,
    DOTS,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    DOTS,
    totalPages
  ]
})

const handleDotsClick = (isLeftDots: boolean) => {
  const currentPage = Number(props.currentPage)
  const totalPages = Number(props.totalPages)
  
  if (isLeftDots) {
    return Math.max(1, currentPage - 5)
  }
  return Math.min(totalPages, currentPage + 5)
}
</script> 