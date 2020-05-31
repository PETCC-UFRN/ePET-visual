<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Cadastrar evento</h2>
          </b-col>
          <b-col>
            <div class="card-actions">
              <nuxt-link  to="/tutor/eventos-abertos" class="btn btn-close btn-lg">
                <i class="icon-close"></i>
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="titulo"><strong>Título</strong></label>
            <input 
              id="titulo"
              type="text" 
              class="form-control" 
              required 
              placeholder="Digite o título"
              v-model="form.titulo" />
          </div>
          <div class="form-group">
            <label for="descricao"><strong>Descrição</strong></label>
            <b-form-textarea
              required id="descricao"
              v-model="form.descricao" 
              placeholder="Digite a descrição"
              rows="3" 
              max-rows="10"
            ></b-form-textarea>
          </div>
          <div class="form-group">
            <label for="local"><strong>Local</strong></label>
            <input 
              required 
              id="local" 
              type="text" 
              class="form-control" 
              placeholder="Digite o local" 
              v-model="form.local" />
          </div>
          <div>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="inicioInscricoes"><strong>Início de inscrições</strong></label>
                  <b-form-datepicker
                    id="inicioInscricoes" 
                    v-model="form.d_inscricao"
                    class="mb-2" 
                    :min="minDate"
                    locale="pt-br" 
                    placeholder="Escolha uma data"
                    required
                  ></b-form-datepicker>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="fimInscricoes"><strong>Fim de inscrições</strong></label>
                  <b-form-datepicker
                    id="fimInscricoes"
                    v-model="form.d_inscricao_fim" 
                    :min="form.d_inscricao"
                    class="mb-2" 
                    locale="pt-br" 
                    placeholder="Escolha uma data"
                    required 
                    :disabled="disabledDataInscricao"
                  ></b-form-datepicker>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="inicioRolagem"><strong>Início da rolagem</strong></label>
                  <b-form-datepicker
                    id="inicioRolagem" 
                    v-model="form.inicio_rolagem"
                    class="mb-2" 
                    :min="form.d_inscricao_fim"
                    :disabled="disabledDataRolagemInicio"
                    locale="pt-br" 
                    placeholder="Escolha uma data" required
                  ></b-form-datepicker>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="fimRolagem"><strong>Fim da rolagem</strong></label>
                  <b-form-datepicker
                    :disabled="disabledDataRolagem"
                    id="fimRolagem" 
                    v-model="form.fim_rolagem"
                    :min="form.inicio_rolagem" 
                    class="mb-2" 
                    locale="pt-br"
                    placeholder="Escolha uma data"  required
                  ></b-form-datepicker>
                </div>
              </b-col>
            </b-row>           
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="inicioEvento"><strong>Início do evento</strong></label>
                  <b-form-datepicker
                    id="inicioEvento" 
                    v-model="form.d_evento_inicio"
                    :min="form.fim_rolagem" 
                    class="mb-2"
                    locale="pt-br" 
                    placeholder="Escolha uma data"
                    :disabled="disabledDataEventoInicio"
                    required
                  ></b-form-datepicker>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="fimEvento"><strong>Fim do evento</strong></label>
                  <b-form-datepicker
                    id="fimEvento" 
                    v-model="form.d_evento_fim"
                    :min="form.d_evento_inicio" 
                    class="mb-2"
                    locale="pt-br" 
                    placeholder="Escolha uma data"
                    :disabled="disabledDataEvento"
                    required
                  ></b-form-datepicker>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="cargaHoraria"><strong>Carga horária</strong> <em>(em horas)</em></label>
                  <input 
                    id="cargaHoraria" 
                    placeholder="0" 
                    type="number" 
                    class="form-control"  
                    v-model="form.qtdCargaHoraria" required/>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="qtdDias"><strong>Quantidade de dias</strong></label>
                  <input 
                    id="qtdDias" 
                    type="number" 
                    placeholder="0" 
                    min="0" 
                    pattern="\d+" 
                    class="form-control" 
                    v-model="form.qtdDias" required/>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="qtdVagas"><strong>Quantidade de vagas</strong></label>
                  <input 
                    id="qtdVagas" placeholder="0" 
                    type="number" min="0" 
                    pattern="\d+" class="form-control" 
                    v-model="form.qtdVagas" required/>
                </div>
              </b-col>
              <b-col>
                <div class="form-group">
                  <label for="valorInscricoes"><strong>Valor da inscrição</strong> <em>(em reais)</em></label>
                  <input 
                    id="valorInscricoes" 
                    placeholder="0" 
                    type="number" 
                    min="0" 
                    pattern="\d+" 
                    class="form-control" 
                    v-model="form.valor" required/>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="diasCompensacao"><strong>Dias de compensação</strong></label>
                  <input 
                    id="diasCompensacao" type="number" 
                    min="0" pattern="\d+" 
                    placeholder="0" class="form-control" 
                    v-model="form.dias_compensacao" required/>
                </div>
              </b-col>
              <b-col>
                <label for="anexoParticipantes"><strong>Anexos pelos participantes</strong></label>
                <div class="form-group">
                  <b-form-checkbox
                    id="anexoParticipantes"
                    v-model="form.participante_anexos"
                  > Sim, será necessário. 
                  </b-form-checkbox>
                </div>
              </b-col>
            </b-row>
          </div>          
          <div class="form-group">
            <label for="textoDeclaracao"><strong>Texto de declaração</strong></label>
            <b-form-textarea
              id="textoDeclaracao" v-model="form.textoDeclaracaoEvento"
              placeholder="Digite o texto de declaração do evento"
              rows="3"  max-rows="6" 
            ></b-form-textarea>
          </div>
          <div class="form-group">
            <b-form-checkbox
              v-model="form.ativo"
            > Eu quero ativar o evento durante a criação. 
            </b-form-checkbox>
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

