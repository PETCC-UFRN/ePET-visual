<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3><i class="fa fa-edit"></i> Editando evento</h3>
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
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button @click.prevent="goToEventosCadastrados()" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
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
    goToEventosCadastrados() {
      this.$router.push('/tutor/eventos/eventos-cadastrados');
    },
    submitForm(e) {
      axios
        .post("eventos-cadastrar", this.form)
        .then(res => {
          Swal.fire({
            title: 'Evento atualizado',
            icon: 'success',
          })
          .then( () => {
            this.$router.push('/tutor/eventos/eventos-cadastrados');
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Erro na edição',
            icon: 'warning',
            text: err.response.status
          })
          .then( () => {
            this.$router.push('/tutor/eventos/eventos-cadastrados');
          });
        });
    }
  }
};
</script>
