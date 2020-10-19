<template>
<div class="col-md-8">
  <b-card>
    <template v-slot:header>
      <b-row>
        <b-col>
          <h2>
            <i class="fa fa-user px-2"></i> Meus dados
          </h2>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <b-button variant="warning" v-b-modal="'my-modal'" class="float-right mt-2">Modificar senha</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </template>
    <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
      <h4>Carregando...</h4>
      <b-spinner
        style="width: 3rem; height: 3rem;"
        type="grow"
        variant="primary"
        label="Large Spinner"
      ></b-spinner>
    </div>
    <div v-else>
      <b-form @submit.prevent="onSubmit">

        <b-form-group for="nomeCompleto" label="Nome completo" label-class="text-muted pt-0">
          <b-form-input id="nomeCompleto" v-model="profile.nome" required></b-form-input>
          <b-form-text
            id="password-help-block"
          >Este nome estará presente nas declarações providas pelo sistema.</b-form-text>
        </b-form-group>

        <b-form-group  for="email" label="Email" label-class="text-muted pt-0">
          <b-form-input disabled id="email" :value="profile.usuario.email" type="email"></b-form-input>
        </b-form-group>

        <b-button block type="submit" variant="primary"> Atualizar</b-button>
      </b-form>
    </div>
  </b-card>
  <b-modal id="my-modal" hide-footer no-close-on-backdrop>
    <template v-slot:modal-title>
      <h5 class="text-center">Atualizar senha</h5>
    </template>
    <div class="d-block text-center tamanho">
      <p>Recomendações para a nova senha:</p>
      <ul class="text-left">
        <li>tamanho maior ou igual a 12;</li>
        <li>Letra maiúscula;</li>
        <li>Letra minúscula;</li>
        <li>Caractere especial;</li>
        
      </ul>
    </div>
    
    <b-form-input id="password" v-model="form.senha" type="password" class="mb-2" placeholder="Nova senha"></b-form-input>
    <b-input-group v-if="form.senha !== ''" class="mb-4">
      <b-form-input id="copassword" aria-describedby="input-live-feedback"  
        v-model="form.cosenha" type="password" class="mb-2" :state="confirmandoSenha" placeholder="Confirmar senha"></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback" class="tamanho">
        As senhas não conferem
      </b-form-invalid-feedback>   
    </b-input-group>
    <b-button v-if="form.senha !== '' && form.senha === form.cosenha" @click="mudarSenha" variant="primary" class="w-100">Confirmar</b-button>
  </b-modal>

</div>  
</template>

<script>
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      isLoading: true,
      profile: {},
      form: {
        nome: "",
        usuario: {
          email: ""
        },
        senha:"",
        cosenha:""
      }
    };
  },
  mounted() {
    this.getInfo();
  },
  computed: {
    confirmandoSenha() {
      return (this.form.cosenha == this.form.senha) ? true : false
    }
  },
  methods: {
    getInfo() {
      this.$axios
      .get(`/pessoas/${this.$store.state.profile.idPessoa}`)
      .then(res => {
        this.profile = res.data;
        this.isLoading = false;
      })
      .catch(err => {
          Swal.fire({
            title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: "error"
          })
        });
    },

    onSubmit() {
      this.$axios
        .post("pessoas-atualizar/", this.profile)
        .then(res => {
          Swal.fire({
            title: "Dados atualizados",
            icon: "success"
          })
        })
        .catch(err => {
          Swal.fire({
            title: "Dados não atualizados",
            icon: "error"
          })
        });
    },
    mudarSenha() {
      this.$axios
        .post("usuarios-atualizar/", 
          {
            "email":this.profile.usuario.email,
            "senha": this.form.senha
          }
        )
        .then(res => {
          Swal.fire({
            title: "Senha atualizada",
            icon: "success"
          })
        })
        .catch(err => {
          Swal.fire({
            title: "Senha não atualizada",
            icon: "error"
          })
        });
    }
  }
};
</script>

<style scoped>
h2,
h4 {
  font-weight: 300;
}

.textcolor {
  font-weight: bold;
  color: gray !important;
}

.tamanho {
  font-size: 18px;
}
</style>
