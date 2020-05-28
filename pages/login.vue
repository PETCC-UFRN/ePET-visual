<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-img class="mb-2" center fluid src="~/static/img/logo.svg"></b-img>
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
                    type="email"
                    v-model="email"
                    class="form-control"
                    placeholder="E-mail"
                  />
                </b-input-group>
                <b-input-group class="mb-0">
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
                <b-alert show variant="danger" v-if="errors.length !== 0">
                  <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                  </ul>
                </b-alert>
                <b-row>
                  <b-col cols="8" class="text-left mb-2">
                    <b-button @click.prevent="EsqueciSenha()" variant="link" class="px-0">Esqueceu sua senha?</b-button>
                  </b-col>
                  <b-col cols="12">
                    <b-button block variant="success" class="px-4" @click="login()">
                      <i class="fa fa-user"></i> Login
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

  import Cookies from "js-cookie";
  import Swal from "sweetalert2";

  export default {
    name: "Login",
    layout: "clean",
    data() {
      return {
        email: "",
        senha: "",
        perfil: {},
        errors: [],
        mapPerfil: {
          tutor: "tutor",
          petiano: "petiano",
          comum: "usuario"
        },
        cookie: null,
        next: true
      };
    },
    head() {
      return {
        title: "Login - PET-CC UFRN"
      };
    },
    watch: {
      cookie: function (val) {
        if (next && val !== null) {
          this.getProfile();
        }
      }
    },
    mounted() {
      Cookies.set("auth", null);
    },
    methods: {
      EsqueciSenha() {
        this.$router.push("/esqueciSenha");
      },
      goToRegister() {
        this.$router.push("/register");
      },
      validEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      async checkForm() {
        this.errors = [];
        if (!this.email) {
          this.errors.push("O email é obrigatório.");
        } else if (!this.validEmail(this.email)) {
          this.errors.push("Utilize um e-mail válido.");
        }
        if (!this.senha) {
          this.errors.push("A senha é obrigatória.");
        }
        if (this.errors.length === 0) {
          return true;
        }
        return false;
      },
      async login() {
        this.next = await this.checkForm();
        if (this.next) {
          try {
            await this.$axios
              .post("sign-in/", {
                email: this.email,
                senha: this.senha
              })
              .then(auth => {
                // guarda token
                Cookies.set("auth", auth.data);
              });
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                err.response.status === 403
                  ? "Email ou senha não encontrados"
                  : "Aconteceu algum problema com seu login, tente novamente mais tarde!"
            });
            this.next = false;
          }
        }
        if (this.next && Cookies.get("auth") !== null) {
          await this.getProfile();
        }
      },
      getProfile() {
        this.$axios.get("pessoas-usuario", {
          headers: {Authorization: `${Cookies.get("auth")}`}
        })
          .then(res => {
            this.perfil = res.data;
            Cookies.set("profile", this.perfil);
          })
          .then(res => {
            document.location.href = '/' + this.mapPerfil[this.perfil.tipo_usuario.nome];
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.message
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
  img {
    max-width: 200px;
  }
</style>
