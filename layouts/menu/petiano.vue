<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
            <nuxt />
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from './petiano'
import { Header as AppHeader, Sidebar, Footer as AppFooter, Breadcrumb } from '~/components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    list () {
      return this.$route.matched
    }
  },
}
</script>