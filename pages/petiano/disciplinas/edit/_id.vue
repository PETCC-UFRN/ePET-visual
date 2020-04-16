<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong><i class="fa fa-edit"></i> Disciplina</strong> <small>Formulário de edição</small>
      </div>
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Código:</label>
            <the-mask :mask="['AAA####']" class="form-control" placeholder="Digite o código" v-model="form.codigo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Nome:</label>
            <input type="text" class="form-control" placeholder="Digite o nome" v-model="form.nome" />
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button href="/petiano/disciplina/" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "~/axios";

import {TheMask} from 'vue-the-mask';

export default {
  layout: "menu/petiano",
    components: {TheMask},

  data() {
    return {
      form: {
        idDisciplina: this.$route.query.id,
        codigo: this.$route.query.codigo,
        nome: this.$route.query.nome
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  methods: {
    submitForm(e) {
      axios
        .post("disciplinas", this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Disciplina editada com sucesso";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
          this.$router.push(
            {
              path: '../',
            }
          )
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Disciplina não editada. Tente novamente.";
        });
      e.preventDefault();
      console.log("AAAA");
    }
  }
};
</script>