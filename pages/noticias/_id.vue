<template>
  <div>
    <Comum/>  
    <div class="container">
     	<br>
      <h2 class="mt-3 mb-0"><i class="far fa-newspaper"></i> Notícias</h2>
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

 
