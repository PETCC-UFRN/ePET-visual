<template>
  <div class="site">
    <AnonymousNav/>
    <nuxt class="Site-content"/>
   <BottomBarHome/> 
    <client-only>
      <cookie-law theme="dark-lime" buttonText="Eu aceito">
        <div slot="message">
          Este site usa cookies para garantir que você obtenha a melhor experiência.
        </div>
      </cookie-law>  
    </client-only>
  </div>
</template>

<style scoped>

.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}

</style>

<script>
import AnonymousNav from "../components/anonymous/AnonymousNav";
import BottomBarHome from "../components/anonymous/BottomBarHome"
  
export default {
  components: {
    AnonymousNav,
    BottomBarHome
  },
  head: {
    title: 'PET-CC UFRN | Início',
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
    ]
  },
}
</script>