<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Управление категориями</h2>
    </div>

    <!-- Add Category Form -->
    <form @submit.prevent="handleSubmit" class="mb-8 bg-white p-6 rounded-lg shadow">
      <div class="grid grid-cols-1 gap-6">
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium text-gray-700">Название</label>
          <input
            type="text"
            id="name"
            v-model="newCategory.name"
            required
            class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          >
        </div>
        <div class="space-y-2">
          <label for="description" class="block text-sm font-medium text-gray-700">Описание</label>
          <textarea
            id="description"
            v-model="newCategory.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Добавить категорию
          </button>
        </div>
      </div>
    </form>

    <!-- Categories List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="category in categories" :key="category.id">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ category.name }}</p>
                <p class="text-sm text-gray-500">{{ category.description }}</p>
              </div>
              <div>
                <button
                  @click="deleteCategory(category.id)"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import type { Category } from '~/types/category'

const config = useRuntimeConfig()
const categories = ref<Category[]>([])
const newCategory = ref({
  name: '',
  description: '',
})

const loadCategories = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/api/categories`)
    categories.value = await response.json()
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const handleSubmit = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      },
      body: JSON.stringify(newCategory.value),
    })
    
    if (response.ok) {
      newCategory.value = { name: '', description: '' }
      await loadCategories()
    }
  } catch (error) {
    console.error('Error creating category:', error)
  }
}

const deleteCategory = async (id: number) => {
  if (!confirm('Вы уверены, что хотите удалить эту категорию?')) {
    return
  }

  try {
    const response = await fetch(`${config.public.apiBase}/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      },
    })
    
    if (response.ok) {
      await loadCategories()
    }
  } catch (error) {
    console.error('Error deleting category:', error)
  }
}

onMounted(() => {
  loadCategories()
})
</script> 