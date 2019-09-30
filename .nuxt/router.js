import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1e8ee345 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _59cb001c = () => interopDefault(import('../pages/charts.vue' /* webpackChunkName: "pages/charts" */))
const _0827e55c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _4de63400 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _48c93aa4 = () => interopDefault(import('../pages/simple_user/index.vue' /* webpackChunkName: "pages/simple_user/index" */))
const _586046e2 = () => interopDefault(import('../pages/widgets.vue' /* webpackChunkName: "pages/widgets" */))
const _03d4956f = () => interopDefault(import('../pages/base/breadcrumbs.vue' /* webpackChunkName: "pages/base/breadcrumbs" */))
const _0ae6087c = () => interopDefault(import('../pages/base/cards.vue' /* webpackChunkName: "pages/base/cards" */))
const _7444e81c = () => interopDefault(import('../pages/base/carousels.vue' /* webpackChunkName: "pages/base/carousels" */))
const _39f59c76 = () => interopDefault(import('../pages/base/collapses.vue' /* webpackChunkName: "pages/base/collapses" */))
const _75065a8e = () => interopDefault(import('../pages/base/forms.vue' /* webpackChunkName: "pages/base/forms" */))
const _6c465f10 = () => interopDefault(import('../pages/base/jumbotrons.vue' /* webpackChunkName: "pages/base/jumbotrons" */))
const _56c64902 = () => interopDefault(import('../pages/base/list-groups.vue' /* webpackChunkName: "pages/base/list-groups" */))
const _2def4502 = () => interopDefault(import('../pages/base/navbars.vue' /* webpackChunkName: "pages/base/navbars" */))
const _5ec5f3be = () => interopDefault(import('../pages/base/navs.vue' /* webpackChunkName: "pages/base/navs" */))
const _8d6a9790 = () => interopDefault(import('../pages/base/paginations.vue' /* webpackChunkName: "pages/base/paginations" */))
const _695ddd5f = () => interopDefault(import('../pages/base/popovers.vue' /* webpackChunkName: "pages/base/popovers" */))
const _0966d13f = () => interopDefault(import('../pages/base/progress-bars.vue' /* webpackChunkName: "pages/base/progress-bars" */))
const _31b9d3d3 = () => interopDefault(import('../pages/base/switches.vue' /* webpackChunkName: "pages/base/switches" */))
const _dcd3baa6 = () => interopDefault(import('../pages/base/table.vue' /* webpackChunkName: "pages/base/table" */))
const _b64c57d4 = () => interopDefault(import('../pages/base/tables.vue' /* webpackChunkName: "pages/base/tables" */))
const _510ad27e = () => interopDefault(import('../pages/base/tooltips.vue' /* webpackChunkName: "pages/base/tooltips" */))
const _49bb82b4 = () => interopDefault(import('../pages/buttons/button-groups.vue' /* webpackChunkName: "pages/buttons/button-groups" */))
const _32c5c532 = () => interopDefault(import('../pages/buttons/dropdowns.vue' /* webpackChunkName: "pages/buttons/dropdowns" */))
const _413c420c = () => interopDefault(import('../pages/buttons/social-buttons.vue' /* webpackChunkName: "pages/buttons/social-buttons" */))
const _900d2ec8 = () => interopDefault(import('../pages/buttons/standard-buttons.vue' /* webpackChunkName: "pages/buttons/standard-buttons" */))
const _6139d6f6 = () => interopDefault(import('../pages/icons/flags.vue' /* webpackChunkName: "pages/icons/flags" */))
const _7a00cb57 = () => interopDefault(import('../pages/icons/font-awesome.vue' /* webpackChunkName: "pages/icons/font-awesome" */))
const _eb32bd0c = () => interopDefault(import('../pages/icons/simple-line-icons.vue' /* webpackChunkName: "pages/icons/simple-line-icons" */))
const _1f009bfb = () => interopDefault(import('../pages/notifications/alerts.vue' /* webpackChunkName: "pages/notifications/alerts" */))
const _260a43d8 = () => interopDefault(import('../pages/notifications/badges.vue' /* webpackChunkName: "pages/notifications/badges" */))
const _566d554a = () => interopDefault(import('../pages/notifications/modals.vue' /* webpackChunkName: "pages/notifications/modals" */))
const _2921fa40 = () => interopDefault(import('../pages/pages/404.vue' /* webpackChunkName: "pages/pages/404" */))
const _201ce01d = () => interopDefault(import('../pages/pages/500.vue' /* webpackChunkName: "pages/pages/500" */))
const _626fafd3 = () => interopDefault(import('../pages/theme/colors.vue' /* webpackChunkName: "pages/theme/colors" */))
const _076edadc = () => interopDefault(import('../pages/theme/typography.vue' /* webpackChunkName: "pages/theme/typography" */))
const _78fc57b5 = () => interopDefault(import('../pages/aboutPage/_entrance.vue' /* webpackChunkName: "pages/aboutPage/_entrance" */))
const _3e804245 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active open',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/admin",
      component: _1e8ee345,
      name: "admin"
    }, {
      path: "/charts",
      component: _59cb001c,
      name: "charts"
    }, {
      path: "/login",
      component: _0827e55c,
      name: "login"
    }, {
      path: "/register",
      component: _4de63400,
      name: "register"
    }, {
      path: "/simple_user",
      component: _48c93aa4,
      name: "simple_user"
    }, {
      path: "/widgets",
      component: _586046e2,
      name: "widgets"
    }, {
      path: "/base/breadcrumbs",
      component: _03d4956f,
      name: "base-breadcrumbs"
    }, {
      path: "/base/cards",
      component: _0ae6087c,
      name: "base-cards"
    }, {
      path: "/base/carousels",
      component: _7444e81c,
      name: "base-carousels"
    }, {
      path: "/base/collapses",
      component: _39f59c76,
      name: "base-collapses"
    }, {
      path: "/base/forms",
      component: _75065a8e,
      name: "base-forms"
    }, {
      path: "/base/jumbotrons",
      component: _6c465f10,
      name: "base-jumbotrons"
    }, {
      path: "/base/list-groups",
      component: _56c64902,
      name: "base-list-groups"
    }, {
      path: "/base/navbars",
      component: _2def4502,
      name: "base-navbars"
    }, {
      path: "/base/navs",
      component: _5ec5f3be,
      name: "base-navs"
    }, {
      path: "/base/paginations",
      component: _8d6a9790,
      name: "base-paginations"
    }, {
      path: "/base/popovers",
      component: _695ddd5f,
      name: "base-popovers"
    }, {
      path: "/base/progress-bars",
      component: _0966d13f,
      name: "base-progress-bars"
    }, {
      path: "/base/switches",
      component: _31b9d3d3,
      name: "base-switches"
    }, {
      path: "/base/table",
      component: _dcd3baa6,
      name: "base-table"
    }, {
      path: "/base/tables",
      component: _b64c57d4,
      name: "base-tables"
    }, {
      path: "/base/tooltips",
      component: _510ad27e,
      name: "base-tooltips"
    }, {
      path: "/buttons/button-groups",
      component: _49bb82b4,
      name: "buttons-button-groups"
    }, {
      path: "/buttons/dropdowns",
      component: _32c5c532,
      name: "buttons-dropdowns"
    }, {
      path: "/buttons/social-buttons",
      component: _413c420c,
      name: "buttons-social-buttons"
    }, {
      path: "/buttons/standard-buttons",
      component: _900d2ec8,
      name: "buttons-standard-buttons"
    }, {
      path: "/icons/flags",
      component: _6139d6f6,
      name: "icons-flags"
    }, {
      path: "/icons/font-awesome",
      component: _7a00cb57,
      name: "icons-font-awesome"
    }, {
      path: "/icons/simple-line-icons",
      component: _eb32bd0c,
      name: "icons-simple-line-icons"
    }, {
      path: "/notifications/alerts",
      component: _1f009bfb,
      name: "notifications-alerts"
    }, {
      path: "/notifications/badges",
      component: _260a43d8,
      name: "notifications-badges"
    }, {
      path: "/notifications/modals",
      component: _566d554a,
      name: "notifications-modals"
    }, {
      path: "/pages/404",
      component: _2921fa40,
      name: "pages-404"
    }, {
      path: "/pages/500",
      component: _201ce01d,
      name: "pages-500"
    }, {
      path: "/theme/colors",
      component: _626fafd3,
      name: "theme-colors"
    }, {
      path: "/theme/typography",
      component: _076edadc,
      name: "theme-typography"
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
