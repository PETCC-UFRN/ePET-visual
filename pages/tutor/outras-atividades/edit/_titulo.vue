<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2>
              <i class="fa fa-edit"></i> Editando atividade
            </h2>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="titulo">
              <strong>Título</strong>
            </label>
            <input
              id="titulo"
              type="text"
              placeholder="Digite o título"
              class="form-control"
              v-model="form.titulo"
              required
            />
          </div>
          <div class="form-group">
            <label for="descricao">
              <strong>Descrição</strong>
            </label>
            <b-form-textarea
              id="descricao"
              v-model="form.conteudo"
              placeholder="Digite a descrição"
              rows="10"
              max-rows="10"
              required
            ></b-form-textarea>
          </div>
          <input
              id="idAtividade"
              type="hidden"
              v-model="form.idAtividade"
            />
          <div class="form-group">
            <b-button type="submit" variant="primary">
              <i class="fa fa-dot-circle-o"></i> Salvar
            </b-button>
            <b-button to="/tutor/outras-atividades/" variant="danger">
              <i class="fa fa-ban"></i> Cancelar
            </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/tutor",
  data() {
    return {
      selected: [],
      progressValue: 0,
      form: {
        titulo: "",
        conteudo: "",
        idAtividade: "",
        ativo: false
      },
      errors: [],
    };
  },
  mounted() {

    this.$axios
      .get("atividades/" + this.$route.params.titulo)
      .then(res => {
        this.form = res.data;
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);
      })
      .catch(err => {
        Swal.fire({
          title: "Houve um problema...",
          text:
            "Por favor, tente recarregar a página. Caso não dê certo," +
            " tente novamente mais tarde.",
          icon: "error"
        });
      });
  },
  computed: {
  },
  methods: {
    submitForm() {
      if (this.checkForm()) {
        this.$axios
          .post("atividades-cadastrar/", this.form)
          .then(res => {
            Swal.fire({
              title: "Atividade editada",
              icon: "success"
            }).then(() => {
              this.$router.push("/tutor/outras-atividades");
            });
          })
          .catch(err => {
            Swal.fire({
              title: "Atividade não editada",
              icon: "error"
            }).then(() => {
              this.$router.push("/tutor/outras-atividades");
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
    checkForm() {
      this.errors = [];

      if (!this.form.titulo) {
        this.errors.push("O campo título é obrigatório.");
      }
      if (!this.form.conteudo) {
        this.errors.push("O campo conteúdo é obrigatório.");
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
h2, h3 {
  font-weight: 300;
}

strong {
  color: gray;
  font-size: 16px;
}
</style>