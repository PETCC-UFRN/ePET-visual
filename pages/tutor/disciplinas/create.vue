<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <strong><i class="fa fa-edit"></i> Disciplina</strong> <small>Formulário de criação</small>
        <div class="card-actions">
          <nuxt-link to="/tutor/disciplinas/" class="btn btn-close"><i class="icon-close"></i></nuxt-link>
        </div>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Código:</label>
            <the-mask :mask="['AAA####']" class="form-control" placeholder="Digite o código" v-model="form.codigo" />
            <b-form-text>Código no formato AAA#### (três letras e 4 números)</b-form-text>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Nome:</label>
            <input type="text" class="form-control" placeholder="Digite o nome" v-model="form.nome" />
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Enviar</b-button>
            <b-button type="reset" variant="danger"><i class="fa fa-ban"></i> Limpar campos</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "~/axios";
import {TheMask} from 'vue-the-mask';
import Swal from "sweetalert2";

export default {
  layout: "menu/tutor",
  components: {TheMask},
  
  data() {
    return {
      form: {
        codigo: "",
        nome: ""
      },
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      axios
        .post("disciplinas", this.form)
        .then(res => {
          this.reset();          
          Swal.fire({
            title: 'Disciplina cadastrada com sucesso',
            icon: 'success',
            timer: 2000
          }).then(() => {
            this.$router.push({ path : '/tutor/disciplinas/' });
          });
        })
        .catch(err => {
          Swal.fire({
            title: err.response.data.titulo,
            icon: 'error',
          });
        });
      
    },
    reset() {
      this.form.nome = ""
      this.form.codigo = ""
    },
  }
};
</script>