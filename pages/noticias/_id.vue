<template>
  <div>
    <div class="container pt-5">
     	<br>
      <h1 class="mt-3 mb-0"><nuxt-link to="/noticias"> <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
 Voltar às notícias</nuxt-link></h1>
      <hr>
      <b-row class="mb-5">
        <b-col>
  				<p class="mt-3 mb-1"> {{noticia.inicio_exibicao | moment}}</p>
          <h3>{{noticia.titulo}}</h3>
          <b-img v-if="noticia.imagem !== null" center class="mt-3 mb-5" v-bind="mainProps" :src="`${imageData}`" fluid alt="Responsive image"></b-img>
          <p class="mt-3 mb-3">{{noticia.corpo}}</p>

          <span v-for="anexo in anexos" :key="anexo.id" >
            <b-button class="btn btn-indigo mt-2 float-right mr-2"
              @click="fazerDowloadAnexo(anexo.anexos.split('/').slice(2)[0])"
              style="color: white"> 
              <i class="fa fa-download fa-fw"></i> {{anexo.anexos.split('/').slice(2)[0].split('-').slice(2)[0]}}
            </b-button>
          </span>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  layout: 'index',
	head () {
		return {
			title: 'PET-CC UFRN | Notícias'
		}
	},
  data() {
		return {
      anexos: [],
      imageData: "",
      quantidadeAnexos: 0,
			noticia: {
				titulo: "",
        corpo: "",
        imagem: "", 
				petiano: {
					pessoa: {
						nome:""
					}
				}
			},
			mainProps: { width: 425, height: 200},
    }
  },
  mounted(){
    this.$axios
      .get('noticia/'+ this.$route.params.id)
      .then(res => {
        this.noticia = res.data;

        if (res.data.imagem !== "" && res.data.imagem !== null) {
          const reader = new FileReader();
         
          reader.onload = (e) => {
              this.imageData = e.target.result;
          }
          reader.readAsDataURL("teste_imagens/a.png");
        }
      })
      .catch( err => {
        Swal.fire({
          title: "Houve um problema...",
          text: "Por favor, tente recarregar a página. Caso não dê certo," + 
          " tente novamente mais tarde.",
          icon: 'error',
        })
      });

    this.$axios
      .get(`anexos-noticias/${this.$route.params.id}`)
      .then(res => {
        this.quantidadeAnexos = res.data.length;
        this.anexos = res.data; 
      })
  },
  filters: {
    moment: function(date) {
      return moment(date).format("LL").toUpperCase();
    }
  },
  methods: {
    fazerDowloadAnexo(nomeAnexo) {
      this.$axios
        .get(`https://epet.imd.ufrn.br:8443/downloadfile/${nomeAnexo}`, {responseType: 'arraybuffer'})
        .then(res => {
          let fileURL = window.URL.createObjectURL(new Blob([res.data], {type:'application/*'}));
          let fileLink = document.createElement('a');

          let nomeAnexoCorrigido = nomeAnexo.split('-').slice(2)[0];

          fileLink.href = fileURL;
          fileLink.setAttribute('download', nomeAnexoCorrigido);
          document.body.appendChild(fileLink);
          fileLink.click();

        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: 'Anexo não encontrado',
              icon: 'info',
            });
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error'
            })
          }
        });
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

.container {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: 91.7vh;
}

</style>

 
