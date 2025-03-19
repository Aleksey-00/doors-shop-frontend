<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          :class="{ 'border-red-500': errors.name }"
          placeholder="Введите ваше имя"
          @input="validateName"
        >
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>
      
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          required
          v-mask="'+7 (999) 999-99-99'"
          placeholder="+7 (999) 999-99-99"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          :class="{ 'border-red-500': errors.phone }"
          @input="validatePhone"
        >
        <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
      </div>
      
      <div>
        <label for="comments" class="block text-sm font-medium text-gray-700 mb-1">Комментарии</label>
        <textarea
          id="comments"
          v-model="formData.comments"
          rows="4"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Дополнительная информация"
        ></textarea>
      </div>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Отменить
      </button>
      <button
        type="submit"
        :disabled="!isFormValid"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Заказать звонок
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface CallbackFormData {
  name: string
  phone: string
  comments?: string
}

const emit = defineEmits<{
  (e: 'submit', data: CallbackFormData): void
  (e: 'cancel'): void
}>()

const formData = ref<CallbackFormData>({
  name: '',
  phone: '',
  comments: ''
})

const errors = ref({
  name: '',
  phone: ''
})

const validateName = () => {
  if (!formData.value.name) {
    errors.value.name = 'Введите ваше имя'
  } else if (formData.value.name.length < 2) {
    errors.value.name = 'Имя должно содержать минимум 2 символа'
  } else {
    errors.value.name = ''
  }
}

const validatePhone = () => {
  if (!formData.value.phone) {
    errors.value.phone = 'Введите номер телефона'
  } else {
    const cleanPhone = formData.value.phone.replace(/\D/g, '')
    if (cleanPhone.length !== 11) {
      errors.value.phone = 'Введите корректный номер телефона'
    } else if (!cleanPhone.match(/^(7|8)/)) {
      errors.value.phone = 'Номер должен начинаться с +7 или 8'
    } else {
      errors.value.phone = ''
    }
  }
}

const isFormValid = computed(() => {
  return !errors.value.name && 
         !errors.value.phone && 
         formData.value.name.length >= 2 &&
         formData.value.phone.replace(/\D/g, '').length === 11
})

const handleSubmit = () => {
  validateName()
  validatePhone()
  
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}
</script> 