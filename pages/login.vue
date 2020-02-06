<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Preencha os campos abaixo para efetuar acesso.</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <input required type="text" v-model="email" class="form-control" placeholder="E-mail">
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input required type="password" v-model="senha" class="form-control" placeholder="Senha">
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="success" class="px-4" @click="login()"> <i class="fa fa-user"></i> Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Esqueceu sua senha?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white  py-5 d-md-down-none k" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Cadastrar</h2>
                  <p>Faça o cadastro para participar dos eventos realizados pelo PET-CC.</p>
                  <b-button variant="success" class="active mt-3" @click="goToRegister()">Clique aqui para se cadastrar!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Login',
  layout: 'clean',

  data(){
    return{
      email: '',
      senha: '',
      error: null
    }
  },
  head () {
    return {
      title: "Login - PET-CC UFRN"
    }
  },
  methods:{
    goToRegister(){
      this.$router.push('/register');
    },
    async login(){
      try{
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            senha: this.senha
          }
        })

        this.$router.push('/admin')
      } catch(e){
        this.error= e.response.data.message
      }
    }
  }
}


</script>

<style scoped>
.k {
  background: #89023e;
}
</style>