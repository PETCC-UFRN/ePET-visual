
<template>
  <header class="app-header navbar" >
      <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <b-navbar-nav class="d-md-down-none">
      <template v-for="item in headerItems" >
        <b-nav-item v-bind:key="item.id" :to="item.url" class="px-3"><i :class="item.icon"></i> {{item.name}}</b-nav-item>
      </template>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <HeaderDropdown/>
    </b-navbar-nav>
  </header>
</template>

<script>
  import HeaderDropdown from './HeaderDropdown.vue';

  export default {
    name: 'c-header',
    components: {
      HeaderDropdown
    },
    props:{
      headerItems: {
        tipe: Array,
        required: true,
        default: () => []
      },
    },
    methods: {
      sidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
      },
      sidebarMinimize (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
      },
      mobileSidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
      },
      asideToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('aside-menu-hidden')
      }
    }
  }
</script>


<style scoped>
i {
  font-size:13px;
}
</style>
