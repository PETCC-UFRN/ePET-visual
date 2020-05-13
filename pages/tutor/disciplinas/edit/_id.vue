<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Editando disciplina</h2>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="codigo"><strong>Código:</strong></label>
            <the-mask :mask="['AAA####']" class="form-control" placeholder="Digite o código" v-model="form.codigo" required/>
          </div>
          <div class="form-group">
            <label for="nome"><strong>Nome:</strong></label>
            <input type="text" class="form-control" placeholder="Digite o nome" v-model="form.nome" required/>
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button href="/tutor/disciplinas/" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "~/axios";
import Swal from "sweetalert2";

import {TheMask} from 'vue-the-mask';

export default {
  layout: "menu/tutor",
  components: {TheMask},
  data() {
    return {
      form: {
        idDisciplina: this.$route.query.id,
        codigo: this.$route.query.codigo,
        nome: this.$route.query.nome,
        ativo: this.$route.query.ativo
      }
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      axios
        .post("disciplinas", this.form)
        .then(res => {
          Swal.fire({
            title: 'Disciplina editada',
            icon: 'success',
          })
          .then( () => {
            this.$router.push('../');
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Disciplina não editada',
            icon: 'error',
          });
        });
    }
  }
};
</script>

<style scoped>
h2 {
  font-weight: 300;
}
strong {
  font-size: 17px;
  color: gray;
}
</style>