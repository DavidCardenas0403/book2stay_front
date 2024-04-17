import { getUser } from '~/api/auth/getUser'
import nuxtStorage from 'nuxt-storage'
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('HOLA')
  const logged = await getUser(
    JSON.parse(nuxtStorage.localStorage.getData('userInfo'))?.accessToken
  )
  console.log(
    JSON.parse(nuxtStorage.localStorage.getData('userInfo'))?.accessToken
  )
  if (!logged) {
    //return abortNavigation()
    return navigateTo('/auth/login')
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  /*   if (to.path !== '/') {
    return navigateTo('/auth/login')
  } */
})
