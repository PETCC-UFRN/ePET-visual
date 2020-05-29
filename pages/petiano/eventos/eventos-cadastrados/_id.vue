<template>
  <div class="col-md-12">

    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Informações públicas</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>
          <spain class="mt-0 mb-2">
            <h5>Título:</h5> <h6> {{form.titulo}}</h6>
          </spain>
          <p class="mt-3 mb-2">
            <strong>Descrição:</strong>
            {{form.descricao}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Local do curso:</strong>
            {{form.local}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Perído de inscrições:</strong>
            <span v-if="form.d_inscricao !== ''">{{ this.form.d_inscricao | moment }}</span> -
            <span v-if="form.d_inscricao_fim !== ''">{{ this.form.d_inscricao_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Perído de realização do evento:</strong>
            <span v-if="form.d_evento_inicio !== ''">{{ this.form.d_evento_inicio | moment }}</span> -
            <span v-if="form.d_evento_inicio !== ''">{{ this.form.d_evento_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Quantidade de dias de evento:</strong>
            {{form.qtdDia}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Carga horária:</strong>
            {{form.qtdCargaHoraria}} hora(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Total de vagas:</strong>
            {{form.qtdVagas}}
          </p>
          <p class="mt-0 mb-0">
            <strong>Valor da inscrição:</strong>
            {{new Intl
                .NumberFormat([], { style: 'currency', currency: 'BRL'})           
                .format(form.valor) }}
          </p>
        </div>  
      </b-card-body>
      <template v-slot:footer>
        <b-button id="tooltip-target-1" @click.prevent="gerarCertificado()" block variant="success">
          <i class="fa fa-certificate mr-1"></i>Emitir certificado de participação
        </b-button>
        <b-tooltip target="tooltip-target-1" triggers="hover">
          <strong>{{form.percentual}}%</strong> concluído
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
            {{form.dias_compensacao}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Há anexo para os participantes:</strong>
            <span v-if="form.participante_anexos === true ">Sim.</span>
            <span v-else>Não.</span> 
          </p>
          <p class="mt-0 mb-0">
            <strong>Texto de declaração:</strong>
            {{form.textoDeclaracaoEvento}}
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
  layout: "menu/petiano",
  data() {
    return {
      isLoading: true,
      form: {
        idEvento: 0,
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
      }
    };
  },
  mounted() {
   this.$axios.get(`eventos/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        this.isLoading = false;
      })
      .catch(err => {
        Swal.fire({
          title: "Falha no consumo da API",
          icon: "error",
          text: err.res.status
        })
        .then( () => {
          let vm = this;
          setTimeout(function() {
            location.reload();
          }, 1500);
        });
      });
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
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