import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  // Проверяем и модифицируем URL API при необходимости
  if (config.public.apiBase && config.public.apiBase.startsWith('http:')) {
    // В продакшене или если страница загружена по HTTPS, принудительно используем HTTPS для API
    if (process.env.NODE_ENV === 'production' || 
        (typeof window !== 'undefined' && window.location.protocol === 'https:')) {
      
      // Создаем новый объект с модифицированным URL
      const secureApiBase = config.public.apiBase.replace('http:', 'https:');
      
      // Переопределяем apiBase в конфигурации
      config.public.apiBase = secureApiBase;
      
      console.log('API base URL forced to HTTPS:', secureApiBase);
    }
  }
  
  // Добавляем глобальный обработчик ошибок для запросов API
  nuxtApp.hook('app:error', (error) => {
    if (error.message && error.message.includes('Failed to fetch')) {
      console.error('API connection error. This might be due to mixed content restrictions. Ensure API uses HTTPS.');
    }
  });
}); 