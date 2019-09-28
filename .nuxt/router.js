import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _48c93aa4 = () => interopDefault(import('../pages/simple_user/index.vue' /* webpackChunkName: "pages/simple_user/index" */))
const _78fc57b5 = () => interopDefault(import('../pages/aboutPage/_entrance.vue' /* webpackChunkName: "pages/aboutPage/_entrance" */))
const _3e804245 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/simple_user",
      component: _48c93aa4,
      name: "simple_user"
    }, {
      path: "/aboutPage/:entrance?",
      component: _78fc57b5,
      name: "aboutPage-entrance"
    }, {
      path: "/",
      component: _3e804245,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
