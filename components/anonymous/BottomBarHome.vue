<template>
  <div class="wrapper">
    <footer>
      <div class="text-center pb-3 pt-3 text-white"> {{ year }} &copy; PET-CC UFRN - Desenvolvido com 
        <i class="fa fa-heart text-white"></i> <a href="https://nuxtjs.org">Nuxt.JS</a></div>
    </footer>
  </div>
</template>

<script>
export default {
    name: 'c-footer',
    data() {
      return {
        year: new Date().getFullYear(),
      }
    },
}
</script>

<style scoped>
.flex-fill {
  flex: 1 1 auto;
}

footer {
  background-color: #89023e;
  font-size: 16px;
}

  
</style>
