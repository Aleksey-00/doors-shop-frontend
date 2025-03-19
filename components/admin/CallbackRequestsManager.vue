<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Заказы звонков</h2>
    </div>

    <!-- Callback Requests List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата заказа</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="request in callbackRequests" :key="request.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ request.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ request.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <select
                :value="request.status || 'new'"
                @change="updateRequestStatus(request, $event)"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="new" selected>Новый</option>
                <option value="confirmed">Подтвержден</option>
                <option value="completed">Выполнен</option>
                <option value="cancelled">Отменен</option>
              </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(request.createdAt).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="viewRequestDetails(request)"
                class="text-blue-600 hover:text-blue-900"
              >
                Подробнее
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Request Details Modal -->
    <div v-if="selectedRequest" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">Детали заказа звонка</h3>
            <button
              @click="selectedRequest = null"
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
              <p class="mt-1">{{ selectedRequest.name }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Телефон</p>
              <p class="mt-1">{{ selectedRequest.phone }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm font-medium text-gray-500">Комментарий</p>
              <p class="mt-1">{{ selectedRequest.comment || 'Нет комментария' }}</p>
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

interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  preferredTime: string;
  comment?: string;
  status: string;
  createdAt: string;
}

const config = useRuntimeConfig()
const api = useSecureApi()
const callbackRequests = ref<CallbackRequest[]>([])
const selectedRequest = ref<CallbackRequest | null>(null)

const loadCallbackRequests = async () => {
  try {
    const token = localStorage.getItem('admin_token')
    const data = await api.get('/api/callback-requests', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    callbackRequests.value = data.map((request: CallbackRequest) => {
      if (!request.status || request.status.trim() === '') {
        request.status = 'new'
      }
      return request
    })
  } catch (error) {
    console.error('Error loading callback requests:', error)
  }
}

const updateRequestStatus = async (request: CallbackRequest, event: Event) => {
  try {
    const status = (event.target as HTMLSelectElement).value
    request.status = status || 'new'
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    }
    await api.put(`/api/callback-requests/${request.id}/status`, { status: request.status }, { headers })
  } catch (error) {
    console.error('Error updating callback request status:', error)
  }
}

const viewRequestDetails = (request: CallbackRequest) => {
  selectedRequest.value = request
}

onMounted(() => {
  loadCallbackRequests()
})
</script> 