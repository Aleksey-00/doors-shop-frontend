<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Корзина</h1>
    
    <div v-if="items.length === 0" class="text-center py-8">
      <p class="text-gray-600">Корзина пуста</p>
      <NuxtLink 
        to="/" 
        class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Cart Items -->
      <div class="space-y-4">
        <div 
          v-for="item in items" 
          :key="item.id" 
          class="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
        >
          <img 
            :src="filteredImageUrls(item.imageUrls)[0]" 
            :alt="item.title" 
            class="w-24 h-24 object-cover rounded" 
          />
          <div class="flex-1">
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="text-gray-600">{{ formatPrice(item.price) }}</p>
          </div>
          <button 
            @click="removeItem(item)"
            class="text-red-500 hover:text-red-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Order Form -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-6">Оформление заказа</h2>
        <form @submit.prevent="submitOrder" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Имя</label>
            <input 
              v-model="orderForm.name" 
              type="text" 
              required
              :class="[
                'mt-1 block w-full rounded-md border shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2',
                errors.name ? 'border-red-300' : 'border-gray-300'
              ]"
              @blur="validateName"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Телефон</label>
            <input 
              ref="phoneInput"
              v-model="orderForm.phone"
              type="tel" 
              required
              placeholder="8 (999) 999-99-99"
              v-mask
              :class="[
                'mt-1 block w-full rounded-md border shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2',
                errors.phone ? 'border-red-300' : 'border-gray-300'
              ]"
              @blur="validatePhone"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Адрес</label>
            <textarea 
              v-model="orderForm.address" 
              required
              rows="3"
              :class="[
                'mt-1 block w-full rounded-md border shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2',
                errors.address ? 'border-red-300' : 'border-gray-300'
              ]"
              @blur="validateAddress"
            ></textarea>
            <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Комментарий</label>
            <textarea 
              v-model="orderForm.comment"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            ></textarea>
          </div>
          <div class="pt-6 border-t mt-6">
            <div class="flex justify-between text-lg font-semibold mb-4">
              <span>Итого:</span>
              <span>{{ formatPrice(total) }}</span>
            </div>
            <button 
              type="submit"
              :disabled="!isFormValid"
              :class="[
                'w-full px-6 py-3 rounded transition-colors text-base font-medium',
                isFormValid 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Оформить заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <Alert
    :show="showAlertValue"
    :message="alertMessage"
    :type="alertType"
    @close="hideAlert"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Door } from '~/types/door'
import { Mask } from 'maska'
import { useRuntimeConfig } from '#app'
import { useSecureApi } from '~/composables/useSecureApi'
import { usePrice } from '~/composables/usePrice'
import { useAlert } from '~/composables/useAlert'

const config = useRuntimeConfig()
const { formatPrice } = usePrice()
const { showAlertValue, alertMessage, alertType, showAlert, hideAlert } = useAlert()

const items = ref<Door[]>([])

const orderForm = ref({
  name: '',
  phone: '',
  address: '',
  comment: ''
})

const errors = ref({
  name: '',
  phone: '',
  address: ''
})

const phoneInput = ref<HTMLElement | null>(null)

// Validation functions
const validateName = () => {
  if (!orderForm.value.name) {
    errors.value.name = 'Имя обязательно для заполнения'
  } else if (orderForm.value.name.length < 2) {
    errors.value.name = 'Имя должно содержать минимум 2 символа'
  } else {
    errors.value.name = ''
  }
}

const validatePhone = () => {
  // Очищаем номер от всех символов кроме цифр и берем только первые 11 цифр
  const cleanPhone = orderForm.value.phone.replace(/\D/g, '').slice(0, 11)
  
  // Обновляем значение в форме с учетом ограничения
  orderForm.value.phone = cleanPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '8 ($2) $3-$4-$5')
  
  if (!orderForm.value.phone) {
    errors.value.phone = 'Телефон обязателен для заполнения'
  } else if (cleanPhone.length !== 11) {
    errors.value.phone = 'Номер телефона должен содержать 11 цифр'
  } else if (!cleanPhone.match(/^(7|8)/)) {
    errors.value.phone = 'Номер телефона должен начинаться с 7 или 8'
  } else {
    errors.value.phone = ''
  }
}

const validateAddress = () => {
  if (!orderForm.value.address) {
    errors.value.address = 'Адрес обязателен для заполнения'
  } else if (orderForm.value.address.length < 10) {
    errors.value.address = 'Адрес должен содержать минимум 10 символов'
  } else {
    errors.value.address = ''
  }
}

const validateForm = () => {
  validateName()
  validatePhone()
  validateAddress()
}

const isFormValid = computed(() => {
  const cleanPhone = orderForm.value.phone.replace(/\D/g, '')
  return orderForm.value.name.length >= 2 &&
    cleanPhone.length === 11 &&
    cleanPhone.match(/^(7|8)/) &&
    orderForm.value.address.length >= 10 &&
    !errors.value.name &&
    !errors.value.phone &&
    !errors.value.address
})

// Load cart items from localStorage
onMounted(() => {
  // Load cart items from localStorage
  const cartItems = localStorage.getItem('cart')
  if (cartItems) {
    items.value = JSON.parse(cartItems)
  }
})

const filteredImageUrls = (urls: string[]) => {
  if (!urls || !Array.isArray(urls)) return []
  return urls.filter(url => !url.includes('double_ring.svg'))
}

const total = computed(() => {
  return items.value.reduce((sum, item) => {
    // Убедимся, что цена является числом
    const price = Number(item.price)
    return sum + (isNaN(price) ? 0 : price)
  }, 0)
})

const removeItem = (item: Door) => {
  items.value = items.value.filter(i => i.id !== item.id)
  localStorage.setItem('cart', JSON.stringify(items.value))
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'cart',
    newValue: JSON.stringify(items.value)
  }))
  
  showAlert('Товар удален из корзины', 'info')
}

const submitOrder = async () => {
  validateForm()
  
  if (!isFormValid.value) {
    showAlert('Пожалуйста, проверьте правильность заполнения формы', 'error')
    return
  }

  try {
    const orderData = {
      ...orderForm.value,
      items: items.value,
      total: total.value
    }

    console.log('Отправка заказа:', orderData)

    const api = useSecureApi()
    const result = await api.post('/api/orders', orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    console.log('Заказ успешно создан:', result)

    // Clear cart
    items.value = []
    localStorage.removeItem('cart')
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cart',
      newValue: JSON.stringify([])
    }))
    
    // Reset form
    orderForm.value = {
      name: '',
      phone: '',
      address: '',
      comment: ''
    }

    showAlert('Заказ успешно оформлен! Скоро с вами свяжутся.', 'success')
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error)
    showAlert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.', 'error')
  }
}

const addToCart = (item: Door) => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Door[]
  if (!cartItems.some((cartItem: Door) => cartItem.id === item.id)) {
    cartItems.push(item)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    showAlert('Товар добавлен в корзину', 'success')
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cart',
      newValue: localStorage.getItem('cart')
    }))
  } else {
    showAlert('Товар уже в корзине', 'info')
  }
}
</script> 