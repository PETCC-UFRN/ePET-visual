<template>
  <div>
    <b-card
      v-if="loaded"
      header-tag="header"
      :title="evento.titulo"
    >
    		<template v-slot:header>
        <b-row>
          <b-col>
            <h2>Informações</h2>
          </b-col>
        </b-row>
			</template>
      <b-card-body>
        <div>
          <p class="mt-0 mb-1">
            <strong>Local do curso:</strong>
            {{evento.local}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Perído de inscrições:</strong>
            <span v-if="evento.d_inscricao !== ''">{{ this.evento.d_inscricao | moment }}</span> -
            <span v-if="evento.d_inscricao_fim !== ''">{{ this.evento.d_inscricao_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Perído de realização do evento:</strong>
            <span v-if="evento.d_evento_inicio !== ''">{{ this.evento.d_evento_inicio | moment }}</span> -
            <span v-if="evento.d_evento_inicio !== ''">{{ this.evento.d_evento_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Quantidade de dias de evento:</strong>
            {{evento.qtdDia}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Carga horária:</strong>
            {{evento.qtdCargaHoraria}} hora(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Total de vagas:</strong>
            {{evento.qtdVagas}}
          </p>
          <p class="mt-0 mb-4">
            <strong>Valor da inscrição:</strong>
            {{new Intl
                .NumberFormat([], { style: 'currency', currency: 'BRL'})           
                .format(evento.valor) }}
          </p>
        </div>
        <span  v-html="evento.descricao"></span>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import Swal from "sweetalert2";
import moment from "moment";


export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return { 
      evento: {
       idEvento: 0,
        d_evento_fim: "",
        d_evento_inicio: "",
        d_inscricao: "",
        d_inscricao_fim: "",
        descricao: "",
        local: "",
        qtdCargaHoraria: "",
        qtdDias: "",
        qtdVagas: "",
        titulo: "",
        valor: "",      
      }, 
      loaded: false 
    };
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  mounted() {
    this.$axios
      .get("eventos/" + this.$route.params.id)
      .then(res => {
        this.evento = res.data;
        this.loaded = true;
      })
      .catch( err => {
        if (err.response.status === 500) {
          Swal.fire({
            title: "Nenhum evento aberto",
            icon: 'info',
          })
        }
        else {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: 'error',
          })
        }  
      });

  }
};
</script>


<style scoped>
h2, h4, h6 {
  font-weight: 300;
}
h6 {
  font-size: 80%;
}
</style>