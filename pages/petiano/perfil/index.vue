<template>
  <b-card>
    <!-- @submit="onSubmit" @reset="onReset" v-if="show" -->
    <b-form @submit="onSubmit">
      <b-form-group label="Email">
        <b-form-input :value="form.pessoa.usuario.email" type="email" required disabled></b-form-input>
      </b-form-group>

      <b-form-group label="Nome">
        <b-form-input v-model="form.pessoa.nome" required></b-form-input>
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

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-card>
</template>

<script>
import axios from "~/axios";
import Cookies from "js-cookie";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      form: {
        pessoa: {
          nome: '',
          usuario: {
            email: '',
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
      axios
        .get("petianos-pessoa/" + this.$store.state.profile.idPessoa)
        .then(res => {
          this.form = res.data;
        });
    },
    onSubmit(){
      axios.post('petianos-editar/' + this.$store.state.profile.idPessoa, this.form).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>