import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/petiano",
  data() {
    return {
      form: {
        d_evento_fim: "",
        d_evento_inicio: "",
        d_inscricao: "",
        d_inscricao_fim: "",
        descricao: "",
        dias_compensacao: "",
        fim_rolagem: "",
        inicio_rolagem: "",
        local: "",
        participante_anexos: false,
        percentual: 0,
        qtdCargaHoraria: "",
        qtdDias: "",
        qtdVagas: "",
        textoDeclaracaoEvento: "",
        titulo: "",
        valor: "",
        ativo: false
      },
      minDate: null
    };
  },
  mounted() {
    this.minDate = moment().format("YYYY-MM-DD");
  },
  computed: {
    disabledDataRolagemInicio() {
      return this.form.d_inscricao_fim === ''
    },
    disabledDataEventoInicio(){
      return this.form.fim_rolagem === ''; 
    },
    disabledDataRolagem() {
      return this.form.inicio_rolagem === ''; 
    },
    disabledDataInscricao(){
      return this.form.d_inscricao === ''; 
    },
    disabledDataEvento(){
      return this.form.d_evento_inicio === ''; 
    }
  },
  methods: {
    submitForm(e) {
      this.$axios.post("eventos-cadastrar", this.form)
        .then(res => {
          Swal.fire({
            title: 'Evento cadastrado',
            icon: 'success',
          })
          .then( () => {
            this.$router.push('/tutor/eventos-abertos');
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Evento não cadastrado',
            icon: 'error'
          })
          .then( () => {
            this.$router.push('/tutor/eventos-abertos');
          });
        });
    },
    onReset(evt) {
      evt.preventDefault()      
      this.d_evento_fim = ""
      this.d_evento_inicio = ""
      this.d_inscricao = ""
      this.d_inscricao_fim = ""
      this.descricao = ""
      this.dias_compensacao = ""
      this.fim_rolagem = ""
      this.inicio_rolagem = ""
      this.local = ""
      this.participante_anexos = false
      this.qtdCargaHoraria = ""
      this.qtdDias = ""
      this.qtdVagas = ""
      this.textoDeclaracaoEvento = ""
      this.titulo = ""
      this.valor = ""
      this.ativo = false
    }
  }
};
</script>

<style scoped>
h2 {
  font-weight: 300;
}

strong {
  color: gray;
}

em {
  color: gray;
  font-weight: 500;
}
</style>