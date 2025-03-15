import { useRuntimeConfig } from '#app'
import type { Category } from '~/types/category'

export const useCategories = () => {
  const config = useRuntimeConfig()

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const response = await fetch(`${config.public.apiBase}/api/categories`)
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      return response.json()
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  return {
    fetchCategories
  }
} 