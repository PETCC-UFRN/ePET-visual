<template>
  <div>
      <Comum/>  
      <div class="container">
          <br>
          <h1 class="mt-3 mb-0"><i class="far fa-newspaper"></i> Notícias</h1>
          <hr>
          <b-card-group columns class="cards">
            <div v-for="noticia in noticias" :key="noticia.id">
              <a :href="'/noticias/' + noticia.idNoticia">
                <b-card>
                  <b-card-text class="small text-muted"> {{noticia.inicio_exibicao.substring(8,10)}} {{mes(noticia.inicio_exibicao.substring(5,7))}} {{noticia.inicio_exibicao.substring(0,4)}} </b-card-text>
                  <hr>
                  <b-card-title><h5>{{noticia.titulo}}</h5></b-card-title>
                  <b-card-text>This card has supporting text below as a natural lead-in to additional content.</b-card-text>
                  <b-card-text class="small text-muted">  <em>Publicado por  {{noticia.petiano.pessoa.nome}} </em></b-card-text>
                </b-card>
              </a>
            </div>
          </b-card-group>
      </div>
    <BottomBar/>
  </div>
</template>

<script>
import Comum from "~/components/Comum";
import axios from "~/axios";
import BottomBar from "~/components/anonymous/BottomBar";

export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar
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
    axios.get("noticia").then(res => {
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


<style>

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

 
