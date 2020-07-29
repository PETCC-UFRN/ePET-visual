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
          <span class="mt-0 mb-2">
            <h5>Título:</h5> <h6> {{form.titulo}}</h6>
          </span>
          <b-img v-if="form.imagem !== null" center class="mt-3 mb-5" v-bind="mainProps" :src="`${form.imagem}`" fluid alt="Responsive image"></b-img>
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
          <p class="mt-2 mb-1">
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
      form: {
        idEvento: 0,
        d_evento_fim: "",
        d_evento_inicio: "",
        d_inscricao: "",
        d_inscricao_fim: "",
        descricao: "",
        local: "",
        percentual: 0,
        imagem: "",
        qtdCargaHoraria: "",
        qtdDias: "",
        qtdVagas: "",
        titulo: "",
        valor: "",
        ativo: false
      },
			mainProps: { width: 425, height: 200},
    };
  },
  mounted() {
   this.$axios.get(`eventos/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);
        this.isLoading = false;
      })
      .catch(err => {
        Swal.fire({
          title: "Houve um problema...",
          text: "Por favor, tente recarregar a página. Caso não dê certo," +
          " tente novamente mais tarde.",
          icon: "error"
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
