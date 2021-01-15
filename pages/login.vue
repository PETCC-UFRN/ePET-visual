<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card no-body class="p-4 mx-auto">
            <b-card-body>
              <form @submit.prevent="login">
                <b-img class="mb-2" center fluid src="~/static/img/pet-logo.png"></b-img>
                <h1>Acessar</h1>
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
                    id="password"
                    required
                    :type="passwordFieldType"
                    v-model="senha"
                    class="form-control"
                    placeholder="Senha"
                  />
                </b-input-group>
                <b-row class="px-0">
                  <b-col cols="6">
                    <b-form-checkbox
                      id="checkbox-1"
                      class="mt-2 ml-2 text"
                      v-model="mostrarSenha"
                      @change="mudarVisibilidadeSenha"
                    >
                      Mostrar a senha
                    </b-form-checkbox>
                  </b-col>
                  <b-col cols="6" class="text-right mb-2">
                    <b-button to="/esqueciSenha" variant="link">Esqueceu sua senha?</b-button>
                  </b-col>
                </b-row>
                <b-row class="mt-3 mb-3">
                  <b-col>
                    <b-button type="submit" block variant="success" class="px-4">
                      Entrar
                    </b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="mt-3 mb-3 text-center">

              Ainda não tem conta?
              <nuxt-link
                  :to="`/register`"
                > Cadastrar-se</nuxt-link>
              </p>
                  </b-col>
                </b-row>
              </form>
            </b-card-body>
          </b-card>
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
        mostrarSenha: false,
        passwordFieldType: "password",
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
        title: "PET-CC UFRN | Login"
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
      mudarVisibilidadeSenha() {
        this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        this.mostrarSenha = !this.mostrarSenha;
      },
      async login() {
        Swal.fire({
          title: 'Carregando...',
          text: 'Aguarde alguns instantes.',
          showCancelButton: false,
          showConfirmButton: false,
          onOpen: () => {
            Swal.showLoading()
          }
        })

        await this.$axios
          .post("sign-in/", {
            email: this.email,
            senha: this.senha
          })
          .then(auth => {
            Cookies.set("auth", auth.data);
          })
          .catch(err => {
            let text;
            let icon = "error";
            if (err.response.status === 403) {
              text = "Email ou senha não encontrados";
            }
            else if (err.response.status === 500 && err.response.data.message === "Usuário nao validado, foi reenviado o email de confirmação") {
              icons = "info";
              text = "Seu cadastro ainda não foi confirmado. Verifique seu email e tente novamente.";
            }
            else if (err.response.status === 500 && err.response.data.message === "Invalid username/password supplied") {
              text = "O email e/ou a senha não conferem.";
            } 
            else {
              text = "Aconteceu algum problema com seu login, tente novamente. "
              + "Caso o erro persista, envie email para petcc@dimap.ufrn.br explicando o ocorrido.";
            }

            Swal.fire({
              icon: icon,
              title: "Oops...",
              text: text,
            });
          })

        if (Cookies.get("auth") !== "null") {
          console.log(typeof Cookies.get("auth"));
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

a {
  text-decoration: none;
}
text {
  color: gray;
}
</style>
