<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong>Notícia</strong> <small>Formulário de edição</small>
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
            <label for="exampleFormControlInput1">Inicio exibição:</label>
            <input type="date" class="form-control" v-model="form.inicio_exibicao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Fim exibição:</label>
            <input type="date" class="form-control" v-model="form.limite_exibicao" />
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button href="/petiano/noticia/" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
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
  validate ({ params }) {
    // Id da rota deve ser um número
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      form: {
        titulo: "",
        corpo: "",
        inicio_exibicao: "",
        limite_exibicao: "",
        ativo: false
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  mounted(){
    axios.get('noticia/'+ this.$route.params.id).then((res) => {
        this.form = res.data;
    });
  },
  methods: {
    submitForm(e) {
      axios
        .post("eventos-cadastrar", this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Evento editado com sucesso";
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Evento NÃO editado. Tente novamente";
        });
      e.preventDefault();
    }
  }
};
</script>