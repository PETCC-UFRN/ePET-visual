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
          <p class="mt-3 mb-1">
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
            {{form.qtdDias}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Carga horária:</strong>
            {{form.qtdCargaHoraria}} hora(s)
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
          <p class="mt-0 mb-1">
            <strong>Local do curso:</strong>
            {{form.local}}
          </p>
          <p class="mt-3 mb-2">
            <strong>Descrição:</strong>
            {{form.descricao}}
          </p>
        </div>  
      </b-card-body>
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
          title: "Houve um problema...",
          text: "Por favor, tente recarregar a página. Caso não dê certo," + 
          " tente novamente mais tarde.",
          icon: "error",
        })
      });
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
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