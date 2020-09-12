<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5" sm="8">
          <b-card no-body class="mx-auto">
            <b-card-body class="p-4">
              <b-img center class="mb-4" fluid src="~/static/img/pet-logo.png"></b-img>
              <h1 class="text-center">Redefinição de senha</h1>
              <p class="text-muted text-center">Digite a nova senha da sua conta de usuário para que seja feita a redefinição de senha.</p>

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

              <b-button :disabled="usuario.email == ''" variant="success" @click.prevent="redefinirSenha()" block><i
                class="fa fa-check-circle  mr-1"></i> Confirmar redefinição
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
        this.$axios
          .post('reset/', {
            code: this.$route.query.code,
            senha: this.usuario.senha
          })
          .then(res => {
            Swal.fire({
              icon: "success",
              title: "Senha redefinida"
            })
            .then( () => this.$router.push("/login") );
          })
          .catch(err => {
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
p {
  font-size: 18px;
}
img {
  max-width: 200px;
}
</style>
