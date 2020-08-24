<template>
  <div>
    <b-card
      header="Notícia"
      header-tag="header"
      :sub-title="`Postada em: ${moment(noticia.inicio_exibicao)}`"
      sub-title-tag="h6"
      :title="noticia.titulo"
      title-tag="h4"
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
        <b-img v-if="noticia.imagem !== null" center class="mt-3 mb-5" v-bind="mainProps" :src="`https://epet.imd.ufrn.br:8443/downloadfile/${imageData}`" fluid alt="Responsive image"></b-img>
          
        <span class="noticiaCorpo" v-html="noticia.corpo"></span>
        
        <span v-if="anexos != null" >
          <span v-for="anexo in anexos" :key="anexo.id" >
            <b-button class="btn btn-indigo mt-2 float-right mr-2"
              @click="fazerDowloadAnexo(anexo.anexos.split('/').slice(2)[0])"
              style="color: white"> <i class="fa fa-download fa-fw"></i> 
              {{anexo.anexos.split('/').slice(2)[0].split('-').slice(2)[0]}}
            </b-button>
          </span>
        </span>
        
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
      anexos: [],
      quantidadeAnexos: 0,
      mainProps: { width: 600, height: 600},
      imageData: "",
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

        if (this.noticia.imagem != null)
          this.imageData = this.filterNameFile(this.noticia.imagem);
        
        this.$nuxt.$emit("changeCrumbs", this.noticia.titulo);
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

      this.$axios
        .get(`anexos-noticias/${this.$route.params.id}`)
        .then(res => {
          this.quantidadeAnexos = res.data.length;
          this.anexos = res.data; 
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: 'Notícia não possui anexos',
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
  },
  methods: {
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
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
    },    
    moment: function (date) {
      if (date !== null & date !== '')
        return moment(date).format("LL");
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
h4 {
  font-size: 24px;
}
h6 {
  font-size: 18px;
}
.noticiaCorpo {
  font-size: 19px;
}
</style>