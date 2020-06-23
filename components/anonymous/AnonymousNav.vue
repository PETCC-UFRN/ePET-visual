<template>
  <div>
    <nav id="nav" class="navbar fixed-top navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <nuxt-link class="navbar-brand petcc" to="/">PET-CC UFRN</nuxt-link>
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
              <nuxt-link class="nav-link subtopic" to="/">Início</nuxt-link>
            </li>
             <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle subtopic"
                id="navbarDropdownBlog"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Sobre</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                <nuxt-link class="dropdown-item" to="/membros-emeritos">Membros eméritos</nuxt-link>
                <nuxt-link class="dropdown-item" to="/desenvolvedores">Desenvolvedores</nuxt-link>
              </div>
            <li class="nav-item">
              <nuxt-link class="nav-link subtopic" to="/eventos">Eventos</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link subtopic" to="/noticias">Notícias</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link subtopic" :to="{ path: '/',hash:'#contato'}" >Contato</nuxt-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle subtopic"
                id="navbarDropdownBlog"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Área do usuário</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                <nuxt-link class="dropdown-item" to="/login">Acessar</nuxt-link>
                <nuxt-link class="dropdown-item" to="/register">Registrar</nuxt-link>
                <nuxt-link class="dropdown-item" to="/validacao">Validar certificado</nuxt-link>
                
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

a {
  border-radius: 0px !important;
}

#navbarDropdownBlog{
  color: white;
}

#nav {
  background-color: #89023e;    
}

.petcc {
  font-size: 24px;
  font-weight: 600;
  border-color: white;
}

.subtopic {
  font-size: 19px;
  font-weight: 350;
  color: #e098b1;
}
</style>
