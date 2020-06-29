<template>
  <div>
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-3 text-center">
          <i class="fa fa-newspaper-o"></i> Notícias
        </h1>
        <div v-if="noticias.length > 0">
          <b-card-group columns class="cards">
            <div v-for="noticia in noticias" :key="noticia.id">
              <nuxt-link :to="'/noticias/' + noticia.idNoticia">
                <b-card class="pr-4">
                  <b-card-text class="small text-muted">
                    {{noticia.inicio_exibicao.substring(8,10)}}
                    {{mes(noticia.inicio_exibicao.substring(5,7))}} {{noticia.inicio_exibicao.substring(0,4)}}
                  </b-card-text>
                  <hr />
                  <b-card-title>
                    <h5>{{noticia.titulo}}</h5>
                  </b-card-title>
                  <b-card-text>{{noticia.corpo | cortarCorpo }}</b-card-text>
                </b-card>
              </nuxt-link>
            </div>
          </b-card-group>
        </div>
        <div v-else>
          <h5 class="text-center">Não há notícia nova disponível.</h5>
        </div>
      </div>        
    </div>
  </div>
</template>


<script>
export default {
  layout: "index",
  head() {
    return {
      title: "PET-CC UFRN | Notícias"
    };
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
        "DEZEMBRO"
      ]
    };
  },
  mounted() {
    this.$axios.get("noticias-atuais").then(res => {
      this.noticias = res.data.content;
    });
  },
  filters: {
    cortarCorpo(mensagem) {
      return mensagem.length > 120
        ? `${mensagem.substring(0, 120)}...`
        : mensagem;
    }
  },
  methods: {
    mes(value) {
      if (value != null) return this.mesNomes[parseInt(value, 10)];
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000000;
}

h1 {
  font-weight: 300;
  font-size: 50px;
}
h5 {
  font-size: 20px;
}

p.card-text {
  font-size: 17px;
}
@media(max-width: 500px){
  h1 {
    font-size: 40px;
  }

  h5 {
    font-size: 17.5px;
  }
  p.card-text {
    font-size: 15px;
  }
} 
.cards {
  margin-bottom: 20px;
}

</style>


