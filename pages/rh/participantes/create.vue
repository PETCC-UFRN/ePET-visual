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
            <label for="exampleFormControlInput1">pessoa</label>
            <input type="number" class="form-control" v-model="form.pessoa" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">evento</label>
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
        .post("participantes-cadastrar/" + this.form.evento + "/" + this.form.pessoa)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Participante cadastrado com sucesso";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Participante NÃO cadastrado. Tente novamente";
        });
      e.preventDefault();
    }
  }
};
</script>