<template>
  <div>
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-5 text-center">
          <i class="fa fa-newspaper-o"></i> Notícias antigas
        </h1>
        <div v-if="noticias.length > 0">
          <b-card-group columns class="cards">
            <div v-for="noticia in noticias" :key="noticia.id">
              <nuxt-link :to="'/noticias/antigas/' + noticia.idNoticia">
                <b-card class="pr-4">
                  <b-card-text class="small text-muted">
                    {{noticia.inicio_exibicao | moment }}
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
          <h5 class="text-center">Não há nenhuma notícia antiga disponível.</h5>
        </div>
      </div>        
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "index",
  head() {
    return {
      title: "PET-CC UFRN | Notícias"
    };
  },
  data() {
    return {
			mainProps: { width: 425, height: 200},
      noticias: [],
    };
  },
  mounted() {
    this.$axios
      .get("noticias-atuais")
      .then(res => {
        this.noticias = res.data.content;
      })
      .catch( err => {

        if (err.response.status === 404) {
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
    cortarCorpo(mensagem) {
      return mensagem.length > 120
        ? `${mensagem.substring(0, 120)}...`
        : mensagem;
    },
    moment: function(date) {
      return moment(date).format("LL").toUpperCase();
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000000;
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
.cards {
  margin-bottom: 20px;
}

</style>


