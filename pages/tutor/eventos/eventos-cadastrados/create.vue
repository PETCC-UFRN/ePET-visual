<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong><i class="fa fa-edit"></i> Evento</strong> <small>Formulário de criação</small>
        <div class="card-actions">
          <a href="/petiano/eventos/" class="btn btn-close"><i class="icon-close"></i></a>
        </div>
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
  methods: {
    submitForm(e) {
      axios
        .post("eventos-cadastrar", this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Evento cadastrado com sucesso";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          this.$router.push({ path : '/petiano/eventos/' });
          
          });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Erro no cadastramento do evento. Por favor, tente novamente";
        });
      e.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.titulo = ""
      this.form.descricao = ""
      this.form.local = ""
      this.form.qtdCargaHoraria = 0
      this.form.qtdDias = 0
      this.form.qtdVagas = 0
      this.form.valor = 0
      this.form.d_inscricao = "mm/dd/yyyy"
      this.form.d_inscricao_fim = "mm/dd/yyyy"
      this.form.ativo= false
    }
  }
};
</script>
