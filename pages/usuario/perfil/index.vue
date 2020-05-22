<template>
  <b-card>
    <template v-slot:header>
      <b-row>
        <b-col>
          <h2>
            <i class="fa fa-user px-2"></i> Perfil
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

        <b-form-group for="nomeCompleto" label="Nome completo">
          <b-form-input id="nomeCompleto" v-model="form.nome" required></b-form-input>
          <b-form-text
            id="password-help-block"
          >Este nome estará presente nos certificados e declarações providos pelo sistema.</b-form-text>
        </b-form-group>

        <b-form-group label="Email">
          <b-form-input :value="form.usuario.email" type="email" disabled></b-form-input>
        </b-form-group>

        <b-button class="float-left w-25 mt-2" type="submit" @click="submitAlert" variant="primary"> Atualizar</b-button>
        <b-button class="float-right w-25 mt-2" type="reset" variant="danger">Resetar</b-button>
      </b-form>
    </div>
  </b-card>
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
        this.form = res.data;
        this.isLoading = false;
      })
      .catch(err => {
          Swal.fire({
            title: "Falha em consumir API",
            icon: "error"
          })
        });
    },

    onSubmit() {
      this.$axios.post("pessoas-atualizar/", {
          ...this.$store.state.profile,
          nome: this.form.nome
        })
        .then(res => {})
        .catch(err => {
          this.submitAlert(true);
        });
      this.submitAlert(false);
    },

    submitAlert(withError) {
      let icon_ = "success";
      let title_ = "Perfil atualizado";
      let text_ = "";

      if (withError) {
        icon_ = "error";
        title_ = "Perfil não atualizado";
        text_ = "Por favor, tente novamente.";
      }

      if (!(this.form.pessoa.nome == "")) {
        Swal.fire({
          icon: icon_,
          title: title_,
          text: text_,
        });
      }
    }
  }
};
</script>

<style scoped>
h2,
h4 {
  font-weight: 300;
}
</style>