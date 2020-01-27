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
            <label for="exampleFormControlInput1">Titulo</label>
            <input type="text" class="form-control" v-model="form.titulo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Descrição</label>
            <input type="text" class="form-control" v-model="form.corpo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Inicio exibição</label>
            <input type="date" class="form-control" v-model="form.inicio_exibicao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Fim exibição</label>
            <input type="date" class="form-control" v-model="form.fim_exibicao" />
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
import {user} from "~/user";

export default {
  layout: "menu/petiano",
  data() {
    return {
      form: {
        titulo: "",
        corpo: "",
        inicio_exibicao: "",
        fim_exibicao: "",
        ativo: false
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  mounted(){
      console.log(user);
  },
  methods: {
    submitForm(e) {
      axios
        .post("noticia-cadastro/" + user.idPessoa, this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Notícia cadastrada com sucesso";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Notícia NÃO cadastrado. Tente novamente";
        });
      e.preventDefault();
    }
  }
};
</script>