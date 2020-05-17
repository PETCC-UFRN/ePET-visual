<template>
  <div>
      <Comum/>  
      <div class="container">
          <br>
          <h1 class="mt-3 mb-0"><i class="far fa-newspaper"></i> Notícias</h1>
          <hr>
          <div v-if="noticias.length > 0">
            <b-card-group columns class="cards">
              <div v-for="noticia in noticias" :key="noticia.id">
                <nuxt-link :to="'/noticias/' + noticia.idNoticia">
                  <b-card>
                    <b-card-text class="small text-muted"> {{noticia.inicio_exibicao.substring(8,10)}} {{mes(noticia.inicio_exibicao.substring(5,7))}} {{noticia.inicio_exibicao.substring(0,4)}} </b-card-text>
                    <hr>
                    <b-card-title><h5>{{noticia.titulo}}</h5></b-card-title>
                    <b-card-text>This card has supporting text below as a natural lead-in to additional content.</b-card-text>
                    <b-card-text class="small text-muted">  <em>Publicado por  {{noticia.petiano.pessoa.nome}} </em></b-card-text>
                  </b-card>
                </nuxt-link>
              </div>
            </b-card-group>
          </div>
          <div v-else>
            <h2>Não existe notícia cadastrada.</h2>
            <br>
          </div>
      </div>
    <BottomBar/>
  </div>
</template>

<script>
import Comum from "~/components/Comum";
import axios from "axios";
import BottomBar from "~/components/anonymous/BottomBar";

export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar
    },
	head () {
		return {
			title: 'PET-CC UFRN - Notícias'
		}
	},
    data() {
      return {
        noticias: [],
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
    this.$axios.get("https://epet.imd.ufrn.br:8443/api/noticia").then(res => {
      this.noticias = res.data.content;
    });
  },
  methods: {
    mes(value) {
      if (value != null)
        return this.mesNomes[parseInt(value, 10)];
    }
  }
}
</script>


<style scoped>

a {
  text-decoration: none;
  color: #000000; 
}

h1 {
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}

.cards {
  margin-bottom: 20px;
}
hr {
  margin-top: 10px;
  margin-bottom: 20px;
}

a {
  color: inherit;
}

</style>

 
