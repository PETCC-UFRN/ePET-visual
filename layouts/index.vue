<template>
  <div class="tema">
    <AnonymousNav/>
    <nuxt />
  </div>
    
</template>

<style scoped>

body, html {
    margin: 0;
    height: 100%;
}

/* para garantir que estes elementos ocuparão toda a tela */

.tema {
  height: 100vh;
  background-image: url('https://i.imgur.com/YXwU87x.jpg');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
    /* position: relative; posição fixa para que a possível rolagem da tela não revele espaços em branco */
    /* width: 100%; */
}
</style>


<script>
import AnonymousNav from "../components/anonymous/AnonymousNav";

export default {
  components: {
    AnonymousNav,
  },
  head: {
    title: 'PET-CC UFRN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/index/style.css' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
      { src: '/js/index/particles.js' },
    ]
  },
}
</script>