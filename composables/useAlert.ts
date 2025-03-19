import { ref } from 'vue'

export type AlertType = 'success' | 'error' | 'info'

export const useAlert = () => {
  const showAlertValue = ref(false)
  const alertMessage = ref('')
  const alertType = ref<AlertType>('success')
  let timeoutId: NodeJS.Timeout | null = null

  const showAlert = (message: string, type: AlertType) => {
    // Очищаем предыдущий таймаут, если он есть
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    alertMessage.value = message
    alertType.value = type
    showAlertValue.value = true

    // Устанавливаем новый таймаут для автоматического скрытия через 3 секунды
    timeoutId = setTimeout(() => {
      hideAlert()
    }, 3000)
  }

  const hideAlert = () => {
    showAlertValue.value = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return {
    showAlertValue,
    alertMessage,
    alertType,
    showAlert,
    hideAlert
  }
} 