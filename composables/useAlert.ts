import { ref } from 'vue'

export type AlertType = 'success' | 'error' | 'info'

export const useAlert = () => {
  const showAlertValue = ref(false)
  const alertMessage = ref('')
  const alertType = ref<AlertType>('success')

  const showAlert = (message: string, type: AlertType) => {
    alertMessage.value = message
    alertType.value = type
    showAlertValue.value = true
  }

  const hideAlert = () => {
    showAlertValue.value = false
  }

  return {
    showAlertValue,
    alertMessage,
    alertType,
    showAlert,
    hideAlert
  }
} 