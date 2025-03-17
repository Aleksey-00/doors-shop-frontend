<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Ваше имя</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        placeholder="Введите ваше имя"
      />
    </div>
    
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        placeholder="+7 (___) ___-__-__"
      />
    </div>
    
    <div>
      <label for="address" class="block text-sm font-medium text-gray-700">Адрес</label>
      <input
        id="address"
        v-model="form.address"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        placeholder="Введите адрес для замера"
      />
    </div>
    
    <div>
      <label for="comment" class="block text-sm font-medium text-gray-700">Комментарий</label>
      <textarea
        id="comment"
        v-model="form.comment"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        placeholder="Дополнительная информация"
      ></textarea>
    </div>
    
    <div class="flex justify-end">
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Заказать замер
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
export interface MeasurementFormData {
  name: string
  phone: string
  address: string
  comment: string
}

const emit = defineEmits<{
  (e: 'submit', data: MeasurementFormData): void
}>()

const form = ref<MeasurementFormData>({
  name: '',
  phone: '',
  address: '',
  comment: ''
})

const submitForm = () => {
  emit('submit', { ...form.value })
  form.value = {
    name: '',
    phone: '',
    address: '',
    comment: ''
  }
}
</script> 