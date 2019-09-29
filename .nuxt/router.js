import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0880883c = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _89fc0d96 = () => interopDefault(import('../pages/charts.vue' /* webpackChunkName: "pages/charts" */))
const _22ca908e = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _64fb1a83 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _7006dcea = () => interopDefault(import('../pages/simple_user/index.vue' /* webpackChunkName: "pages/simple_user/index" */))
const _6d67f5ff = () => interopDefault(import('../pages/widgets.vue' /* webpackChunkName: "pages/widgets" */))
const _f158d21c = () => interopDefault(import('../pages/base/breadcrumbs.vue' /* webpackChunkName: "pages/base/breadcrumbs" */))
const _43c01b85 = () => interopDefault(import('../pages/base/cards.vue' /* webpackChunkName: "pages/base/cards" */))
const _05b5db96 = () => interopDefault(import('../pages/base/carousels.vue' /* webpackChunkName: "pages/base/carousels" */))
const _1a4cb808 = () => interopDefault(import('../pages/base/collapses.vue' /* webpackChunkName: "pages/base/collapses" */))
const _838d0b5e = () => interopDefault(import('../pages/base/forms.vue' /* webpackChunkName: "pages/base/forms" */))
const _7b861295 = () => interopDefault(import('../pages/base/jumbotrons.vue' /* webpackChunkName: "pages/base/jumbotrons" */))
const _4b756af6 = () => interopDefault(import('../pages/base/list-groups.vue' /* webpackChunkName: "pages/base/list-groups" */))
const _124cfff6 = () => interopDefault(import('../pages/base/navbars.vue' /* webpackChunkName: "pages/base/navbars" */))
const _7b153c04 = () => interopDefault(import('../pages/base/navs.vue' /* webpackChunkName: "pages/base/navs" */))
const _3cc9b5bb = () => interopDefault(import('../pages/base/paginations.vue' /* webpackChunkName: "pages/base/paginations" */))
const _8489fa88 = () => interopDefault(import('../pages/base/popovers.vue' /* webpackChunkName: "pages/base/popovers" */))
const _ada903fc = () => interopDefault(import('../pages/base/progress-bars.vue' /* webpackChunkName: "pages/base/progress-bars" */))
const _f3d20da0 = () => interopDefault(import('../pages/base/switches.vue' /* webpackChunkName: "pages/base/switches" */))
const _4a6d7b20 = () => interopDefault(import('../pages/base/table.vue' /* webpackChunkName: "pages/base/table" */))
const _fbeaa69a = () => interopDefault(import('../pages/base/tables.vue' /* webpackChunkName: "pages/base/tables" */))
const _2bd7bc1e = () => interopDefault(import('../pages/base/tooltips.vue' /* webpackChunkName: "pages/base/tooltips" */))
const _9c0009de = () => interopDefault(import('../pages/buttons/button-groups.vue' /* webpackChunkName: "pages/buttons/button-groups" */))
const _5a036778 = () => interopDefault(import('../pages/buttons/dropdowns.vue' /* webpackChunkName: "pages/buttons/dropdowns" */))
const _3cf25562 = () => interopDefault(import('../pages/buttons/social-buttons.vue' /* webpackChunkName: "pages/buttons/social-buttons" */))
const _6fec371f = () => interopDefault(import('../pages/buttons/standard-buttons.vue' /* webpackChunkName: "pages/buttons/standard-buttons" */))
const _a6d825bc = () => interopDefault(import('../pages/icons/flags.vue' /* webpackChunkName: "pages/icons/flags" */))
const _19c5781a = () => interopDefault(import('../pages/icons/font-awesome.vue' /* webpackChunkName: "pages/icons/font-awesome" */))
const _192312d2 = () => interopDefault(import('../pages/icons/simple-line-icons.vue' /* webpackChunkName: "pages/icons/simple-line-icons" */))
const _3f65b804 = () => interopDefault(import('../pages/notifications/alerts.vue' /* webpackChunkName: "pages/notifications/alerts" */))
const _a37133d2 = () => interopDefault(import('../pages/notifications/badges.vue' /* webpackChunkName: "pages/notifications/badges" */))
const _17b9dd4d = () => interopDefault(import('../pages/notifications/modals.vue' /* webpackChunkName: "pages/notifications/modals" */))
const _45714286 = () => interopDefault(import('../pages/pages/404.vue' /* webpackChunkName: "pages/pages/404" */))
const _11f53bfa = () => interopDefault(import('../pages/pages/500.vue' /* webpackChunkName: "pages/pages/500" */))
const _2b59ead6 = () => interopDefault(import('../pages/theme/colors.vue' /* webpackChunkName: "pages/theme/colors" */))
const _7fc79415 = () => interopDefault(import('../pages/theme/typography.vue' /* webpackChunkName: "pages/theme/typography" */))
const _5c65795c = () => interopDefault(import('../pages/aboutPage/_entrance.vue' /* webpackChunkName: "pages/aboutPage/_entrance" */))
const _24f314a2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active open',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/admin",
      component: _0880883c,
      name: "admin"
    }, {
      path: "/charts",
      component: _89fc0d96,
      name: "charts"
    }, {
      path: "/login",
      component: _22ca908e,
      name: "login"
    }, {
      path: "/register",
      component: _64fb1a83,
      name: "register"
    }, {
      path: "/simple_user",
      component: _7006dcea,
      name: "simple_user"
    }, {
      path: "/widgets",
      component: _6d67f5ff,
      name: "widgets"
    }, {
      path: "/base/breadcrumbs",
      component: _f158d21c,
      name: "base-breadcrumbs"
    }, {
      path: "/base/cards",
      component: _43c01b85,
      name: "base-cards"
    }, {
      path: "/base/carousels",
      component: _05b5db96,
      name: "base-carousels"
    }, {
      path: "/base/collapses",
      component: _1a4cb808,
      name: "base-collapses"
    }, {
      path: "/base/forms",
      component: _838d0b5e,
      name: "base-forms"
    }, {
      path: "/base/jumbotrons",
      component: _7b861295,
      name: "base-jumbotrons"
    }, {
      path: "/base/list-groups",
      component: _4b756af6,
      name: "base-list-groups"
    }, {
      path: "/base/navbars",
      component: _124cfff6,
      name: "base-navbars"
    }, {
      path: "/base/navs",
      component: _7b153c04,
      name: "base-navs"
    }, {
      path: "/base/paginations",
      component: _3cc9b5bb,
      name: "base-paginations"
    }, {
      path: "/base/popovers",
      component: _8489fa88,
      name: "base-popovers"
    }, {
      path: "/base/progress-bars",
      component: _ada903fc,
      name: "base-progress-bars"
    }, {
      path: "/base/switches",
      component: _f3d20da0,
      name: "base-switches"
    }, {
      path: "/base/table",
      component: _4a6d7b20,
      name: "base-table"
    }, {
      path: "/base/tables",
      component: _fbeaa69a,
      name: "base-tables"
    }, {
      path: "/base/tooltips",
      component: _2bd7bc1e,
      name: "base-tooltips"
    }, {
      path: "/buttons/button-groups",
      component: _9c0009de,
      name: "buttons-button-groups"
    }, {
      path: "/buttons/dropdowns",
      component: _5a036778,
      name: "buttons-dropdowns"
    }, {
      path: "/buttons/social-buttons",
      component: _3cf25562,
      name: "buttons-social-buttons"
    }, {
      path: "/buttons/standard-buttons",
      component: _6fec371f,
      name: "buttons-standard-buttons"
    }, {
      path: "/icons/flags",
      component: _a6d825bc,
      name: "icons-flags"
    }, {
      path: "/icons/font-awesome",
      component: _19c5781a,
      name: "icons-font-awesome"
    }, {
      path: "/icons/simple-line-icons",
      component: _192312d2,
      name: "icons-simple-line-icons"
    }, {
      path: "/notifications/alerts",
      component: _3f65b804,
      name: "notifications-alerts"
    }, {
      path: "/notifications/badges",
      component: _a37133d2,
      name: "notifications-badges"
    }, {
      path: "/notifications/modals",
      component: _17b9dd4d,
      name: "notifications-modals"
    }, {
      path: "/pages/404",
      component: _45714286,
      name: "pages-404"
    }, {
      path: "/pages/500",
      component: _11f53bfa,
      name: "pages-500"
    }, {
      path: "/theme/colors",
      component: _2b59ead6,
      name: "theme-colors"
    }, {
      path: "/theme/typography",
      component: _7fc79415,
      name: "theme-typography"
    }, {
      path: "/aboutPage/:entrance?",
      component: _5c65795c,
      name: "aboutPage-entrance"
    }, {
      path: "/",
      component: _24f314a2,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
