<template>
  <div>
    <b-card>
      <Perfil  :photoPath="photoPath" :nome="nome" :status="status" :email="email" 
                :cpf="cpf" :nascimento="nascimento"/>
    </b-card>
    <b-button class="float-left" variant="primary" href="#">Testar</b-button>
  </div>
</template>

<script>
import axios from "~/axios";
import Perfil from "~/components/Perfil";
import Cookies from "js-cookie";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  components:{
    Perfil
  },
  data(){
    return {
      dataPerfil: {},
      photoPath: require('~/assets/users/LemureTutor.jpg'),
      nome: '',
      status: '',
      email: '',
      cpf: '',
      nascimento: ''
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
        this.photoPath = require('~/assets/users/LemureTutor.jpg');
        this.nome = this.dataPerfil.nome;
        this.status = this.userType(this.dataPerfil.tipo_usuario.nome);
        this.email = 'email';
        this.cpf = this.dataPerfil.cpf;
        this.nascimento = 'nascimento';
        //console.log(this.dataPerfil);
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