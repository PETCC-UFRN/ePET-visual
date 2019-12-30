<template>
  <div>
    <nav id="nav" class="navbar fixed-top navbar-expand-lg navbar-dark cor fixed-top">
      <div class="container">
        <a class="navbar-brand m" href="/">PET-CC UFRN</a>
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
              <a class="nav-link" href="/evento">Eventos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/noticia">Notícias</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/validarCertificado">Validar certificado</a>
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
                <a class="dropdown-item" href="/login">Login</a>
                <a class="dropdown-item" href="/register">Registrar</a>
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

</style>

<script>
export default {
  mounted() {
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