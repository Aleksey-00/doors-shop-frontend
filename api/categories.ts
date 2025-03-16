import type { Category } from '~/types/category'
import { useSecureApi } from '~/composables/useSecureApi'

export const useCategories = () => {
  const api = useSecureApi()

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const data = await api.get('/api/categories')
      return data || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  return {
    fetchCategories
  }
} 