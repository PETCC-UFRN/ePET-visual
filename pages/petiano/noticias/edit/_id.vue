<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Editando notícia</h2>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="titulo"><strong>Título</strong></label>
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
            <label for="descricao"><strong>Descrição</strong></label>
            <b-form-textarea
              id="descricao"
              v-model="form.corpo"
              placeholder="Digite a descrição"
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </div>
          <b-form-group>
            <label for="anexo"><strong>Anexo</strong></label>
            <b-form-file placeholder="Nenhum arquivo" browse-text="Fazer upload" id="anexo"></b-form-file>
          </b-form-group>
          <b-row>
            <b-col>
              <div class="form-group">
                <label for="inicioExibicao"><strong>Início de exibição</strong></label>
                <b-form-datepicker
                  id="inicioExibicao"
                  v-model="form.inicio_exibicao"
                  :min="minDate"
                  class="mb-2"
                  locale="pt-br"
                  placeholder="Escolha uma data"
                  required
                ></b-form-datepicker>
              </div>
            </b-col>
            <b-col>
              <div class="form-group">
                <label><strong>Fim de exibição</strong></label>
                <b-form-datepicker
                  :disabled="disabledDataExibicao"
                  v-model="form.limite_exibicao"
                  :min="form.inicio_exibicao"
                  class="mb-2"
                  locale="pt-br"
                  placeholder="Escolha uma data"
                  required
                ></b-form-datepicker>
              </div>
            </b-col>
          </b-row>   
          
          <div class="form-group">
            <b-button type="submit" variant="primary">
              <i class="fa fa-dot-circle-o"></i> Salvar modificações
            </b-button>
            <b-button href="/petiano/noticias/" variant="danger">
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

   this.$axios.get("noticia/" + this.$route.params.id)
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
  computed: {
    disabledDataExibicao() {
      return this.form.inicio_exibicao === ''; 
    }
  },
  methods: {
    async submitForm() {
      if (this.checkForm()) {
        let idPetiano = 1;
        await this.$axios.get('petianos-pessoa/' + this.$store.state.profile.idPessoa).then(res => {
          idPetiano = res.data.idPetiano;
        });

        await this.$axios
          .post("noticia-cadastro/" + idPetiano, this.form)
          .then(res => {
            Swal.fire({
              title: "Notícia editada",
              icon: "success"
            })
            .then( () =>{
              this.$router.push('/petiano/noticias');
            });
          })
          .catch(err => {
            Swal.fire({
              title: 'Notícia não editada',
              icon: "error"
            })
            .then( () =>{
              this.$router.push('/petiano/noticias');
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

      if (!this.form.inicio_exibicao) {
        this.errors.push("O campo início exibição é obrigatório.");
      }

      if (!this.form.limite_exibicao) {
        this.errors.push("O campo fim exibição é obrigatório.");
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