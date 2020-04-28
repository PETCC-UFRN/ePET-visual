<template>
  <div>
    <b-card>
      <Perfil :dataPerfil="dataPerfil" :status="status" :petianoTutorInfo="true" :email="email"/>
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
  layout: "menu/petiano",
  components:{
    Perfil
  },
  data(){
    return {
      dataPerfil: {},
      dataPerfilPetiano: {},
      fotoPath: require('~/assets/users/LemurePet.jpg'),
      //editProfile: '/petiano/perfil/edit/'+ this.dataPerfil.tipo_usuario.id,
      //nome: '',
      status: '',
      email: '',
      //cpf: '',
      //areaInteresse: '',
      //dataIngresso: '',
      //lattes: '',
      //sitePessoal: '',
      //perfilID: '',
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
        console.log(this.dataPerfil);
        //this.fotoPath = require('~/assets/users/LemurePet.jpg');
        //this.nome = this.dataPerfil.nome;
        this.status = this.userType(this.dataPerfil.tipo_usuario.nome);
        this.email = this.dataPerfil.usuario.email;
        //this.cpf = this.dataPerfil.cpf;
        //this.perfilID = this.dataPerfil.tipo_usuario.idTipo_usuario;
        //console.log(res);
        //console.log(this.dataPerfil);
        axios
        .get("petianos-pessoa/" + this.dataPerfil.idPessoa, {headers: {'Authorization': `${Cookies.get("auth")}`}})
        .then(res => {
          this.dataPerfilPetiano = res.data;
          //this.areaInteresse = this.dataPerfilPetiano.area_interesse;
          //this.dataIngresso = this.dataPerfilPetiano.data_ingresso;
          //this.lattes = this.dataPerfilPetiano.lattes;
          //this.sitePessoal =this.dataPerfilPetiano.site_pessoal.replace("https://", "").replace("http://", "");
          //console.log(this.dataPerfilPetiano);
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