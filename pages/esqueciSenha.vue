<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5" sm="8">
          <b-card no-body class="mx-auto">
            <b-card-body class="p-4">
              <b-img center class="mb-4" fluid src="~/static/img/pet-logo.png"></b-img>
              <h1 class="text-center">Esqueci a senha</h1>
              <p class="text-muted text-center">Digite o endereço de e-mail da sua conta de usuário e enviaremos um email contendo
                um link de redefinição de senha.</p>

              <b-input-group class="mt-4 mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <input type="email" class="form-control" placeholder="Digite o email" v-model="usuario.email">
              </b-input-group>

              <b-button :disabled="usuario.email == ''" variant="success" @click.prevent="register()" block><i class="fa fa-envelope mr-2"></i> Confirmar envio
              </b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Swal from "sweetalert2";

  export default {
    name: 'Register',
    layout: 'clean',
    data: function () {
      return {
        usuario: {
          email: "",
        },
        error: null
      };
    },
    head() {
      return {
        title: "Esqueci a senha - PET-CC UFRN"
      }
    },

    methods: {
      register() {
        let url = this.$axios.defaults.baseURL;

        axios.get(`${url}/forgot?email=${this.usuario.email}`)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Email enviado",
            text: "Foi enviado para o seu email um link para que sua conta " +
              "tenha a senha resetada."
          })
          .then( () => this.$router.push("/#") );
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Erro no envio...",
            text: err.message
          });
        });
      }
    }
  }
</script>

<style scoped>
p {
  font-size: 18px;
}
img {
  max-width: 200px;
}
</style>
