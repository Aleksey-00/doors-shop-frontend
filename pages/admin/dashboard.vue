<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Tabs Navigation -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.name"
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

        <!-- Tab Content -->
        <div class="mt-6">
          <!-- Двери -->
          <DoorManager v-if="currentTab === 'doors'" />
          
          <!-- Категории -->
          <CategoryManager v-if="currentTab === 'categories'" />
          
          <!-- Заказы -->
          <OrderManager v-if="currentTab === 'orders'" />
          
          <!-- Звонки -->
          <CallbackRequestsManager v-if="currentTab === 'callbacks'" />
          
          <!-- Замеры -->
          <MeasurementRequestsManager v-if="currentTab === 'measurements'" />
        </div>
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
import CallbackRequestsManager from '~/components/admin/CallbackRequestsManager.vue'
import MeasurementRequestsManager from '~/components/admin/MeasurementRequestsManager.vue'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const currentTab = ref('doors')

const tabs = [
  { id: 'doors', name: 'Двери' },
  { id: 'categories', name: 'Категории' },
  { id: 'orders', name: 'Заказы' },
  { id: 'callbacks', name: 'Звонки' },
  { id: 'measurements', name: 'Замеры' }
]

const logout = () => {
  localStorage.removeItem('admin_token')
  router.push('/admin/login')
}
</script> 