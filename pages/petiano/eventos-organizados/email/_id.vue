<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Enviar email para os participantes de {{evento.titulo}}</h2>
          </b-col>
          <b-col md="auto">
            <div class="card-actions">
              <nuxt-link to="/petiano/eventos-organizados/" class="btn btn-close btn-lg">
                <i class="icon-close"></i>
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <b-form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="assunto"><strong>Assunto</strong></label>
            <input
              id="assunto"
              type="text"
              placeholder="Digite o assunto"
              class="form-control"
              v-model="form.assunto"
              required
            />
          </div>
          <div class="form-group">
            <label for="corpo"><strong>Corpo</strong></label>
            <b-form-textarea
              id="corpo"
              v-model="form.corpo"
              placeholder="Digite o corpo"
              rows="10"
              max-rows="10"
              required
            ></b-form-textarea>
          </div>
            
          <div class="form-group">
            <b-button type="submit" variant="primary">
              <i class="fa fa-dot-circle-o"></i> Enviar
            </b-button>
            <b-button type="reset" variant="danger" @click="clearForm">
              <i class="fa fa-ban"></i> Limpar campos
            </b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>

import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/petiano",
  data() {
    return {
      evento: {},
      form: {
        assunto: "",
        corpo: ""
      }
    };
  },
  mounted() {
    this.$axios
      .get(`eventos/${this.$route.params.id}`)
      .then((res) => {
      
        this.evento = res.data;

      })
      .catch(err => {
        if (err.response.status === 404) {}
        else if (err.response.status === 403) {
          Swal.fire({
            title: "Houve um problema...",
            text: "Verifique se possui a permissão necessária ou se a sessão foi expirada. "
            + "Caso a sessão tenha sido expirado, tente novamente.",
            icon: "error"
          })
          .then( () => this.$route.push('/login'));
        } 
        else {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: "error"
          })
        }
        this.isLoading = false
      });
  },
  computed: {
  },
  methods: {
    submitForm() {
      if (this.checkForm()) {
        this.$axios
          .post("participantes-email/"+ this.evento.idEvento, this.form)
          .then(res => {
            Swal.fire({
              title: "Email enviado",
              icon: "success"
            })
            .then( () =>{
              this.$router.push('/petiano/eventos-organizados');
            });
          })
          .catch(err => {
            Swal.fire({
              title: "Email não enviado",
              icon: "error"
            })
            .then( () => {
              this.$router.push('/petiano/eventos-organizados');
            });
          });
      } else {
        Swal.fire({
          title: "Campo(s) inválido(s)",
          icon: "error",
          html: `<ul>${this.errors.map(err => `<li>${err}</li>`)}</ul>`
            .replace('","', "")
            .replace(",", "")
        });
      }
    },
    clearForm() {
      this.form = Object.entries(this.form).map(item => {
        return (item = "");
      });
    },
    checkForm() {
      this.errors = [];
      if (!this.form.assunto) {
        this.errors.push("O campo assunto é obrigatório.");
      }
      if (!this.form.corpo) {
        this.errors.push("O campo corpo é obrigatório.");
      }
      if (this.errors.length === 0) {
        return true;
      }

      return false;
    }
  }
};
</script>


<style scoped>
h2 {
  font-weight: 300;
}

strong {
  color: gray;
  font-size: 16px;
}

</style>