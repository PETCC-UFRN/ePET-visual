<template>
  <b-card>
    <!-- @submit="onSubmit" @reset="onReset" v-if="show" -->
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Email">
        <b-form-input :value="form.pessoa.usuario.email" type="email" required disabled></b-form-input>
      </b-form-group>

      <b-form-group label="Nome">
        <b-form-input v-model="form.pessoa.nome" required></b-form-input>
        <b-form-text
          id="password-help-block"
        >Este nome estará presente nos certificados e declarações providos pelo sistema.</b-form-text>
      </b-form-group>

      <b-form-group label="Area de interesse">
        <b-form-input v-model="form.area_interesse"></b-form-input>
      </b-form-group>

      <b-form-group label="Lattes">
        <b-form-input v-model="form.lattes" type="url"></b-form-input>
      </b-form-group>

      <b-form-group label="Site pessoal">
        <b-form-input v-model="form.site_pessoal" type="url"></b-form-input>
      </b-form-group>

      <b-button class="float-left" type="submit" variant="primary">Salvar</b-button>
      <b-button class="float-right" type="reset" variant="danger">Resetar</b-button>
    </b-form>
  </b-card>
</template>

<script>
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      form: {
        pessoa: {
          nome: "",
          usuario: {
            email: ""
          }
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
       this.$axios.get("/petianos-pessoa/" + this.$store.state.profile.idPessoa)
        .then(res => {
          this.form = res.data;
          console.log(res.data);
        });
    },

    onSubmit() {
      this.$axios
        .post("pessoas-atualizar/", {
          ...this.$store.state.profile,
          nome: this.form.pessoa.nome
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.submitAlert(true);
          console.log(err);
        });

      this.$axios
        .put("petianos-editar/" + this.$store.state.profile.idPessoa, this.form)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.submitAlert(true);
          console.log(err);
        });

      this.submitAlert(false);
    },

    submitAlert(withError) {
      let icon_ = "success";
      let title_ = "Salvo com sucesso";
      let text_ = "";

      if (withError) {
        icon_ = "error";
        title_ = "Erro ao salvar!";
        text_ = "Por favor, tente novamente.";
      }

      if (!(this.form.pessoa.nome == "")) {
        Swal.fire({
          icon: icon_,
          title: title_,
          text: text_,
          confirmButtonColor: "#4DBD74"
        });
      }
    }
  }
};
</script>