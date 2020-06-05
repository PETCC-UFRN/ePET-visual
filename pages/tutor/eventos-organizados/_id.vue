<template>
  <div class="col-md-12">
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Informações</h3>
          </b-col>
          <b-col v-if="form.evento.valor > 0">
            <b-button
              variant="teal"
              class="btn btn-sm float-right mt-4"
            ><i class="fa fa-info-circle px-2" aria-hidden="true"></i> Status do pagamento</b-button>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>
          <h5>Título:</h5> <h6> {{form.evento.titulo}}</h6>
          <p class="mt-3 mb-1">
            <strong>Perído de inscrições:</strong>
            <span v-if="form.evento.d_inscricao !== ''">{{ this.form.d_inscricao | moment }}</span> -
            <span v-if="form.evento.d_inscricao_fim !== ''">{{ this.form.d_inscricao_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Perído de realização do evento:</strong>
            <span v-if="form.d_evento_inicio !== ''">{{ this.form.d_evento_inicio | moment }}</span> -
            <span v-if="form.d_evento_inicio !== ''">{{ this.form.d_evento_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Quantidade de dias de evento:</strong>
            {{form.evento.qtdDias}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Carga horária:</strong>
            {{form.evento.qtdCargaHoraria}} hora(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Total de vagas:</strong>
            {{form.evento.qtdVagas}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Valor da inscrição:</strong>
            {{new Intl
                .NumberFormat([], { style: 'currency', currency: 'BRL'})           
                .format(form.evento.valor) }}
          </p>
          <p class="mt-0 mb-1">
            <strong>Local do curso:</strong>
            {{form.evento.local}}
          </p>
          <p class="mt-3 mb-2">
            <strong>Descrição:</strong>
            {{form.evento.descricao}}
          </p>
          
        </div>  
      </b-card-body>
      <template v-slot:footer>
        <b-button id="tooltip-target-1" :disabled="disabledBotaoCertificado"
         @click.prevent="gerarCertificado()" block variant="success">           
         <i class="fa fa-certificate mr-1"></i>Emitir certificado de organização
        </b-button>
        <b-tooltip target="tooltip-target-1" triggers="hover">
          <strong>{{form.evento.percentual}}%</strong> concluído
        </b-tooltip>
      </template>
    </b-card>
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Outras informações</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>    
          <p class="mt-0 mb-1">
            <strong>Perído de rolagem:</strong>
            <span v-if="this.form.inicio_rolagem !== ''">{{ this.form.inicio_rolagem | moment }}</span> -
            <span v-if="this.form.fim_rolagem !== ''">{{ this.form.fim_rolagem | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Quantidade de dias de compensação:</strong>
            {{form.evento.dias_compensacao}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Há anexo para os participantes:</strong>
            <span v-if="form.participante_anexos === true ">Sim.</span>
            <span v-else>Não.</span> 
          </p>
          <p class="mt-3 mb-2">
            <strong>Texto de declaração do participante:</strong>
            {{form.evento.textoDeclaracaoEvento}}
          </p>
          <p class="mt-2 mb-1">
            <strong>Texto de declaração do organizador:</strong>
            {{form.evento.textoDeclaracaoEventoOrganizador}}
          </p>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/tutor",
  data() {
    return {
      isLoading: true,
      eventoTerminou: true,
      form: {  
        evento: { 
          titulo: "", 
          descricao: "", 
          local: "", 
          imagem: null, 
          d_inscricao: "", 
          d_inscricao_fim: "", 
          d_evento_inicio: "", 
          d_evento_fim: "", 
          inicio_rolagem: "", 
          fim_rolagem: "", 
          dias_compensacao: 0, 
          percentual: 0, 
          ativo: true, 
          participante_anexos: false, 
          qtdVagas: 5, 
          qtdCargaHoraria: 2, 
          qtdDias: 5, 
          valor: 0, 
          textoDeclaracaoEvento: "", 
          textoDeclaracaoEventoOrganizador: "" 
        }, 
        data_maxima: "", 
        confirmado: true, 
        espera: false, 
        idParticipantes: 26 
      } 
    };
  },
  mounted() {
    this.$axios
      .get(`organizadores/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        this.$nuxt.$emit("changeCrumbs", this.form.evento.titulo);
        this.isLoading = false;
      })
      .catch(err => {
        Swal.fire({
          title: "Houve um problema...",
          text: "Por favor, tente recarregar a página. Caso não dê certo," + 
          " tente novamente mais tarde.",
          icon: "error"
        })
        .then(() => this.isLoading = false);
      });
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  computed: {
    disabledBotaoCertificado() {
      return !(moment(new Date().getDay()) > moment(this.d_inscricao_fim)); 
    },
  },
  methods: {
    gerarCertificado() {
      if (this.form.percentual >= 75) {

      } else {
        Swal.fire({
          title: "Certificado não gerado",
          icon: "error",
          text: "É necessário que se obtenha no mínimo 75% de participação para geração do certificado"
        });
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 10px;
}
p {
  font-size: 15px;
}
strong {
  font-size: 16px;
}
h3, h4 {
  font-weight: 300;
}
h5, h6 {
  display: inline;
  font-size: 18px;
}
</style>