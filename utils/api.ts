import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;
  
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