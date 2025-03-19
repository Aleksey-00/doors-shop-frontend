<template>
  <div class="space-y-8">
    <!-- Measurement Requests -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Заявки на замер</h2>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="request in measurementRequests" :key="request.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-blue-600 truncate">
                  {{ request.name }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ request.phone }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ request.address }}
                </p>
                <p v-if="request.comments" class="mt-1 text-sm text-gray-500">
                  {{ request.comments }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    getStatusClass(request.status)
                  ]"
                >
                  {{ getStatusText(request.status) }}
                </span>
                <div class="mt-2">
                  <select
                    v-model="request.status"
                    @change="updateMeasurementRequestStatus(request.id, request.status)"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В обработке</option>
                    <option value="completed">Выполнена</option>
                    <option value="cancelled">Отменена</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Callback Requests -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Заявки на обратный звонок</h2>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="request in callbackRequests" :key="request.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-blue-600 truncate">
                  {{ request.name }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ request.phone }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Удобное время: {{ request.preferredTime }}
                </p>
                <p v-if="request.comments" class="mt-1 text-sm text-gray-500">
                  {{ request.comments }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    getStatusClass(request.status)
                  ]"
                >
                  {{ getStatusText(request.status) }}
                </span>
                <div class="mt-2">
                  <select
                    v-model="request.status"
                    @change="updateCallbackRequestStatus(request.id, request.status)"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В обработке</option>
                    <option value="completed">Выполнена</option>
                    <option value="cancelled">Отменена</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSecureApi } from '~/composables/useSecureApi'

interface Request {
  id: number
  name: string
  phone: string
  status: string
  comments?: string
  address?: string
  preferredTime?: string
}

const measurementRequests = ref<Request[]>([])
const callbackRequests = ref<Request[]>([])
const api = useSecureApi()

const loadRequests = async () => {
  try {
    const [measurement, callback] = await Promise.all([
      api.get('/api/measurement-requests'),
      api.get('/api/callback-requests')
    ])
    measurementRequests.value = measurement
    callbackRequests.value = callback
  } catch (error) {
    console.error('Error loading requests:', error)
  }
}

const updateMeasurementRequestStatus = async (id: number, status: string) => {
  try {
    await api.put(`/api/measurement-requests/${id}/status`, { status })
  } catch (error) {
    console.error('Error updating measurement request status:', error)
  }
}

const updateCallbackRequestStatus = async (id: number, status: string) => {
  try {
    await api.put(`/api/callback-requests/${id}/status`, { status })
  } catch (error) {
    console.error('Error updating callback request status:', error)
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-yellow-100 text-yellow-800'
    case 'in_progress':
      return 'bg-blue-100 text-blue-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'new':
      return 'Новая'
    case 'in_progress':
      return 'В обработке'
    case 'completed':
      return 'Выполнена'
    case 'cancelled':
      return 'Отменена'
    default:
      return status
  }
}

onMounted(() => {
  loadRequests()
})
</script> 