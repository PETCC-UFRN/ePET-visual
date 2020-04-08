<template>
  <div>
    <nav id="nav" class="navbar fixed-top navbar-expand-lg navbar-dark cor fixed-top">
      <div class="container">
        <nuxt-link class="navbar-brand m" to="/">PET-CC UFRN</nuxt-link>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/eventos">Eventos</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/noticias">Notícias</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/validacao">Validar certificado</nuxt-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownBlog"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Área do usuário</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                <nuxt-link class="dropdown-item" to="/login"><i class="fas fa-sign-in-alt"></i> Login</nuxt-link>
                <nuxt-link class="dropdown-item" to="/register"><i class="fas fa-user-plus"></i> Registrar</nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.m{
  font-weight: bold;
  font-size: 24px; 
}
i{
  font-size:24px;
}
</style>

<script>
export default {
  mounted() {
      let fontawesome = document.createElement('script')
      fontawesome.setAttribute('src', 'https://kit.fontawesome.com/a076d05399.js')
      document.head.appendChild(fontawesome)

      this.$nextTick(function(){
        window.addEventListener("scroll", function(){
          var navbar = document.getElementById("nav");
          var nav_classes = navbar.classList;
          if(document.documentElement.scrollTop >= 50) {
            if (nav_classes.contains("shrink") === false) {
              nav_classes.toggle("shrink");
            }
          }
          else {
            if (nav_classes.contains("shrink") === true) {
              nav_classes.toggle("shrink");
            }
          }
        })
      })
    },
}
</script>