<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong><i class="fa fa-edit"></i> Evento</strong> <small>Formulário de edição</small>
      </div>
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Título:</label>
            <input type="text" class="form-control" placeholder="Digite o título" v-model="form.titulo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Descrição:</label>
            <b-form-textarea
            id="textarea"
            v-model="form.descricao"
            placeholder="Digite a descrição"
            rows="3"
            max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Local:</label>
            <input type="text" class="form-control" placeholder="Digite o local" v-model="form.local" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Carga horária: (em horas)</label>
            <input type="number" class="form-control"  v-model="form.qtdCargaHoraria" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Quantidade de dias:</label>
            <input type="number" min="0" pattern="\d+" class="form-control" v-model="form.qtdDias" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Quantidade de vagas:</label>
            <input type="number" min="0" pattern="\d+" class="form-control" v-model="form.qtdVagas" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Valor da inscrição:</label>
            <input type="number" min="0" pattern="\d+" class="form-control" v-model="form.valor" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Data de início de inscrições:</label>
            <input type="date" class="form-control" v-model="form.d_inscricao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Data de fim de inscrições:</label>
            <input type="date" class="form-control" v-model="form.d_inscricao_fim" />
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button href="/tutor/eventos/" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
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
  validate ({ params }) {
    // Id da rota deve ser um número
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      form: {
        titulo: "",
        descricao: "",
        local: "",
        qtdCargaHoraria: 0,
        qtdDias: 0,
        qtdVagas: 0,
        valor: 0,
        d_inscricao_fim: "",
        d_inscricao: "",
        ativo: false
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  mounted(){
    axios.get('eventos/'+ this.$route.params.id).then((res) => {
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
