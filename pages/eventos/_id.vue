<template>
  <div>
    <Comum/>  
    <div class="container">
     	<br>
        <h1 class="mt-3 mb-0"><i class="far fa-calendar-alt"></i> Eventos</h1>
        <hr>
        <b-row>
			<b-col cols="9">
				<b-img center class="mt-3 mb-5" v-bind="mainProps" src="https://i.ytimg.com/vi/TISxP_iW9IU/hqdefault.jpg" fluid alt="Responsive image"></b-img>
				<p id="corpo" class="mt-3 mb-1"> {{mes}}</p>
				<h2>{{evento.titulo}}</h2>
				<p id="corpo" class="mt-3 mb-3">{{evento.descricao}}</p>
			</b-col>
			<b-col class="ml-3">
				<h3><i class="far fa-calendar-alt"></i>  Outros eventos</h3>
				<b-card-group deck class="ml-1 mt-3 mr-1">
					<b-row>
					</b-row>
					<b-row class="mt-3">
					</b-row>  
				</b-card-group>  
			</b-col>
		</b-row>
    </div>
    <BottomBar/>
  </div>
</template>

<script>
import Comum from "~/components/Comum";

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
            eventos: [
                {
					idEvento: 0,
					titulo: "",
					descricao: "",
					local: "",
					d_inscricao: "",
					d_inscricao_fim: "",
					ativo: true,
					participante_anexos: false,
					qtdVagas: 0,
					qtdCargaHoraria: 0,
					qtdDias: 0,
					valor: 0.0																																																																																																					
                },
                {
					idEvento: 0,
					titulo: "",
					descricao: "",
					local: "",
					d_inscricao: "",
					d_inscricao_fim: "",
					ativo: true,
					participante_anexos: false,
					qtdVagas: 0,
					qtdCargaHoraria: 0,
					qtdDias: 0,
					valor: 0.0
                }
            ],
            evento: {
				idEvento: 0,
				titulo: "",
				descricao: "",
				local: "",
				d_inscricao: "",
				d_inscricao_fim: "",
				ativo: true,
				participante_anexos: false,
				qtdVagas: 0,
				qtdCargaHoraria: 0,
				qtdDias: 0,
				valor: 0.0
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
		this.$axios.get('eventos/'+ this.$route.params.id).then((res) => {
			this.evento = res.data;
		});
		this.$axios.get("eventos").then(res => {
		this.eventos = res.data;
		});
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
		outrosEventos() {
			return this.eventos.filter(evento => evento.idEvento != this.evento.idEvento).slice(0,2);
		}
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
	color: #000000; 
}

h1 {
  font-weight: bold;
  font-size: 40px;
}

h2 {
  font-size: 32px;
}

h3 {
  font-size: 25px;
}
#corpo{
  font-size: 19px;
}

hr {
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>

 
