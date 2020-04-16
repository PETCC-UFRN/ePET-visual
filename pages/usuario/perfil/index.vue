<template>
  <div>
    <b-card>
      <Perfil  :fotoPath="fotoPath" :nome="nome" :status="status" :email="email" 
                :cpf="cpf" :editProfile="editProfile" :petianoTutorInfo="false"/>
    </b-card>
    <!--<b-button class="float-left" variant="primary" href="#">Testar</b-button>-->
  </div>
</template>

<script>
import axios from "~/axios";
import Perfil from "~/components/Perfil";
import Cookies from "js-cookie";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  components:{
    Perfil
  },
  data(){
    return {
      dataPerfil: {},
      fotoPath: require('~/assets/users/LemureUsuario.jpeg'),
      nome: '',
      status: '',
      email: '',
      cpf: '',
      editProfile: '/usuario/perfil/create'
    }
  },

  mounted(){
    this.getInfo();
  },

  methods: {
    
    getInfo(){
      axios
      .get("pessoas-usuario", {headers: {'Authorization': `${Cookies.get("auth")}`}})
      .then(res => {
        this.dataPerfil = res.data;
        this.fotoPath = require('~/assets/users/LemureUsuario.jpeg');
        this.nome = this.dataPerfil.nome;
        this.status = this.userType(this.dataPerfil.tipo_usuario.nome);
        this.email = this.dataPerfil.usuario.email;
        this.cpf = this.dataPerfil.cpf;
        console.log(this.dataPerfil);
      })
    },

    userType(type){
      let result = ''
      if(type === 'comum'){ return 'Usuário';}
      else if(type === 'petiano'){ return 'Petiano';}
      else {return 'Tutor';} 
    }
  }
};
</script>