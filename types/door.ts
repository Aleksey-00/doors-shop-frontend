export interface Door {
  id: string
  title: string
  category: string
  price: number
  oldPrice?: number
  imageUrls: string[]
  inStock: boolean
  updatedAt: string
  description?: string
  specifications?: Record<string, string>
  dimensions?: {
    width?: number
    height?: number
    depth?: number
  }
  materials?: {
    frame?: string
    coating?: string
    insulation?: string
  }
  equipment?: string[]
  features?: string[]
  manufacturer?: string
  warranty?: string
  installation?: {
    opening?: 'left' | 'right' | 'universal'
    type?: string
  }
}

export interface DoorFilters {
  page: number
  limit: number
  category?: string
  priceMin?: number
  priceMax?: number
  inStock?: boolean
  sort?: 'popular' | 'price_asc' | 'price_desc' | 'new'
}

export interface DoorsResponse {
  doors: Door[]
  totalPages: number
  currentPage: number
  totalDoors: number
} 