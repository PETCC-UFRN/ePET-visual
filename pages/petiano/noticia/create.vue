<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <strong>
          <i class="fa fa-edit"></i> Notícia
        </strong>
        <small>Formulário de criação</small>
        <div class="card-actions">
          <a href="/petiano/noticia/" class="btn btn-close">
            <i class="icon-close"></i>
          </a>
        </div>
      </div>
      <div class="card-body">
        <b-form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Título:</label>
            <input
              type="text"
              placeholder="Digite o título"
              class="form-control"
              v-model="form.titulo"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Descrição:</label>
            <b-form-textarea
              id="textarea"
              v-model="form.corpo"
              placeholder="Digite a descrição"
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </div>

          <div class="form-group">
            <label>Inicio exibição:</label>
            <b-form-datepicker
              v-model="form.inicio_exibicao"
              :min="minDate"
              class="mb-2"
              locale="pt-br"
              placeholder="Escolha uma data"
              required
            ></b-form-datepicker>
          </div>
          <div class="form-group">
            <label>Fim exibição:</label>
            <b-form-datepicker
              v-model="form.limite_exibicao"
              :min="minDate"
              class="mb-2"
              locale="pt-br"
              placeholder="Escolha uma data"
              required
            ></b-form-datepicker>
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
import axios from "~/axios";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/petiano",
  data() {
    return {
      form: {
        titulo: "",
        corpo: "",
        inicio_exibicao: "",
        limite_exibicao: "",
        ativo: false,
        foto: ""
      },
      minDate: null
    };
  },
  mounted() {
    this.minDate = moment().format("YYYY-MM-DD");
  },
  methods: {
    async submitForm() {
      if (this.checkForm()) {
        let idPetiano = 1;
        await axios
          .get("petianos-pessoa/" + this.$store.state.profile.idPessoa)
          .then(res => {
            idPetiano = res.data.idPetiano;
          });

        await axios
          .post("noticia-cadastro/" + idPetiano, this.form)
          .then(res => {
            Swal.fire({
              title: "Notícia cadastrada com sucesso",
              icon: "success"
            });
            this.clearForm();
          })
          .catch(err => {
            Swal.fire({
              title: err.response.data.titulo,
              icon: "error"
            });
          });
      } else {
        Swal.fire({
          title: "Edição não realizada",
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
      if (!this.form.titulo) {
        this.errors.push("O campo título é obrigatório.");
      }

      if (!this.form.corpo) {
        this.errors.push("O campo descrição é obrigatório.");
      }

      if (!this.form.inicio_exibicao) {
        this.errors.push("O campo início exibição é obrigatório.");
      }

      if (!this.form.limite_exibicao) {
        this.errors.push("O campo fim exibição é obrigatório.");
      }

      if (
        moment(this.form.inicio_exibicao).isAfter(
          this.form.limite_exibicao,
          "day"
        )
      ) {
        this.errors.push(
          "O campo inicio exibição ter valor anterior ao campo limite exibição."
        );
      }

      if (this.errors.length === 0) {
        return true;
      }

      return false;
    }
  }
};
</script>
