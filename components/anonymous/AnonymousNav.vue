<template>
<div>
  <b-navbar toggleable="lg" type="dark" class="fixed-top">
    <b-navbar-brand class="petcc " to="/#">PET-CC UFRN</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item id="subtopic" to="/" >Início</b-nav-item>
        <b-nav-item-dropdown id="subtopic" right>
          <template v-slot:button-content>
           <span>Notícias</span> 
          </template>
          <b-dropdown-item id="drop" to="/noticias/novas">Novas</b-dropdown-item>
          <b-dropdown-item id="drop">Antigas</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown id="subtopic" right>
          <template v-slot:button-content>
           <span>Eventos</span> 
          </template>
          <b-dropdown-item id="drop" to="/eventos/abertos">Abertos</b-dropdown-item>
          <b-dropdown-item id="drop">Encerrados</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item id="subtopic" to="/tutorias" >Tutorias</b-nav-item>
        <b-nav-item-dropdown id="subtopic" right>
          <template v-slot:button-content>
           <span>Outras atividades</span> 
          </template>
          <b-dropdown-item id="drop" to="/outras-atividades/seminarios-pesquisa">Seminários de Pesquisa</b-dropdown-item>
          <b-dropdown-item id="drop" to="/outras-atividades/reunioes-conversacao-ingles">Reuniões Conversação em Inglês</b-dropdown-item>
          <b-dropdown-item id="drop" to="/outras-atividades/petplay">PetPlay: prática com jogos em inglês</b-dropdown-item>
          <b-dropdown-item id="drop" to="/outras-atividades/competicoes-programacao">Treinamento para Competições de Programação</b-dropdown-item>
          <b-dropdown-item id="drop" to="/outras-atividades/cientec">Participação na CIENTEC</b-dropdown-item>
          <b-dropdown-item id="drop" to="/outras-atividades/mostra-profissoes">Participação na Mostra de Profissões da UFRN</b-dropdown-item>
          <b-dropdown-item id="drop" to="/outras-atividades/mesa-redonda-ingressantes">Mesa redonda com ingressantes</b-dropdown-item>
          <b-dropdown-item id="drop" to="/outras-atividades/encontros-grupos-pet">Encontros dos Grupos PET</b-dropdown-item>
          
        </b-nav-item-dropdown>
        <b-nav-item-dropdown id="subtopic" right>
          <template v-slot:button-content>
           <span>Sobre</span> 
          </template>
          <b-dropdown-item id="drop" to="/sobre/o-petcc-ufrn">O PET-CC UFRN</b-dropdown-item>
          <b-dropdown-item id="drop" to="/sobre/petianos">Petianos</b-dropdown-item>
          <b-dropdown-item id="drop" to="/sobre/ex-petianos">Ex-petianos</b-dropdown-item>
          <b-dropdown-item id="drop" to="/sobre/desenvolvedores">Desenvolvedores</b-dropdown-item>
         </b-nav-item-dropdown>
        <b-nav-item-dropdown id="subtopic" right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
           <span>Área do usuário</span> 
          </template>
          <b-dropdown-item class="drop" to="/login">Entrar</b-dropdown-item>
          <b-dropdown-item to="/register">Cadastrar</b-dropdown-item>
          <b-dropdown-item to="/validacao">Validar declaração</b-dropdown-item>
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
.dropdown .dropdown-menu .dropdown-item:focus {
  outline: none;
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
