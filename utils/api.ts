export const useApi = () => {
  const config = useRuntimeConfig();
  
  const fetchApi = async (endpoint: string, options: any = {}) => {
    const url = `${config.public.apiBase}${endpoint}`;
    
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

  return {
    get: (endpoint: string, options = {}) => 
      fetchApi(endpoint, { ...options, method: 'GET' }),
    post: (endpoint: string, data: any, options = {}) => 
      fetchApi(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
    put: (endpoint: string, data: any, options = {}) => 
      fetchApi(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),
    delete: (endpoint: string, options = {}) => 
      fetchApi(endpoint, { ...options, method: 'DELETE' }),
  };
}; 