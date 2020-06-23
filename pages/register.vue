<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-auto">
            <b-card-body class="p-4">
              <form @submit.prevent="register">        
                <b-img class="mb-2" center fluid src="~/static/img/logo.svg"></b-img>
                <h1>Cadastro</h1>
                <p class="text-muted">Preencha todos os campos abaixo para criação da conta.</p>
                <b-input-group class="mt-4 mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <input type="text" class="form-control" placeholder="Nome completo" v-model="usuario.nome" required>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <input type="email" class="form-control" placeholder="Email" v-model="usuario.email" required>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>CPF</b-input-group-text>
                  </b-input-group-prepend>
                  <!-- <input type="text" class="form-control" placeholder="Ex.: 000.000.000-00" v-model="usuario.cpf"> -->
                  <the-mask :mask="['###.###.###-##']" class="form-control" placeholder="Ex.: 000.000.000-00" v-model="usuario.cpf" required/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <input type="password" class="form-control" placeholder="Senha" v-model="usuario.senha" required>
                </b-input-group>

                <b-input-group v-if="usuario.senha !== ''" class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input aria-describedby="input-live-feedback" :state="confirmandoSenha" type="password" class="form-control" placeholder="Repetir senha" v-model="senhaNovamente" required></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    As senhas não conferem 
                  </b-form-invalid-feedback>

                </b-input-group>                
                <b-button type="submit" class="btn btn-success" block> <i class="fa fa-user-plus"></i> Criar conta</b-button>
              </form>
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
export default {
  name: 'Register',
  layout: 'clean',
  components: {
    TheMask
  },
  data(){
    return {
      usuario:{
        nome:"",
        email: "",
        senha: "",
        cpf: ""
      },
      senhaNovamente: ""
    };
  },
  computed: {
    confirmandoSenha() {
      return (this.senhaNovamente == this.usuario.senha) ? true : false
    }
  },
  head () {
    return {
      title: "PET-CC UFRN | Registrar"
    }
  },
  methods: {
    register(){        
      this.$axios
        .post('sign-up/',{
          email: this.usuario.email,
          senha: this.usuario.senha,
          cpf: this.usuario.cpf,
          nome: this.usuario.nome
        })
        .then(res => {
          Swal.fire({
            icon: "info",
            title: "Falta pouco...",
            text: "Foi enviado para o seu email um link para que sua conta " + 
            "seja validada."
          })
          .then ( () => {
            this.usuario.email = "";
            this.usuario.senha = "";
            this.usuario.cpf = "";
            this.usuario.nome = "";
            this.senhaNovamente = "";
          });
        })
        .catch(err =>{
          Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: "Tente novamente."
          });
        })
    }
  }
}
</script>


<style scoped>
img {
  max-width: 200px;
}
</style>