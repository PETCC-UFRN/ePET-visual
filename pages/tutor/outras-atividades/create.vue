<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Cadastrar atividade</h2>
          </b-col>
          <b-col>
            <div class="card-actions">
              <nuxt-link to="/tutor/outras-atividades/" class="btn btn-close btn-lg">
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
              v-model="form.conteudo"
              placeholder="Digite a descrição"
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
  layout: "menu/tutor",
  data() {
    return {
      form: {
        progressValue: 0,
        titulo: "",
        conteudo: "",
        ativo: false,
      }
    };
  },
  mounted() {
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
              title: "Atividade cadastrada",
              icon: "success"
            })
            .then( () =>{
              this.$router.push('/tutor/outras-atividades');
            });
          })
          .catch(err => {
            Swal.fire({
              title: "Atividade não cadastrada",
              icon: "error"
            })
            .then( () => {
              this.$router.push('/tutor/outras-atividades');
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
h2 {
  font-weight: 300;
}

strong {
  color: gray;
  font-size: 16px;
}

</style>