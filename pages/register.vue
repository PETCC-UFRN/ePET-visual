<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <h1>Cadastrar</h1>
              <p class="text-muted">Preencha os campos abaixo para criação da conta.</p>
              <b-input-group class="mb-3">
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

              <b-button class="btn btn-success" @click="register()" block>Criar conta</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {TheMask} from 'vue-the-mask'
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: 'Register',
  layout: 'clean',
  components: {TheMask},

  data:function (){
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
        
        await axios.post('http://epet.imd.ufrn.br/service/api/usuarios-cadastrar/',{
          email: this.usuario.email,
          senha: this.usuario.senha,
          cpf: this.usuario.cpf,
          nome: this.usuario.nome
        }).then(res => {
          console.log("FOI!")
          this.usuario.email = "";
          this.usuario.senha = "";
          this.usuario.cpf = "";
          this.usuario.nome = "";
        })

        this.$router.push('/usuarios');
      } catch(e){
        this.alert.class = "danger";
        this.alert.message = "Erro no cadastramento da notícia. Por favor, tente novamente.";
        this.error = e.response.data.message
      }
    }
  }
}
</script>
