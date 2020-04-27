<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong><i class="fa fa-edit"></i> Pessoas cadastradas</strong> <small>Formulário de edição</small>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Nome:</label>
            <input type="text" class="form-control" placeholder="Digite o nome" v-model="form.nome" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">CPF:</label>
            <input type="text" class="form-control" placeholder="Digite o CPF" v-model="form.cpf" />
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button href="/tutor/dados-cadastrais/" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "~/axios";
export default {
  layout: "menu/tutor",
  data() {
    return {
      form: {
        idPessoa: this.$route.query.idPessoa,
        nome: this.$route.query.nome,
        cpf: this.$route.query.cpf,
        tipo_usuario: this.$route.query.tipo_usuario
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
        .post("pessoas/" + this.$route.params.tipo_usuario + "/" + this.$route.params.idPessoa, this.form)
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
    }
  }
};
</script>