export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem('admin_token')
    if (!token && to.path.startsWith('/admin') && to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
}) 