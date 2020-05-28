<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-img center class="mb-4" fluid src="~/static/img/logo.svg"></b-img>
              <h4>Redefinição de senha</h4>
              <p class="text-muted">Digite a nova senha da sua conta de usuário para redefinição de senha.</p>

              <b-input-group class="mt-4 mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-lock"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <input required type="password"
                       v-model="usuario.senha" class="form-control" placeholder="Nova senha"
                />
              </b-input-group>

              <b-button variant="success" @click.prevent="redefinirSenha()" block><i
                class="fa fa-check-circle fa-lg mr-0"></i> Confirmar redefinição de senha
              </b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

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
        title: "Redefinição de senha - PET-CC UFRN"
      }
    },
    methods: {
      redefinirSenha() {
        this.$axios.post('reset/', {
          code: this.$route.query.code,
          senha: this.usuario.senha
        }).then(res => {
          this.usuario.senha = "";

          Swal.fire({
            icon: "success",
            title: "Senha redefinida"
          });

        }).catch(err => {
          Swal.fire({
            icon: "error",
            title: "Erro na redefinição...",
            text: err.message
          });
        });
      }
    }
  }
</script>


<style scoped>

  img {
    max-width: 200px;
  }
</style>
