<template>
  <div>
    <Comum/>  
    <div class="container">
     	<br>
        <h2 class="mt-3 mb-0"><i class="far fa-calendar-alt"></i> Eventos</h2>
        <hr>
        <b-row>
			<b-col>
				<b-img center class="mt-3 mb-5" v-bind="mainProps" src="https://i.ytimg.com/vi/TISxP_iW9IU/hqdefault.jpg" fluid alt="Responsive image"></b-img>
				<p id="corpo" class="mt-3 mb-1"> {{mes}}</p>
				<h3>{{evento.titulo}}</h3>
				<p class="mt-4 mb-1">
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
					{{evento.qtdDias}} dia(s)
				</p>
				<p class="mt-0 mb-1">
					<strong>Carga horária:</strong>
					{{evento.qtdCargaHoraria}} hora(s)
				</p>
				<p class="mt-0 mb-1">
					<strong>Total de vagas:</strong>
					{{evento.qtdVagas}}
				</p>
				<p class="mt-0 mb-1">
					<strong>Valor da inscrição:</strong>
					{{new Intl
						.NumberFormat([], { style: 'currency', currency: 'BRL'})           
						.format(evento.valor) }}
				</p>
				<p class="mt-0 mb-4">
					<strong>Local do curso:</strong>
					{{evento.local}}
				</p><p class="mt-3 mb-2">{{evento.descricao}}</p>
				<p class="mt-3 mb-5"><strong>Observação:</strong> Para se inscrever no evento, é necessário acessar 
				a plataforma de gerenciamento de eventos e tutorias do PET-CC, o ePET. Caso não possua ainda cadastro,
				é possível realizar o cadastro nessa <nuxt-link to="/register">página web</nuxt-link>. Porém, caso já tenha, 
				faça login através dessa outra <nuxt-link to="/login">página web</nuxt-link>.</p>
			</b-col>
		</b-row>
    </div>
    <BottomBar/>
  </div>
</template>

<script>
import Comum from "~/components/Comum";
import moment from "moment";
import BottomBar from "~/components/anonymous/BottomBar";

export default {
  layout: 'index',
  components: {
      Comum,
      BottomBar
  },
	head () {
		return {
			title: 'PET-CC UFRN | Eventos'
		}
	},
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
			mainProps: { width: 425, height: 200},
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
				"DEZEMBRO"
			]
    }
	},
	mounted(){
		this.$axios
			.get('eventos-abertos/'+ this.$route.params.id)
			.then((res) => {
				this.evento = res.data;
			});
	},
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
	computed: {
		mes() {
			if (this.evento.d_inscricao != null) {
				return "" + this.evento.d_inscricao.substring(8,10) + " " + 
				this.mesNomes[parseInt(this.evento.d_inscricao.substring(5,7) , 10)] + " "+ 
				this.evento.d_inscricao.substring(0,4);
			}
			return "";
		},
	},
	methods: {
		mesF(value) {
		if (value != null)
			return this.mesNomes[parseInt(value, 10)];
		}
	}
};
</script>


<style scoped>

a {
	color: blue;
}

h2 {
  font-weight: 300;
  font-size: 32px;
}

h3 {
  font-weight: 300;
  font-size: 25px;
}
div p {
  font-size: 17px;
}

hr {
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>

 
