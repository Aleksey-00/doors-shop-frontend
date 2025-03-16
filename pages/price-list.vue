<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-center mb-8">Прайс-лист</h1>
      
      <div class="bg-white rounded-lg shadow-sm p-4 h-[800px]">
        <object
          :data="pdfUrl"
          type="application/pdf"
          class="w-full h-full"
        >
          <div class="flex flex-col items-center justify-center h-full">
            <p class="mb-4">Ваш браузер не поддерживает встроенные PDF файлы.</p>
            <a :href="pdfUrl" target="_blank" class="text-blue-600 hover:text-blue-800">
              Скачать PDF
            </a>
          </div>
        </object>
      </div>

      <div class="mt-6 text-center">
        <a
          :href="pdfUrl"
          download
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Скачать прайс-лист
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '#imports'

const pdfUrl = ref('/files/price.pdf')

// SEO метаданные
useHead({
  title: 'Прайс-лист на входные двери | Премиум двери',
  meta: [
    {
      name: 'description',
      content: 'Актуальный прайс-лист на входные двери. Премиум, стандарт и эконом класс. Цены на установку и доставку.'
    }
  ]
})
</script> 