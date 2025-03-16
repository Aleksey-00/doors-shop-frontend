export default defineNuxtRouteMiddleware((to, from) => {
  // Выполняем только на клиенте и только в продакшене
  if (process.client && process.env.NODE_ENV === 'production') {
    // Если текущий протокол HTTP, перенаправляем на HTTPS
    if (window.location.protocol === 'http:') {
      const httpsUrl = window.location.href.replace('http:', 'https:');
      window.location.href = httpsUrl;
      return abortNavigation('Redirecting to HTTPS...');
    }
    
    // Проверяем, что все API-запросы используют HTTPS
    const config = useRuntimeConfig();
    if (config.public.apiBase && config.public.apiBase.startsWith('http:')) {
      console.warn('API base URL is using HTTP in a secure context. This may cause mixed content issues.');
      // Переопределяем apiBase в конфигурации
      config.public.apiBase = config.public.apiBase.replace('http:', 'https:');
    }
  }
}); 