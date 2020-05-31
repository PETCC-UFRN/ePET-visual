<template>
  <div>
    <Comum/>  
    <div class="container">
     	<br>
        <h1 class="mt-3 mb-0"><i class="far fa-newspaper"></i> Notícias</h1>
        <hr>
		<b-row class="mb-5">
			<b-col cols="9">
				<b-img class="mt-3 mb-3" v-bind="mainProps" src="https://hongkong.imd.ufrn.br/filemanagerportal/source/2020/Palestra_Wedson.png" fluid alt="Responsive image"></b-img>
				<span id="corpo" class="mt-3 mb-1"> {{mes}}</span>
				<h2>{{noticia.titulo}}</h2>
				<span id="corpo" class="mt-3 mb-3">{{noticia.corpo}}</span>
			</b-col>
			<b-col class="ml-3">
				<h3><i class="far fa-newspaper"></i> Outras notícias</h3>
				<b-card-group deck class="ml-1 mt-3 mr-1">
					<b-row>
						<nuxt-link :to="`/noticias/${outrasNoticias[0].idNoticia}`"> 	
							 <b-card >
									<b-card-text class="small text-muted"> {{outrasNoticias[0].inicio_exibicao.substring(8,10)}} {{mesF(outrasNoticias[0].inicio_exibicao.substring(5,7))}}  {{outrasNoticias[0].inicio_exibicao.substring(0,4)}} </b-card-text>
									<hr>
									<b-card-title><h5>{{outrasNoticias[0].titulo}}</h5></b-card-title>
									<b-card-text>{{outrasNoticias[0].corpo}}</b-card-text>
									<b-card-text class="small text-muted">  <em>Publicado por  {{outrasNoticias[0].petiano.pessoa.nome}} </em></b-card-text>
							</b-card>  
						</nuxt-link> 
					</b-row>
					<b-row class="mt-3">
						<nuxt-link :to="`/noticias/${outrasNoticias[1].idNoticia}`"> 
							<b-card>
									<b-card-text class="small text-muted"> {{outrasNoticias[1].inicio_exibicao.substring(8,10)}} {{mesF(outrasNoticias[1].inicio_exibicao.substring(5,7))}} {{outrasNoticias[1].inicio_exibicao.substring(0,4)}} </b-card-text>
									<hr>
									<b-card-title><h5>{{outrasNoticias[1].titulo}}</h5></b-card-title>
									<b-card-text>{{outrasNoticias[1].corpo}}</b-card-text>
									<b-card-text class="small text-muted">  <em>Publicado por  {{outrasNoticias[1].petiano.pessoa.nome}} </em></b-card-text>
							</b-card>
						</nuxt-link> 
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
			title: 'PET-CC UFRN | Notícias'
		}
	},
  	data() {
		return {
      		noticias:[
				{ 
					"idNoticia": 0, 
					"titulo": "", 
					"corpo": "", 
					"inicio_exibicao": "", 
					"limite_exibicao": "", 
					"petiano": { 
						"idPetiano": 0, 
						"data_ingresso": "", 
						"data_egresso": "", 
						"area_interesse": "", 
						"lattes": "", 
						"foto": "", 
						"site_pessoal": "", 
						"pessoa": { 
							"idPessoa": 0, 
							"nome": "", 
							"cpf": "", 
							"tipo_usuario": { 
								"idTipo_usuario": 0, 
								"nome": "" 
							} 
						} 
					}
				},
				{ 
					"idNoticia": 0, 
					"titulo": "", 
					"corpo": "", 
					"inicio_exibicao": "", 
					"limite_exibicao": "", 
					"petiano": { 
						"idPetiano": 0, 
						"data_ingresso": "", 
						"data_egresso": "", 
						"area_interesse": "", 
						"lattes": "", 
						"foto": "", 
						"site_pessoal": "", 
						"pessoa": { 
							"idPessoa": 0, 
							"nome": "", 
							"cpf": "", 
							"tipo_usuario": { 
								"idTipo_usuario": 0, 
								"nome": "" 
							} 
						} 
					}
				}
			],
			noticia: {
				titulo: "",
				corpo: "",
				petiano: {
					pessoa: {
						nome:""
					}
				}
			},
			mainProps: { width: 825, height: 523},
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
		.get('noticia/'+ this.$route.params.id)
		.then((res) => this.noticia = res.data);

	this.$axios
		.get("noticias-atuais")
		.then(res => this.noticias = res.data.content);
  },
  computed: {
	 mes() {
      if (this.noticia.inicio_exibicao != null) {
		return "" + this.noticia.inicio_exibicao.substring(8,10) + " " + 
		this.mesNomes[parseInt(this.noticia.inicio_exibicao.substring(5,7) , 10)] + " "+ 
		this.noticia.inicio_exibicao.substring(0,4);
	
	  }
	  return "";
	},
	outrasNoticias() {
	  return this.noticias.filter(noticia => noticia.idNoticia != this.noticia.idNoticia).slice(0,2);
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

 
