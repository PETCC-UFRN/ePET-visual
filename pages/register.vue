<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-img class="mb-2" center fluid src="~/static/img/logo.svg"></b-img>
              <h1>Cadastro</h1>
              <p class="text-muted">Preencha todos os campos abaixo para criação da conta.</p>
              <b-input-group class="mt-4 mb-3">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="text" class="form-control" placeholder="Nome completo" v-model="usuario.nome">
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <input type="email" class="form-control" placeholder="Email" v-model="usuario.email">
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>CPF</b-input-group-text>
                </b-input-group-prepend>
                <!-- <input type="text" class="form-control" placeholder="Ex.: 000.000.000-00" v-model="usuario.cpf"> -->
                <the-mask :mask="['###.###.###-##']" class="form-control" placeholder="Ex.: 000.000.000-00" v-model="usuario.cpf" />
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" class="form-control" placeholder="Senha" v-model="usuario.senha">
              </b-input-group>

              <b-input-group class="mb-4">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" class="form-control" placeholder="Repetir senha">
              </b-input-group>

              <b-button class="btn btn-success" @click="register()" block> <i class="fa fa-user-plus"></i> Criar conta</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import {TheMask} from 'vue-the-mask';
import Swal from "sweetalert2";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: 'Register',
  layout: 'clean',
  components: {
    TheMask
  },
  data: function (){
    return {
      usuario:{
        nome:"",
        email: "",
        senha: "",
        cpf: ""
      },
      error: null
    };
  },
  validations: {
    usuario: {
      nome: { required },
      email: { required, email },
      cpf: { required },
      senha: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs('senha') }
    }
  },
  head () {
    return {
      title: "Registrar - PET-CC UFRN"
    }
  },
  methods: {
    async register(){
      try{
        
        await this.$axios.post('sign-up/',{
          email: this.usuario.email,
          senha: this.usuario.senha,
          cpf: this.usuario.cpf,
          nome: this.usuario.nome
        }).then(res => {
          this.usuario.email = "";
          this.usuario.senha = "";
          this.usuario.cpf = "";
          this.usuario.nome = "";
          Swal.fire({
            icon: "info",
            title: "Falta pouco...",
            text: "Foi enviado para o seu email um link para que sua conta " + 
            "seja validada."
          });
          
        })
        // this.$router.push('/usuarios');
      } catch(err){
          Swal.fire({
            icon: "error",
            title: "Erro no cadastro...",
            text: err.message
          });
      }
    }
  }
}
</script>


<style scoped>
img {
  max-width: 200px;
}
</style>