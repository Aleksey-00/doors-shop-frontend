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
  <section class="bg-gray-50 py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
        Полезные статьи
      </h2>

      <div class="grid gap-8 md:grid-cols-3">
        <!-- Статья 1 -->
        <article v-for="article in articles" :key="article.id" class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="aspect-w-16 aspect-h-9 bg-gray-100">
            <img :src="article.image" :alt="article.title" class="object-cover" />
          </div>
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <time>{{ formatDate(article.date) }}</time>
              <span class="mx-2">•</span>
              <span>{{ article.readTime }} чтения</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ article.title }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ article.excerpt }}
            </p>
            <NuxtLink 
              :to="article.id === 1 ? 'articles/selection' : article.id === 2 ? 'articles/installation' : 'articles/maintenance'"
              class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              Читать далее
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template> 