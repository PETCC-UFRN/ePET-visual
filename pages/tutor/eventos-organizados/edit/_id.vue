<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Editando evento</h2>
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
          <b-form-group>
            <label for="imagem">
              <strong>Imagem de capa</strong>
            </label>
            <b-img v-if="imageData !== ''" center class="mt-2 mb-4" v-bind="mainProps" :src="`${imageData}`" fluid alt="Responsive image"></b-img>
            <b-img v-else center class="mt-2 mb-4" v-bind="mainProps" :src="`https://petcc.dimap.ufrn.br:8443/downloadfile/${foto}`" fluid alt="Responsive image"></b-img>


            <b-form-file
              v-model="file" accept=".jpg, .png, .gif" @change="previewImage"
              placeholder="Nenhuma imagem selecionada" browse-text="Selecionar imagem" id="anexo"></b-form-file>
            <b-form-text class="mb-1"> O tamanho máximo da imagem é de 10 megabytes. </b-form-text> 
          </b-form-group>
          <div class="form-group">
            <label for="descricao"><strong>Descrição</strong></label>
            <b-form-textarea
              required id="descricao"
              v-model="form.descricao" 
              placeholder="Digite a descrição"
              rows="10" 
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
                    :min="next_DataFimInscricoes(form.d_inscricao_fim)"
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
                <div class="form-group" 
                    v-if="form.fim_rolagem != ''">
                  <label for="inicioEvento"><strong>Datas das sessões</strong></label>
                  <v-date-picker
                    mode='multiple'
                    :min-date="next_DataRolagemFim(form.fim_rolagem)" 
                    v-model='form.periodo_evento'
                    :input-props='{
                      placeholder: "Selecione as datas",
                    }'
                  />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group">
                  <label for="qtdVagas"><strong>Quantidade de vagas</strong></label>
                  <input 
                    id="qtdVagas" 
                    placeholder="0" 
                    type="number" 
                    min="0" 
                    pattern="\d+" 
                    class="form-control" 
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
                    id="diasCompensacao" 
                    type="number" 
                    min="0" 
                    pattern="\d+" 
                    placeholder="0" 
                    class="form-control" 
                    v-model="form.dias_compensacao" 
                    required/>
                </div>
              </b-col>

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
            </b-row>
            <b-row>
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
            <label for="textoDeclaracao"><strong>Texto de declaração de participante</strong></label>
            <b-form-textarea
              id="textoDeclaracao" 
              v-model="form.textoDeclaracaoEvento"
              placeholder="Digite o texto de declaração de participante do evento"
              rows="6"  
              max-rows="6" 
            ></b-form-textarea>
          </div>          
          <div class="form-group">
            <label for="textoDeclaracao"><strong>Texto de declaração de organizador</strong></label>
            <b-form-textarea
              id="textoDeclaracao" 
              v-model="form.textoDeclaracaoEventoOrganizador"
              placeholder="Digite o texto de declaração de organizador do evento"
              rows="6"  
              max-rows="6" 
            ></b-form-textarea>
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar</b-button>
            <nuxt-link to="/tutor/eventos-organizados" class="btn btn-danger">
              <i class="fa fa-ban"></i> Cancelar
            </nuxt-link>
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
  layout: "menu/tutor",
  validate ({ params }) {
    // Id da rota deve ser um número
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
			mainProps: { width: 600, height: 600},
      selected: [],
      file:[],
      imageData: "",
      foto: "",
      form: {
        periodo_evento: [],
        d_inscricao: "",
        imagem: "",
        d_inscricao_fim: "",
        descricao: "",
        dias_compensacao: 0,
        fim_rolagem: "",
        inicio_rolagem: "",
        local: "",
        participante_anexos: false,
        percentual: 0,
        qtdCargaHoraria: "",
        qtdVagas: 0,
        textoDeclaracaoEvento: "",
        textoDeclaracaoEventoOrganizador: "",
        titulo: "",
        valor: 0,
        ativo: false
      },
      minDate: ""
    };
  },
  mounted(){
    this.minDate = moment().format("YYYY-MM-DD");
    
    this.$axios
      .get('eventos/'+ this.$route.params.id)
      .then((res) => {
        res.data.periodo_evento =  res.data.periodo_evento.map(diaEvento => new Date(`${diaEvento}T03:00:00.000Z`));

        this.form = res.data;
        this.foto = this.filterNameFile(res.data.imagem);
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);
      })
      .catch(err => {
        Swal.fire({
          title: 'Evento não atualizado',
          icon: 'error'
        })
      });
  
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
    next_DataRolagemFim: function(dats){
      return new Date(new Date(dats).getTime() + (48 * 60 * 60 * 1000));
    },
    next_DataFimInscricoes(dats) {
      return new Date(new Date(dats).getTime() + (48 * 60 * 60 * 1000));
    },
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
    previewImage: function(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        }
        
        reader.readAsDataURL(input.files[0]);
      }
    },
    submitForm(e) {
      if (this.file !== null && this.file.length !== 0) {
        const formData = new FormData()
        formData.append("file", this.file)
        this.$axios
          .post("https://petcc.dimap.ufrn.br:8443/uploadfile",formData, {
            onUploadProgress: uploadEvent => {
              this.progressValue = `${Math.round(uploadEvent.loaded/ uploadEvent.total * 100)}%`
            }
          })
          .then(res => {
            this.form.imagem = res.data;
            this.progressValue = 0
            this.file = []
            this.atualizar();
          })
          .catch(err => {
            Swal.fire({
              title: "Foto não carregada",
              text: "Tente novamente em outro momento.",
              icon: "error"
            })
            .then( () => {
              this.progressValue = 0
              this.file = []
            });
          });
      }
      else {
        this.atualizar();
      }      
    },
    atualizar() {
      this.$axios.post("eventos-cadastrar", this.form)
        .then(res => {
          Swal.fire({
            title: 'Evento atualizado',
            icon: 'success',
          })
          .then( () => {
            this.$router.push('/tutor/eventos-organizados');
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Evento não atualizado',
            icon: 'error'
          })
          .then( () => {
            this.$router.push('/tutor/eventos-organizados');
          });
        });
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