<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong>Organizadores</strong> <small>Formulário de criação</small>
      </div>
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">ID Pessoa:</label>
            <input type="number" class="form-control" v-model="form.pessoa" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">ID Evento:</label>
            <input type="number" class="form-control" v-model="form.evento" />
          </div>
          <!--<div class="form-group">
            <label for="exampleFormControlInput1">confirmado</label>
            <input type="bool" class="form-control" v-model="form.confirmado" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">espera</label>
            <input type="bool" class="form-control" v-model="form.espera" />
          </div>-->
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

export default {
  layout: "menu/petiano",
  data() {
    return {
      form: {
        pessoa: 0,
        evento: 0
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
        .post("organizadores-cadastrar/" + this.form.evento + "/" + this.form.pessoa)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Organizador cadastrado com sucesso.";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Organizador não cadastrado. Por favor, tente novamente";
        });
      e.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.pessoa = 0
      this.form.evento = 0
    }
  }
};
</script>