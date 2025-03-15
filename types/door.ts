export interface Door {
  id: string
  title: string
  category: string
  price: number
  oldPrice?: number
  imageUrls: string[]
  inStock: boolean
  updatedAt: string
}

export interface DoorFilters {
  page: number
  limit: number
  category?: string
  priceMin?: number
  priceMax?: number
  inStock?: boolean
}

export interface DoorsResponse {
  doors: Door[]
  totalPages: number
  currentPage: number
  totalDoors: number
} 