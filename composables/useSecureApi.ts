import { useApi } from '~/utils/api';

export const useSecureApi = () => {
  const api = useApi();
  
  // Функция для обеспечения HTTPS в URL
  const ensureHttps = (url: string) => {
    // Удаляем любые упоминания портов
    url = url.replace(/:\d+/, '');
    
    if (process.env.NODE_ENV === 'production' && url.startsWith('http:')) {
      return url.replace('http:', 'https:');
    }
    return url;
  };
  
  // Оборачиваем все методы API для обеспечения HTTPS
  const secureGet = async (endpoint: string, options?: RequestInit) => {
    try {
      // Используем fetch напрямую, так как useApi.get не поддерживает options
      const config = useRuntimeConfig();
      const baseURL = ensureHttps(config.public.apiBase);
      const response = await fetch(`${baseURL}${endpoint}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      // Если запрос не удался, проверим, не связано ли это с HTTP/HTTPS
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        console.warn('API request failed, trying with HTTPS');
        const config = useRuntimeConfig();
        const baseURL = ensureHttps(config.public.apiBase);
        return await fetch(`${baseURL}${endpoint}`, options).then(res => res.json());
      }
      throw error;
    }
  };
  
  const securePost = async (endpoint: string, data: any, options?: RequestInit) => {
    try {
      // Объединяем параметры с данными для POST-запроса
      const config = useRuntimeConfig();
      const baseURL = ensureHttps(config.public.apiBase);
      const fetchOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {})
        },
        body: JSON.stringify(data),
        ...options
      };
      
      const response = await fetch(`${baseURL}${endpoint}`, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        console.warn('API request failed, trying with HTTPS');
        const config = useRuntimeConfig();
        const baseURL = ensureHttps(config.public.apiBase);
        const fetchOptions: RequestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {})
          },
          body: JSON.stringify(data),
          ...options
        };
        return await fetch(`${baseURL}${endpoint}`, fetchOptions).then(res => res.json());
      }
      throw error;
    }
  };
  
  const securePut = async (endpoint: string, data: any, options?: RequestInit) => {
    try {
      const config = useRuntimeConfig();
      const baseURL = ensureHttps(config.public.apiBase);
      const fetchOptions: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {})
        },
        body: JSON.stringify(data),
        ...options
      };
      
      const response = await fetch(`${baseURL}${endpoint}`, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        console.warn('API request failed, trying with HTTPS');
        const config = useRuntimeConfig();
        const baseURL = ensureHttps(config.public.apiBase);
        const fetchOptions: RequestInit = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {})
          },
          body: JSON.stringify(data),
          ...options
        };
        return await fetch(`${baseURL}${endpoint}`, fetchOptions).then(res => res.json());
      }
      throw error;
    }
  };
  
  const secureRemove = async (endpoint: string, options?: RequestInit) => {
    try {
      const config = useRuntimeConfig();
      const baseURL = ensureHttps(config.public.apiBase);
      const fetchOptions: RequestInit = {
        method: 'DELETE',
        headers: {
          ...(options?.headers || {})
        },
        ...options
      };
      
      const response = await fetch(`${baseURL}${endpoint}`, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        console.warn('API request failed, trying with HTTPS');
        const config = useRuntimeConfig();
        const baseURL = ensureHttps(config.public.apiBase);
        const fetchOptions: RequestInit = {
          method: 'DELETE',
          headers: {
            ...(options?.headers || {})
          },
          ...options
        };
        return await fetch(`${baseURL}${endpoint}`, fetchOptions).then(res => res.json());
      }
      throw error;
    }
  };
  
  return {
    get: secureGet,
    post: securePost,
    put: securePut,
    remove: secureRemove,
  };
}; 