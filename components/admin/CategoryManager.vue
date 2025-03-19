<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Управление категориями</h2>
    </div>

    <!-- Add Category Form -->
    <form @submit.prevent="handleSubmit" class="mb-8 bg-white p-6 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <input
            type="text"
            id="description"
            v-model="newCategory.description"
            class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          >
        </div>
        <div class="md:col-span-2">
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
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ category.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-md break-words">{{ category.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="deleteCategory(category.id)"
                class="text-red-600 hover:text-red-900"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Category } from '~/types/category'
import { useRuntimeConfig } from '#app'
import { useSecureApi } from '~/composables/useSecureApi'

const config = useRuntimeConfig()
const api = useSecureApi()
const categories = ref<Category[]>([])
const newCategory = ref({
  name: '',
  description: '',
})

const loadCategories = async () => {
  try {
    const response = await api.get('/api/categories')
    categories.value = response
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const handleSubmit = async () => {
  try {
    const response = await api.post('/api/categories', newCategory.value, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      }
    })
    
    if (response) {
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
    const response = await api.remove(`/api/categories/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      }
    })
    
    if (response) {
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