<template>
  <footer class="app-footer">
    <span>{{ year }} &copy;  PET-CC UFRN - Programa de Educação Tutorial de Ciência da Computação</span>
    <span class="ml-auto">Template por <a href="http://coreui.io">CoreUI</a></span>
  </footer>
</template>
<script>
export default {
  name: 'c-footer',
  data(){
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
