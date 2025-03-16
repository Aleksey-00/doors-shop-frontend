import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig();
  
  // Получаем базовый URL из конфигурации
  let baseURL = config.public.apiBase;
  
  // Проверяем, находимся ли мы в продакшен-окружении и преобразуем HTTP в HTTPS
  if (process.env.NODE_ENV === 'production' && baseURL.startsWith('http:')) {
    baseURL = baseURL.replace('http:', 'https:');
    console.log('Converted API base URL to HTTPS:', baseURL);
  }
  
  // Проверяем, запущено ли приложение по HTTPS, и если да, то принудительно используем HTTPS для API
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && baseURL.startsWith('http:')) {
    baseURL = baseURL.replace('http:', 'https:');
    console.log('Forced HTTPS for API due to secure page context:', baseURL);
  }
  
  const fetchApi = async (endpoint: string, options: any = {}) => {
    const url = `${baseURL}${endpoint}`;
    
    const defaultOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const fetchOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...(options.headers || {}),
      },
    };

    try {
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const get = async (endpoint: string) => {
    return await fetch(`${baseURL}${endpoint}`)
      .then(res => res.json())
  };
  
  const post = async (endpoint: string, data: any) => {
    return await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
  };

  const put = (endpoint: string, data: any, options = {}) => 
    fetchApi(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) });

  const remove = (endpoint: string, options = {}) => 
    fetchApi(endpoint, { ...options, method: 'DELETE' });

  return {
    get,
    post,
    put,
    remove,
  };
}; 