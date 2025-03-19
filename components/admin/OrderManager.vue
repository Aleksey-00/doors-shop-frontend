<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Управление заказами</h2>
    </div>

    <!-- Orders List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Адрес</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.phone }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ order.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatPrice(order.total) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <select
                v-model="order.status"
                @change="updateOrderStatus(order)"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="new">Новый</option>
                <option value="processing">В обработке</option>
                <option value="completed">Завершен</option>
                <option value="cancelled">Отменен</option>
              </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(order.createdAt).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="viewOrderDetails(order)"
                class="text-blue-600 hover:text-blue-900"
              >
                Подробнее
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">Детали заказа</h3>
            <button
              @click="selectedOrder = null"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p class="text-sm font-medium text-gray-500">Имя клиента</p>
              <p class="mt-1">{{ selectedOrder.name }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Телефон</p>
              <p class="mt-1">{{ selectedOrder.phone }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Адрес</p>
              <p class="mt-1">{{ selectedOrder.address }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Комментарий</p>
              <p class="mt-1">{{ selectedOrder.comment || 'Нет комментария' }}</p>
            </div>
          </div>

          <div class="border-t pt-6">
            <h4 class="text-base font-medium text-gray-900 mb-4">Товары в заказе</h4>
            <div class="space-y-4">
              <div
                v-for="item in selectedOrder.items"
                :key="item.id"
                class="flex items-center space-x-4"
              >
                <img
                  :src="getFirstValidImage(item.imageUrls)"
                  :alt="item.title"
                  class="h-16 w-16 object-cover rounded"
                >
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ item.title }}</p>
                  <p class="text-sm text-gray-500">{{ formatPrice(item.price) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t pt-6 mt-6">
            <div class="flex justify-between items-center">
              <p class="text-base font-medium text-gray-900">Итого:</p>
              <p class="text-lg font-bold text-gray-900">{{ formatPrice(selectedOrder.total) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useSecureApi } from '~/composables/useSecureApi'

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  comment?: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    title: string;
    price: number;
    imageUrls: string[];
  }>;
}

const config = useRuntimeConfig()
const api = useSecureApi()
const orders = ref<Order[]>([])
const selectedOrder = ref<Order | null>(null)

const loadOrders = async () => {
  try {
    const token = localStorage.getItem('admin_token')
    const data = await api.get('/api/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    orders.value = data
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}

const updateOrderStatus = async (order: Order) => {
  try {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    }
    await api.put(`/api/orders/${order.id}/status`, { status: order.status }, { headers })
  } catch (error) {
    console.error('Error updating order status:', error)
  }
}

const viewOrderDetails = (order: Order) => {
  selectedOrder.value = order
}

const formatPrice = (price: number) => {
  return price.toLocaleString() + ' ₽'
}

// Добавляем функции для фильтрации изображений
const getValidImages = (urls: string[] | undefined) => {
  if (!urls) return []
  return urls.filter(url => !url.includes('double_ring.svg'))
}

const getFirstValidImage = (urls: string[] | undefined) => {
  const validImages = getValidImages(urls)
  return validImages.length > 0 ? validImages[0] : ''
}

onMounted(() => {
  loadOrders()
})
</script> 