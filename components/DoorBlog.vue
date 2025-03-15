<script setup lang="ts">
import { useHead } from '#imports'
import { computed } from 'vue'

const articles = [
  {
    id: 1,
    title: 'Как правильно выбрать входную дверь: полное руководство',
    excerpt: 'Подробный гид по выбору входной двери с учетом всех важных характеристик: безопасность, теплоизоляция, шумоизоляция и дизайн.',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Входная+дверь',
    date: '2024-03-20',
    readTime: '8 мин'
  },
  {
    id: 2,
    title: 'Безопасность вашего дома: классы взломостойкости входных дверей',
    excerpt: 'Разбираемся в классах защиты входных дверей, особенностях каждого уровня безопасности и как выбрать оптимальный вариант для вашего дома.',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Безопасность+дверей',
    date: '2024-03-18',
    readTime: '6 мин'
  },
  {
    id: 3,
    title: 'Уход за входной дверью: советы профессионалов',
    excerpt: 'Рекомендации по уходу за входной дверью, чтобы продлить срок службы и сохранить привлекательный внешний вид. Особенности обслуживания в разные сезоны.',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Уход+за+дверью',
    date: '2024-03-15',
    readTime: '5 мин'
  }
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const schemaData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Блог о входных дверях',
  description: 'Полезные статьи о выборе, установке и обслуживании входных дверей',
  blogPost: articles.map(article => ({
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'Евро Двери'
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

defineExpose({
  articles,
  formatDate,
  schemaData
})
</script>

<template>
  <section class="bg-white py-8 sm:py-12 lg:py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
        Полезные статьи
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article 
          v-for="post in articles" 
          :key="post.id" 
          class="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div class="aspect-[16/9]">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full h-full object-cover"
            >
          </div>
          
          <div class="p-4 sm:p-6">
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <span>•</span>
              <span>{{ post.readTime }} мин чтения</span>
            </div>

            <h3 class="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
              {{ post.title }}
            </h3>

            <p class="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <a 
              href="#" 
              class="inline-flex items-center text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700"
            >
              Читать далее
              <img src="~/assets/icons/chevron-right.svg" alt="" class="w-4 h-4 sm:w-5 sm:h-5 ml-1">
            </a>
          </div>
        </article>
      </div>

      <div class="text-center mt-8 sm:mt-12">
        <a 
          href="/blog" 
          class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Все статьи
        </a>
      </div>
    </div>
  </section>
</template> 