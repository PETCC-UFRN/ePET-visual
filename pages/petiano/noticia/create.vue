<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong><i class="fa fa-edit"></i> Notícia</strong> <small>Formulário de criação</small>
        <div class="card-actions">
          <a href="/petiano/noticia/" class="btn btn-close"><i class="icon-close"></i></a>
        </div>
      </div>
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Título:</label>
            <input type="text" placeholder="Digite o título"  class="form-control" v-model="form.titulo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Descrição:</label>
            <b-form-textarea
            id="textarea"
            v-model="form.corpo"
            placeholder="Digite a descrição"
            rows="3"
            max-rows="6"
            ></b-form-textarea>
          </div>

          <div class="form-group">
            <label >Imagem:</label>
            <b-form-file
              v-model="foto"
              placeholder="Faça upload da imagem..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </div>




          <div class="form-group">
            <label for="exampleFormControlInput1">Inicio exibição:</label>
            <input type="date" class="form-control" v-model="form.inicio_exibicao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Fim exibição:</label>
            <input type="date" class="form-control" v-model="form.limite_exibicao" />
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

export default {
  layout: "menu/petiano",
  data() {
    return {
      form: {
        titulo: "",
        corpo: "",
        inicio_exibicao: "",
        limite_exibicao: "",
        ativo: false,
        foto:""
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
        .post("noticia-cadastro/" + this.$store.state.auth.id, this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Notícia cadastrada com sucesso";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
          this.$router.push({ path : '/petiano/noticia/' });

        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Erro no cadastramento da notícia. Por favor, tente novamente.";
        });
      e.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault()

      this.form.titulo = ""
      this.form.corpo = ""
      this.form.inicio_exibicao = ""
      this.form.limite_exibicao = "",
      this.form.ativo= false
    }
  }
};
</script>
