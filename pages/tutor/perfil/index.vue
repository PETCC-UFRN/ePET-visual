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
        <b-avatar class="mb-3"  size="8em">
           <template v-slot:badge><i class="fa fa-edit"></i></template>
        </b-avatar>

        <b-form-group for="nome" label="Nome completo">
          <b-form-input id="nome" v-model="form.pessoa.nome" required></b-form-input>
          <b-form-text
            id="password-help-block"
          >Este nome estará presente nos certificados e declarações providos pelo sistema.</b-form-text>
        </b-form-group>
        
        <b-form-group label="Email">
          <b-form-input :value="form.pessoa.usuario.email" type="email" required disabled></b-form-input>
        </b-form-group>

        <b-form-group label="Área de interesse">
          <b-form-input v-model="form.area_interesse"></b-form-input>
        </b-form-group>

        <b-form-group label="Lattes">
          <b-form-input v-model="form.lattes" type="url"></b-form-input>
        </b-form-group>

        <b-form-group label="Site pessoal">
          <b-form-input v-model="form.site_pessoal" type="url"></b-form-input>
        </b-form-group>

        <b-button class="float-left  w-25" type="submit" variant="primary">Atualizar</b-button>
        <b-button class="float-right w-25" type="reset" variant="danger">Resetar</b-button>
      </b-form>
    </div>
    
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
      isLoading: true,
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
        .get(`/petianos-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.form = res.data;
          this.isLoading = false;
        })
        .catch(err => {
          Swal.fire({
            title: "Falha em consumir API",
            icon: "error"
          }).then(() => {
            let vm = this;
            setTimeout(function() {
              location.reload();
            }, 1500);
          });
        });
    },

    onSubmit() {
      this.$axios
        .post("pessoas-atualizar/", {
          ...this.$store.state.profile,
          nome: this.form.pessoa.nome
        })
        .catch(err => {
          this.submitAlert(true);
          console.log(err);
        });

      this.$axios
        .put(`petianos-editar/${this.$store.state.profile.idPessoa}`, this.form)
        .catch(err => {
          this.submitAlert(true);
          console.log(err);
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