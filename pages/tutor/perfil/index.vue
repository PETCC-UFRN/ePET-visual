<template>
  <div>
    <b-card>
      <Perfil  :fotoPath="fotoPath" :nome="nome" :status="status" :email="email" 
                :cpf="cpf" :editProfile="editProfile" :petianoTutorInfo="true"
                :areaInteresse="areaInteresse" :dataIngresso="dataIngresso"
                :lattes="lattes" :sitePessoal="sitePessoal"/>
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
  layout: "menu/tutor",
  components:{
    Perfil
  },
  data(){
    return {
      dataPerfil: {},
      dataPerfilTutor: {},
      fotoPath: require('~/assets/users/LemureTutor.jpg'),
      editProfile: '/tutor/perfil/create',
      nome: '',
      status: '',
      email: '',
      cpf: '',
      areaInteresse: '',
      dataIngresso: '',
      lattes: '',
      sitePessoal: ''
    }
  },

  mounted(){
    this.getInfo();
  },

  methods: {
    
    async getInfo(){
      axios
      .get("pessoas-usuario", {headers: {'Authorization': `${Cookies.get("auth")}`}})
      .then(res => {
        this.dataPerfil = res.data;
        this.fotoPath = require('~/assets/users/LemureTutor.jpg');
        this.nome = this.dataPerfil.nome;
        this.status = this.userType(this.dataPerfil.tipo_usuario.nome);
        this.email = this.dataPerfil.usuario.email;
        this.cpf = this.dataPerfil.cpf;
        console.log(this.dataPerfil);
        axios
        .get("petianos-pessoa/" + this.dataPerfil.idPessoa, {headers: {'Authorization': `${Cookies.get("auth")}`}})
        .then(res => {
          this.dataPerfilTutor = res.data;
          this.areaInteresse = this.dataPerfilTutor.area_interesse;
          this.dataIngresso = this.dataPerfilTutor.data_ingresso;
          this.lattes = this.dataPerfilTutor.lattes;
          this.sitePessoal =this.dataPerfilTutor.site_pessoal.replace("https://", "").replace("http://", "");
          //console.log(this.dataPerfilTutor);
        })
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