<template>
  <div>
    <b-card
      header="Notícia"
      header-tag="header"
      :sub-title="`Postada em: ${moment(noticia.inicio_exibicao)}`"
      sub-title-tag="h6"
      :footer="`Adicionada por: ${noticia.petiano.pessoa.nome}`"
      :title="noticia.titulo"
    >
			<template v-slot:header>
        <b-row>
          <b-col>
            <h2>Informações</h2>
          </b-col>
        </b-row>
			</template>
      <b-card-body>

      <div v-if="!loaded" class="d-flex justify-content-center">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <span v-html="noticia.corpo"></span>
      </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return { 
      noticia: {
				titulo: "",
				corpo: "",
				inicio_exibicao: "",
				limite_exibicao: "",
				petiano: {
					pessoa: {
						nome:""
					}
				}
      }, 
      loaded: false 
    };
  },
  mounted() {
    this.$axios
      .get(`noticia/${this.$route.params.id}`)
      .then(res => {
        this.noticia = res.data;
        this.loaded = true;
      })
      .catch( err => {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Nenhuma notícia cadastrada",
            icon: 'info',
          });
        }
        else {
          Swal.fire({
            title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
          });
        }
      });
  },
  methods: {
    moment: function (date) {
      if (date !== null & date !== '')
        return moment(date).format('DD/MM/YYYY');
      else   
        return '';

    }
  }
};
</script>


<style scoped>
h2, h4, h6 {
  font-weight: 300;
}

h6 {
  font-size: 80%;
}
</style>