<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <h1>Cadastrar</h1>
              <p class="text-muted">Criar conta</p>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="text" class="form-control" placeholder="Nome" v-model="usuario.nome">
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <input type="text" class="form-control" placeholder="Email" v-model="usuario.email">
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>CPF</b-input-group-text>
                </b-input-group-prepend>
                <input type="text" class="form-control" placeholder="Ex.: 000.000.000-00" v-model="usuario.cpf">
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

              <b-button variant="success" @click="register()" block>Criar conta</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Register',
  layout: 'clean',

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

  methods: {
    async register(){
      try{

        await axios.post('http://localhost:8080/api/usuarios-cadastrar/',{
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
        this.error = e.response.data.message
      }
    }
  }
}
</script>
