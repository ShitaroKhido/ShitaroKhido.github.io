import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'

i18next.use(HttpApi).init({
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  backend: {
    loadPath: 'locales/{{lng}}/translation.json',
  },
  debug: true,
})

export default i18next
