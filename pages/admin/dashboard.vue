<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold">Админ-панель</h1>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="logout"
              class="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              currentTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Content -->
      <div v-if="currentTab === 'categories'">
        <CategoryManager />
      </div>
      <div v-else-if="currentTab === 'doors'">
        <DoorManager />
      </div>
      <div v-else-if="currentTab === 'orders'">
        <OrderManager />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryManager from '~/components/admin/CategoryManager.vue'
import DoorManager from '~/components/admin/DoorManager.vue'
import OrderManager from '~/components/admin/OrderManager.vue'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const currentTab = ref('categories')

const tabs = [
  { id: 'categories', name: 'Категории' },
  { id: 'doors', name: 'Двери' },
  { id: 'orders', name: 'Заказы' },
]

const logout = () => {
  localStorage.removeItem('admin_token')
  router.push('/admin/login')
}
</script> 