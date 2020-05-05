<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <strong>
          <i class="fa fa-edit"></i> Notícia
        </strong>
        <small>Formulário de edição</small>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Título:</label>
            <input
              type="text"
              placeholder="Digite o título"
              class="form-control"
              v-model="form.titulo"
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
            ></b-form-textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Inicio exibição:</label>
            <b-form-datepicker
              v-model="form.inicio_exibicao"
              :min="minDate"
              class="mb-2"
              locale="pt-br"
              placeholder="Escolha uma data"
            ></b-form-datepicker>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Fim exibição:</label>
            <b-form-datepicker
              v-model="form.limite_exibicao"
              :min="form.inicio_exibicao"
              class="mb-2"
              locale="pt-br"
              placeholder="Escolha uma data"
            ></b-form-datepicker>
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary">
              <i class="fa fa-dot-circle-o"></i> Salvar modificações
            </b-button>
            <b-button href="/petiano/noticia/" variant="danger">
              <i class="fa fa-ban"></i> Cancelar
            </b-button>
          </div>
        </form>
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
  validate({ params }) {
    // Id da rota deve ser um número
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      form: {
        titulo: "",
        corpo: "",
        inicio_exibicao: null,
        limite_exibicao: null,
        ativo: false,
      },
      errors: [],
      minDate: null,
    };
  },
  mounted() {
    this.minDate = moment().format('YYYY-MM-DD');

    axios
      .get("noticia/" + this.$route.params.id)
      .then(res => {
        this.form = res.data;
      })
      .catch(err => {
        Swal.fire({
          title: err.response.data.titulo,
          icon: "error"
        });
      });
  },
  methods: {
    async submitForm() {
      if (this.checkForm()) {
        let idPetiano = 1;
        await axios.get('petianos-pessoa/' + this.$store.state.profile.idPessoa).then(res => {
          idPetiano = res.data.idPetiano;
        });

        await axios
          .post("noticia-cadastro/" + idPetiano, this.form)
          .then(res => {
            Swal.fire({
              title: "Edição realizada",
              icon: "success"
            });
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