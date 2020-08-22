<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-3 text-center"><i class="fa fa-calendar-check-o"></i> Eventos</h1>
        <div v-if="eventos.length > 0">
          <b-card-group columns class="cards">
          <div v-for="evento in eventos" :key="evento.id">
            <nuxt-link :to="'/eventos/' + evento.idEvento">
              <b-card>
                <b-card-title><h5>{{evento.titulo}} </h5></b-card-title>
                <hr>
                <b-card-text>
                <p class="mt-0 mb-0"><b>Período de inscrição:</b> 	
                  <span v-if="evento.d_inscricao !== ''">{{ evento.d_inscricao | moment }}</span> -
                  <span v-if="evento.d_inscricao_fim !== ''">{{ evento.d_inscricao_fim | moment}}</span>
                </p>
                <p class="mt-0 mb-0"><b>Número de vagas:</b> {{evento.qtdVagas}}</p>
                <p class="mt-0 mb-0"><b>Local:</b> {{evento.local}}</p>
                <p class="mt-0 mb-0"><b>Carga horária:</b> {{evento.qtdCargaHoraria}}h</p>
                <p class="mt-0 mb-0"><b>Valor da inscrição:</b> 
                  {{new Intl
                    .NumberFormat([], { style: 'currency', currency: 'BRL'})           
                    .format(evento.valor) }}
                </p>
                </b-card-text>
              </b-card>
            </nuxt-link>
          </div>
          </b-card-group>
              </div>
        <div v-else>
          <h5 class="text-center">Não há evento aberto disponível.</h5>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  layout: 'index',
	head () {
		return {
			title: 'PET-CC UFRN | Eventos'
		}
	},
    data() {
      return {
		eventos: [],
        mesNomes: [
          "JANEIRO",
          "FEVEREIRO",
          "MARÇO",
          "ABRIL",
          "MAIO",
          "JUNHO",
          "JULHO",
          "AGOSTO",
          "SETEMBRO",
          "OUTUBRO",
          "NOVEMBRO",
          "DEZEMBRO"]
      };
  },
  mounted() {
    this.$axios
      .get("eventos-abertos")
      .then(res => {
        this.eventos = res.data;
      })
      .catch( err => {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Nenhum evento aberto",
            icon: 'info',
          });
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
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  computed: {
    filterEventos() {
      return this.eventos.filter(evento => evento.ativo == true)
	  } 
  }
}
</script>


<style scoped>
a {
	color: #000000;
	text-decoration: none;
 }


h1 {
  font-weight: 300;
  font-size: 40px;
}

h5 {
  font-size: 20px;
}

p.card-text {
  font-size: 17px;
}
@media(max-width: 500px){
  h5 {
    font-size: 17.5px;
  }
  p.card-text {
    font-size: 15px;
  }
} 
em{
  font-size: 16px;
}

.cards {
  margin-bottom: 20px;
}


.container-fluid {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: 91.7vh;
}

</style>
