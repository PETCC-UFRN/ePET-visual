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

        <b-form-group for="nomeCompleto" label="Nome completo" label-class="text-muted font-weight-bold pt-0">
          <b-form-input id="nomeCompleto" v-model="profile.nome" required></b-form-input>
          <b-form-text
            id="password-help-block"
          >Este nome estará presente nos certificados e declarações providos pelo sistema.</b-form-text>
        </b-form-group>

        <b-form-group  for="email" label="Email" label-class="text-muted font-weight-bold pt-0">
          <b-form-input id="email" :value="profile.usuario.email" type="email"></b-form-input>
        </b-form-group>

        <b-button class="float-left w-25 mt-2" type="submit" variant="primary"> Atualizar</b-button>
        <b-button class="float-right w-25 mt-2" type="reset" variant="danger">Limpar</b-button>
      </b-form>
    </div>
  </b-card>
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
        }
      }
    };
  },

  mounted() {
    this.getInfo();
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
</style>
