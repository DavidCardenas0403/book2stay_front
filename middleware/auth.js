import { getUser } from '~/api/auth/getUser'
import { ref } from 'vue'

const showLoginModalRef = ref(false);


export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(from.path)
  if (process.client) {
    const accessToken =
      JSON.parse(localStorage.getItem('userInfo'))?.accessToken ?? ''
    if (accessToken) {
      const logged = await getUser(accessToken)
      if (logged.id) {
        logged['accessToken'] = accessToken
        console.log(logged)
        localStorage.setItem('userInfo', JSON.stringify(logged))
        console.log('LOGUEADO')
        return
      } else {
        console.log('NO LOGUEADO')
        /* if (to.path === '/auth/login') {
          return
        } */
        showLoginModalRef.value = true;
        return navigateTo('/');
        // return navigateTo('/auth/login')
      }
      //return navigateTo('/auth/login')
    } else {
      /* if (to.path === '/auth/login') {
        console.log('else')
        return
      } */
      showLoginModalRef.value = true;
      return navigateTo('/');
      // return navigateTo('/auth/login')
    }
  }

  /*   if (!logged.data?.id) {
    return abortNavigation()
  } */
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  /*   if (to.path !== '/') {
    return navigateTo('/auth/login')
  } */
})

export function showLoginModal() {
  showLoginModalRef.value = true;
}

// Función para cerrar el modal de inicio de sesión
export function closeLoginModal() {
  showLoginModalRef.value = false;
}