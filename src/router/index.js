import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { LocalStorage, Notify } from 'quasar'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if(!LocalStorage.getItem('token')) {
        next({
          path: '/login',
        })
        Notify.create({
          message: 'You must be logged in to view this page',
          color: 'negative',
          icon: 'warning',
          position: 'top',
          timeout: 3000,
          actions: [{
            icon: 'close',
            color: 'white',
          }]
        })
      } else {
        next()
      }
    }
    if (to.matched.some(record => record.meta.requiresVisitor)) {
      if(LocalStorage.getItem('token')) {
        next({
          // Replace route redirect to home
          path: '/',
          replace: true
        })
        Notify.create({
          message: 'You must be logged out to view this page',
          color: 'negative',
          icon: 'warning',
          position: 'top',
          timeout: 3000,
          actions: [{
            icon: 'close',
            color: 'white',
          }]
        })
      } else {
        next()
      }
    }
  })

  return Router
})
