<script setup lang="ts">
import { useHead } from '#imports'
import { computed, ref } from 'vue'

const activeIndex = ref<number | null>(null)

const toggleItem = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

// Mock FAQ data (replace with real data)
const faqItems = [
  {
    question: 'Как выбрать входную дверь?',
    answer: 'При выборе входной двери обратите внимание на несколько важных факторов: материал изготовления, толщину металла, тип замков, утепление и звукоизоляцию. Также важно учитывать условия эксплуатации двери и особенности помещения.'
  },
  {
    question: 'Какой срок доставки?',
    answer: 'Срок доставки зависит от вашего региона и наличия товара на складе. В среднем доставка занимает 1-3 рабочих дня по Москве и 3-7 дней по России. Точные сроки доставки вы можете уточнить при оформлении заказа.'
  },
  {
    question: 'Предоставляете ли вы гарантию?',
    answer: 'Да, мы предоставляем гарантию на все наши двери. Стандартный гарантийный срок составляет 1 год с момента покупки. На некоторые модели действует расширенная гарантия до 3 лет.'
  },
  {
    question: 'Как происходит установка двери?',
    answer: 'Установка осуществляется нашими профессиональными мастерами. В процессе установки производится демонтаж старой двери, подготовка проема, установка новой двери с регулировкой и проверкой всех механизмов.'
  },
  {
    question: 'Можно ли заказать дверь по индивидуальным размерам?',
    answer: 'Да, мы принимаем заказы на изготовление дверей по индивидуальным размерам. Срок изготовления такой двери составляет от 2 до 4 недель в зависимости от сложности заказа.'
  }
]

const schemaData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
}))

const schema = computed(() => ({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify(schemaData.value)
  }]
}))

useHead(schema)
</script>

<template>
  <section class="bg-gray-50 py-8 sm:py-12 lg:py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
        Часто задаваемые вопросы
      </h2>
      
      <div class="max-w-3xl mx-auto space-y-4">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <button
            @click="toggleItem(index)"
            class="w-full flex justify-between items-center p-4 sm:p-6 text-left"
            :aria-expanded="activeIndex === index"
          >
            <span class="text-base sm:text-lg font-medium text-gray-900">{{ item.question }}</span>
            <span 
              class="ml-4 flex-shrink-0 text-gray-400 transition-transform duration-200"
              :class="activeIndex === index ? 'rotate-180' : ''"
            >
              <img src="~/assets/icons/chevron-down.svg" alt="" class="w-5 h-5 sm:w-6 sm:h-6">
            </span>
          </button>
          
          <div 
            v-show="activeIndex === index"
            class="px-4 sm:px-6 pb-4 sm:pb-6"
          >
            <p class="text-sm sm:text-base text-gray-600">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 