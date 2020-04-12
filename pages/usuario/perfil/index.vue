<template>
  <div>
    <b-card>
      <Perfil  :photoPath="photoPath" :nome="nome" :status="status" :perfilInfo="perfilInfo" />
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";
import Perfil from "~/components/Perfil";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  components:{
    Perfil
  },
  data(){
    return {
      photoPath: require('~/assets/users/LemureUsuario.jpeg'),
      nome: 'Lêmure Usuário Comum',
      status: 'Usuário',
      perfilInfo: '<div class="textDark float-left mr-5">' + 
            '<h5><strong>Email: </strong>lemore@gmail.com</h5>' +
            '<h5><strong>Senha:</strong> ********</h5>' +
            '</div>' + 
            '<div class="textDark float-rigth">' +
            '<h5><strong>Data de nascimento: </strong>05/03/1996</h5>' +
            '<h5><strong>CPF: </strong> 001.290.312-19</h5>' + 
            '</div>'
    }
  }
};
</script>