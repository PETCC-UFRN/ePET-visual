<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Codigo</label>
            <input type="text" class="form-control" v-model="form.codigo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Nome</label>
            <input type="text" class="form-control" v-model="form.nome" />
          </div>
          <div class="form-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "~/axios";

export default {
  layout: "menu/petiano",
  data() {
    return {
      form: {
        codigo: "",
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
      axios
        .post("disciplinas", this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Disciplina cadastrada com sucesso";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Disciplina NÃO cadastrada. Tente novamente";
        });
      e.preventDefault();
    }
  }
};
</script>