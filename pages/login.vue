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
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input
                    required
                    type="text"
                    v-model="email"
                    class="form-control"
                    placeholder="E-mail"
                  />
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input
                    required
                    type="password"
                    v-model="senha"
                    class="form-control"
                    placeholder="Senha"
                  />
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="success" class="px-4" @click="login()">
                      <i class="fa fa-user"></i> Login
                    </b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Esqueceu sua senha?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white py-5 d-md-down-none k" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Cadastrar</h2>
                  <p>Faça o cadastro para participar dos eventos realizados pelo PET-CC UFRN.</p>
                  <b-button
                    variant="success"
                    class="active mt-3"
                    @click="goToRegister()"
                  >Clique aqui para se cadastrar!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <b-modal ref="perfis" hide-footer title="Selecione um perfil">
      <b-button
        class="mt-2"
        variant="primary"
        block
        @click="$router.push(mapPerfil[perfil.nome])"
        v-for="perfil in perfis"
        :key="perfil.id"
      >{{ perfil.nome.toUpperCase() }}</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "~/axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default {
  name: "Login",
  layout: "clean",

  data() {
    return {
      email: "",
      senha: "",
      errors: [],
      perfis: [],
      mapPerfil: {
        tutor: "tutor",
        petiano: "petiano",
        comum: "usuario"
      }
    };
  },

  head() {
    return {
      title: "Login - PET-CC UFRN"
    };
  },

  methods: {
    goToRegister() {
      this.$router.push("/register");
    },

    login() {
      axios
        .post("sign-in/", {
          email: this.email,
          senha: this.senha
        })
        .then(auth => {
          Cookies.set("auth", auth.data);
          this.$store.commit("setAuth", auth.data);
        })
        .then(() => {
          axios
            .get("tipo-usuario")
            .then(res => {
              this.perfis = res.data;
            })
            .then((res) => {
              if(this.perfis.length == 1){
                console.log('hue');
                this.$router.push(this.mapPerfil[this.perfis[0].nome])
              }else{
                this.showModal();
              }
            });
        }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message
            });
        });
    },

    showModal() {
      this.$refs["perfis"].show();
    },

    hideModal() {
      this.$refs["perfis"].hide();
    },

    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["perfis"].toggle("#toggle-btn");
    }
  }
};
</script>

<style scoped>
.k {
  background: #89023e;
}
</style>
