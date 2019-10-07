<template>
  <footer class="app-footer">
    <span><a href="http://petcc.dimap.ufrn.br/" target="_blank">PET-CC</a> &copy; {{ year }}</span>
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
