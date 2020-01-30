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
            <label for="exampleFormControlInput1">Título:</label>
            <input type="text" placeholder="Digite o título"  class="form-control" v-model="form.titulo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Descrição:</label>
            <input type="text"  placeholder="Digite a descrição"  class="form-control" v-model="form.corpo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Inicio exibição:</label>
            <input type="date" class="form-control" v-model="form.inicio_exibicao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Fim exibição:</label>
            <input type="date" class="form-control" v-model="form.fim_exibicao" />
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary">Enviar</b-button>
            <b-button type="reset" variant="danger">Limpar campos</b-button>
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
    },
     onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.titulo = ""
        this.form.corpo = ""
        this.form.inicio_exibicao = ""
        this.form.fim_exibicao = "",
        this.form.ativo= false
      }
  }
};
</script>