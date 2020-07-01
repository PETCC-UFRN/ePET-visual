<template>
<div>
  <b-navbar toggleable="lg" type="dark" class="fixed-top ">
    <b-navbar-brand class="petcc " to="/#">PET-CC UFRN</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item id="subtopic" to="/#" >Início</b-nav-item>
        <b-nav-item-dropdown id="subtopic" right>
          <template v-slot:button-content>
           <span>Sobre</span> 
          </template>
          <b-dropdown-item id="drop" to="/membros-emeritos">Membros eméritos</b-dropdown-item>
          <b-dropdown-item id="drop" to="/desenvolvedores">Desenvolvedores</b-dropdown-item>
         </b-nav-item-dropdown>
        <b-nav-item id="subtopic" to="/eventos" >Eventos</b-nav-item>
        <b-nav-item id="subtopic" to="/noticias" >Notícias</b-nav-item>
        <b-nav-item-dropdown id="subtopic" right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
           <span>Área do usuário</span> 
          </template>
          <b-dropdown-item class="drop" to="/login">Entrar</b-dropdown-item>
          <b-dropdown-item to="/register">Cadastrar</b-dropdown-item>
          <b-dropdown-item to="/validacao">Validar certificado</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<style scoped>
span {
  color: rgba(255,255,255,0.5) !important;
}

#drop {
  border-radius: 0px !important;
}

nav {
  background-color: #89023e;  ;  
}

.petcc {
  font-size: 24px;
  font-weight: 600;
  border-color: white;
  padding-left: 20px;
}


@media(max-width: 500px){
  .petcc {
    padding-left: 0px;
  }
}  

#subtopic {
  font-size: 19px;
  font-weight: 350;
  }
</style>
