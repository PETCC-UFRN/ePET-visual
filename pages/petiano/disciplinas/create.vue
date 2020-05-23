<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong><i class="fa fa-edit"></i> Disciplina</strong> <small>Formulário de criação</small>
        <div class="card-actions">
          <nuxt-link to="/petiano/disciplina/" class="btn btn-close"><i class="icon-close"></i></nuxt-link>
        </div>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Código:</label>
            <the-mask :mask="['AAA####']" class="form-control" placeholder="Digite o código" v-model="form.codigo" />
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

import {TheMask} from 'vue-the-mask';

export default {
  layout: "menu/petiano",
  components: {TheMask},
  
  data() {
    return {
      form: {
        // ativo: true,
        codigo: "",
        // idDisciplina: 0,
        nome: ""
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.$axios.post("disciplinas", this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Disciplina cadastrada com sucesso";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
          this.$router.push({ path : '/petiano/disciplina/' });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Disciplina NÃO cadastrada. Tente novamente";
        });
      
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.nome = ""
      this.form.codigo = ""
    }
  }
};
</script>