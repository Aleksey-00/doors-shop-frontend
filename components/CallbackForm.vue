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
    
    <div class="flex justify-end">
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Заказать звонок
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
export interface CallbackFormData {
  name: string
  phone: string
}

const emit = defineEmits<{
  (e: 'submit', data: CallbackFormData): void
}>()

const form = ref<CallbackFormData>({
  name: '',
  phone: ''
})

const submitForm = () => {
  emit('submit', { ...form.value })
  form.value = {
    name: '',
    phone: ''
  }
}
</script> 