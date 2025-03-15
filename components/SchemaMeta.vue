<script setup lang="ts">
import { useHead } from '#imports'
import { computed, watch } from 'vue'
import type { Door } from '~/types/door'

interface Props {
  type: 'Product' | 'Organization' | 'WebSite' | 'BreadcrumbList'
  door?: Door
  category?: string
}

const props = defineProps<Props>()

const schemaData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Магазин входных дверей',
  description: 'Магазин входных дверей европейского качества',
  url: 'https://your-domain.com',
  logo: 'https://your-domain.com/images/logo.svg',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RU',
    addressLocality: 'Ваш город'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-XXX-XXX-XXXX',
    contactType: 'customer service'
  }
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
  <!-- Empty template needed -->
</template> 