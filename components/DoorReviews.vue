<script setup lang="ts">
import { useHead } from '#imports'
import { computed, ref } from 'vue'
import starFilledIcon from '~/assets/icons/star-filled.svg'
import starEmptyIcon from '~/assets/icons/star-empty.svg'

defineOptions({
  name: 'DoorReviews',
  cachePolicy: 'no-cache'
})

const currentSlide = ref(0)

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const nextSlide = () => {
  if (currentSlide.value < reviews.length - 3) {
    currentSlide.value++
  }
}

const reviews = [
  {
    id: 1,
    author: 'Анна Петрова',
    rating: 5,
    date: '2024-03-15',
    text: 'Заказывала входную дверь премиум класса. Очень довольна качеством и установкой. Дверь отлично держит тепло и шумоизоляция на высоте.',
    doorModel: 'Премиум 3к - Модель P-150'
  },
  {
    id: 2,
    author: 'Сергей Иванов',
    rating: 5,
    date: '2024-03-10',
    text: 'Заказал входную дверь премиум класса. Монтаж выполнен профессионально, дверь отлично установлена и выглядит солидно. Очень доволен качеством.',
    doorModel: 'Премиум - Модель P-200'
  },
  {
    id: 3,
    author: 'Мария Сидорова',
    rating: 4,
    date: '2024-03-05',
    text: 'Хорошие двери по разумной цене. Менеджеры помогли с выбором, учли все пожелания. Единственное - доставка заняла чуть больше времени, чем обещали.',
    doorModel: 'Эконом - Модель E-100'
  },
  {
    id: 4,
    author: 'Дмитрий Козлов',
    rating: 5,
    date: '2024-03-01',
    text: 'Отличная дверь! Установка прошла быстро и чисто. Особенно порадовала шумоизоляция - теперь не слышно соседей.',
    doorModel: 'Премиум - Модель P-180'
  },
  {
    id: 5,
    author: 'Елена Смирнова',
    rating: 5,
    date: '2024-02-28',
    text: 'Спасибо за профессиональный подход! Дверь установили аккуратно, все объяснили по эксплуатации. Качество на высоте.',
    doorModel: 'Премиум 3к - Модель P-160'
  },
  {
    id: 6,
    author: 'Игорь Васильев',
    rating: 4,
    date: '2024-02-25',
    text: 'Хорошая дверь за свои деньги. Менеджер помог подобрать оптимальный вариант под мой бюджет. Монтаж выполнен качественно.',
    doorModel: 'Стандарт - Модель S-120'
  },
  {
    id: 7,
    author: 'Наталья Морозова',
    rating: 5,
    date: '2024-02-20',
    text: 'Заказывала дверь с терморазрывом. Зиму пережили отлично - в квартире тепло, никаких сквозняков. Рекомендую!',
    doorModel: 'Премиум - Модель P-220T'
  },
  {
    id: 8,
    author: 'Александр Попов',
    rating: 5,
    date: '2024-02-15',
    text: 'Дверь превзошла ожидания! Отличная шумоизоляция, надежные замки, стильный дизайн. Спасибо команде за профессионализм.',
    doorModel: 'Премиум 3к - Модель P-170'
  }
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const averageRating = computed(() => {
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.length).toFixed(1)
})

const schemaData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: reviews.map((review, index) => ({
    '@type': 'Review',
    position: index + 1,
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating
    },
    reviewBody: review.text,
    datePublished: review.date
  }))
}))

const schema = computed(() => ({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify(schemaData.value)
  }]
}))

const showNavigation = computed(() => reviews.length > 3)

useHead(schema)
</script>

<template>
  <section class="bg-gray-50 py-8 sm:py-12 lg:py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
        Отзывы наших клиентов
      </h2>

      <!-- Desktop Slider -->
      <div class="hidden lg:block relative">
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 33.333}%)` }"
          >
            <div 
              v-for="review in reviews" 
              :key="review.id"
              class="w-1/3 flex-shrink-0 px-3"
            >
              <div class="bg-white p-6 rounded-lg shadow-sm h-full">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {{ review.author.substring(0, 2).toUpperCase() }}
                  </div>
                  <div class="ml-4">
                    <h3 class="font-medium text-gray-900">{{ review.author }}</h3>
                    <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
                  </div>
                </div>
                <div class="flex mb-2">
                  <template v-for="i in 5" :key="i">
                    <img 
                      :src="i <= review.rating ? starFilledIcon : starEmptyIcon"
                      :alt="i <= review.rating ? 'Заполненная звезда' : 'Пустая звезда'"
                      class="w-5 h-5"
                    >
                  </template>
                </div>
                <p class="text-gray-600 mb-2">{{ review.text }}</p>
                <p class="text-sm text-gray-500">{{ review.doorModel }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <template v-if="showNavigation">
          <button 
            @click="prevSlide"
            :disabled="currentSlide === 0"
            class="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="~/assets/icons/chevron-left.svg" alt="Предыдущий" class="w-6 h-6">
          </button>
          <button 
            @click="nextSlide"
            :disabled="currentSlide >= reviews.length - 3"
            class="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="~/assets/icons/chevron-right.svg" alt="Следующий" class="w-6 h-6">
          </button>
        </template>
      </div>

      <!-- Mobile/Tablet Grid -->
      <div class="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div 
          v-for="review in reviews.slice(0, 4)" 
          :key="review.id"
          class="bg-white p-4 sm:p-6 rounded-lg shadow-sm"
        >
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              {{ review.author.substring(0, 2).toUpperCase() }}
            </div>
            <div class="ml-3 sm:ml-4">
              <h3 class="font-medium text-gray-900 text-sm sm:text-base">{{ review.author }}</h3>
              <p class="text-xs sm:text-sm text-gray-500">{{ formatDate(review.date) }}</p>
            </div>
          </div>
          <div class="flex mb-2">
            <template v-for="i in 5" :key="i">
              <img 
                :src="i <= review.rating ? starFilledIcon : starEmptyIcon"
                :alt="i <= review.rating ? 'Заполненная звезда' : 'Пустая звезда'"
                class="w-4 h-4 sm:w-5 sm:h-5"
              >
            </template>
          </div>
          <p class="text-sm sm:text-base text-gray-600 mb-2">{{ review.text }}</p>
          <p class="text-xs sm:text-sm text-gray-500">{{ review.doorModel }}</p>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-8 sm:mt-12">
        <a 
          href="/reviews" 
          class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Все отзывы
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transition-transform {
  will-change: transform;
}

button {
  transition: opacity 0.3s ease-in-out;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button:not(:disabled):hover {
  opacity: 0.9;
}
</style> 