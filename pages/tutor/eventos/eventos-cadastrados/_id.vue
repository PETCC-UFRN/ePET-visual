<template>
  <div class="col-md-12">
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col cols="12">
            <h3>
              <i class="fa fa-calendar-check-o px-2"></i>Evento cadastrado
            </h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <b-card :title="form.titulo" title-tag="h5">
          <template v-slot:header>
            <b-row>
              <b-col>
                <h4>Título</h4>
              </b-col>
            </b-row>
          </template>
        </b-card>
        <b-card header-tag="header">
          <template v-slot:header>
            <b-row>
              <b-col>
                <h5>Descrição</h5>
              </b-col>
            </b-row>
          </template>
          <b-card-body>
            <p>{{form.descricao}}</p>
          </b-card-body>
        </b-card>
        <b-card header-tag="header">
          <template v-slot:header>
            <b-row>
              <b-col>
                <h5>Outras informações</h5>
              </b-col>
            </b-row>
          </template>
          <b-card-body>
              <p class="mt-0 mb-1">
                <strong>Perído de inscrições:</strong>
                <span v-if="this.form.d_inscricao !== ''">{{ new Intl.DateTimeFormat('pt-BR').format(new Date(this.form.d_inscricao))}}</span> -
                <span v-if="this.form.d_inscricao_fim !== ''">{{ new Intl.DateTimeFormat('pt-BR').format(new Date(this.form.d_inscricao_fim))}}</span>
              </p>
              <p class="mt-0 mb-1">
                <strong>Carga horária:</strong>
                {{form.qtdCargaHoraria}} horas
              </p>
              <p class="mt-0 mb-1">
                <strong>Total de vagas:</strong>
                {{form.qtdVagas}}
              </p>
              <p class="mt-0 mb-1">
                <strong>Valor da inscrição:</strong>
                {{new Intl
                    .NumberFormat([], { style: 'currency', currency: 'BRL'})           
                    .format(form.valor) }}
              </p>
              <p class="mt-0 mb-0">
                <strong>Local do curso:</strong>
                {{form.local}}
              </p>
          </b-card-body>
        </b-card>
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
        idEvento: 0,
        titulo: "",
        descricao: "",
        local: "",
        d_inscricao: "",
        d_inscricao_fim: "",
        inicio_rolagem: "",
        fim_rolagem: "",
        dias_compensacao: 0,
        percentual: 0,
        ativo: false,
        participante_anexos: false,
        qtdVagas: 0,
        qtdCargaHoraria: 0,
        qtdDias: 0,
        valor: 0
      }
    };
  },
  mounted() {
    axios
      .get(`eventos/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
      })
      .catch(err => {
        Swal.fire({
          title: "Falha no consumo da API",
          icon: "error",
          text: err.res.status
        });
      });
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
</style>