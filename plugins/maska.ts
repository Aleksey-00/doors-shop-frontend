import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', {
    mounted(el: HTMLInputElement, binding: { value: string }) {
      el.addEventListener('input', function(e) {
        let x = el.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
        if (!x) return
        el.value = !x[2] ? x[1] : `8 (${x[2]})${x[3] ? ` ${x[3]}` : ''}${x[4] ? `-${x[4]}` : ''}${x[5] ? `-${x[5]}` : ''}`
      })
    }
  })
}) 