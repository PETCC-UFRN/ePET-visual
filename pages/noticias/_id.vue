<template>
  <div>
    <div class="container pt-5">
     	<br>
      <h1 class="mt-3 mb-0"><nuxt-link to="/noticias"> <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
 Voltar às notícias</nuxt-link></h1>
      <hr>
      <b-row class="mb-5">
        <b-col>
  				<b-img center class="mt-3 mb-5" v-bind="mainProps" src="https://i.ytimg.com/vi/TISxP_iW9IU/hqdefault.jpg" fluid alt="Responsive image"></b-img>
          <p class="mt-3 mb-1"> {{mes}}</p>
          <h3>{{noticia.titulo}}</h3>
          <p class="mt-3 mb-3">{{noticia.corpo}}</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'index',
	head () {
		return {
			title: 'PET-CC UFRN | Notícias'
		}
	},
  data() {
		return {
			noticia: {
				titulo: "",
				corpo: "",
				petiano: {
					pessoa: {
						nome:""
					}
				}
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
      .get('noticia/'+ this.$route.params.id)
      .then((res) => this.noticia = res.data);

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
  text-decoration: none;
}

h1 {
  font-weight: 300;
  font-size: 30px;
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

 
