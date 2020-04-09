
<template>
  <header class="app-header navbar">
    Pet-CC
    
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
