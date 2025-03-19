export const usePrice = () => {
  const formatPrice = (price: number): string => {
    // Убедимся, что цена является числом
    const numericPrice = Number(price)
    if (isNaN(numericPrice)) return '0 ₽'
    
    // Округляем до целого числа и форматируем с разделителями тысяч
    return Math.round(numericPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽'
  }

  return {
    formatPrice
  }
} 