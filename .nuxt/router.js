import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0c6a7f48 = () => interopDefault(import('../pages/aboutPage/_entrance.vue' /* webpackChunkName: "pages/aboutPage/_entrance" */))
const _47c069a8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/aboutPage/:entrance?",
      component: _0c6a7f48,
      name: "aboutPage-entrance"
    }, {
      path: "/",
      component: _47c069a8,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
