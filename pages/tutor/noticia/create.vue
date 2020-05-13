<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Cadastrar notícia</h2>
          </b-col>
          <b-col>
            <div class="card-actions">
              <nuxt-link  to="/tutor/noticia/" class="btn btn-close btn-lg">
                <i class="icon-close"></i>
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <b-form @submit.prevent="submitForm">
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
  layout: "menu/tutor",
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
  computed: {
    disabledDataExibicao() {
      return this.form.inicio_exibicao === ''; 
    }
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
              title: "Notícia cadastrada",
              icon: "success"
            })
            .then( () =>{
              this.$router.push('/tutor/noticia');
            });
          })
          .catch(err => {
            Swal.fire({
              title: "Notícia não cadastradas",
              icon: "error"
            })
            .then( () => {
              this.$router.push('/tutor/noticia');
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