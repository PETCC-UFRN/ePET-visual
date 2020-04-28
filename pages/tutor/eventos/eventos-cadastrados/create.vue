<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3><i class="fa fa-edit"></i> Cadastrar evento</h3>
          </b-col>
          <b-col>
            <div class="card-actions">
              <b-button @click.prevent="goToEventosCadastrados()" class="btn btn-close btn-lg"><i class="icon-close"></i></b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Título:</strong></label>
            <input type="text" class="form-control" placeholder="Digite o título" v-model="form.titulo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Descrição:</strong></label>
            <b-form-textarea
            id="textarea"
            v-model="form.descricao"
            placeholder="Digite a descrição"
            rows="3"
            max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Local:</strong></label>
            <input type="text" class="form-control" placeholder="Digite o local" v-model="form.local" />
          </div>
          <div>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="exampleFormControlInput1"><strong>Carga horária:</strong> <em>(em horas)</em></label>
                  <input type="number" class="form-control"  v-model="form.qtdCargaHoraria" />
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="exampleFormControlInput1"><strong>Quantidade de dias:</strong></label>
                  <input type="number" min="0" pattern="\d+" class="form-control" v-model="form.qtdDias" />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="exampleFormControlInput1"><strong>Quantidade de vagas:</strong></label>
                  <input type="number" min="0" pattern="\d+" class="form-control" v-model="form.qtdVagas" />
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="exampleFormControlInput1"><strong>Valor da inscrição:</strong></label>
                  <input type="number" min="0" pattern="\d+" class="form-control" v-model="form.valor" />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="exampleFormControlInput1"><strong>Data de início de inscrições:</strong></label>
                  <input type="date" class="form-control" v-model="form.d_inscricao" />
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="exampleFormControlInput1"><strong>Data de fim de inscrições:</strong></label>
                  <input type="date" :min="form.d_inscricao" class="form-control" v-model="form.d_inscricao_fim" />
                </div>
              </b-col>
            </b-row>            
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
import Swal from "sweetalert2";

export default {
  layout: "menu/tutor",
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
    goToEventosCadastrados() {
      this.$router.push('/tutor/eventos/eventos-cadastrados');
    },
    submitForm(e) {
      axios
        .post("eventos-cadastrar", this.form)
        .then(res => {
          Swal.fire({
            title: 'Evento cadastrado',
            icon: 'success',
          })
          .then( () => {
            this.$router.push('/tutor/eventos/eventos-cadastrados');
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Erro no cadastro',
            icon: 'warning',
            text: err.response.status
          })
          .then( () => {
            this.$router.push('/tutor/eventos/eventos-cadastrados');
          });
        });
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
