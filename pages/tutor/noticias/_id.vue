<template>
  <div class="col-md-12">
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Informações públicas</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner
            style="width: 3rem; height: 3rem;"
            type="grow"
            variant="primary"
            label="Large Spinner"
          ></b-spinner>
        </div>
        <div v-else>
          <span class="mt-0 mb-2">
            <h5>Título:</h5>
            <h6>{{form.titulo}}</h6>
          </span>
          <b-img v-if="form.imagem !== null" center class="mt-3 mb-5" v-bind="mainProps" :src="`http://177.20.148.190:8080/downloadfile/${imageData}`" fluid alt="Responsive image"></b-img>
          
          <p class="mt-3 mb-2">
            <strong>Corpo:</strong>
            {{form.corpo}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Responsável:</strong>
            {{form.petiano.pessoa.nome}}
          </p>
          
          <span v-for="anexo in anexos" :key="anexo.id" >
            <b-button class="btn btn-indigo mt-2 float-right mr-2"
              v-if="anexos.anexos != null"
              @click="fazerDowloadAnexo(anexo.anexos.split('/').slice(2)[0])"
              style="color: white"> <i class="fa fa-download fa-fw"></i> 
              {{anexo.anexos.split('/').slice(2)[0].split('-').slice(2)[0]}}
            </b-button>
          </span>
        </div>
      </b-card-body>
    </b-card>

    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Outras informações</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner
            style="width: 3rem; height: 3rem;"
            type="grow"
            variant="primary"
            label="Large Spinner"
          ></b-spinner>
        </div>
        <div v-else>
          <p class="mt-1 mb-1">
            <strong>Perído de exibição:</strong>
            <span
              v-if="form.inicio_exibicao !== null && form.limite_exibicao !== null"
            >{{ this.form.inicio_exibicao | moment }} - {{ this.form.limite_exibicao | moment}}</span>
          </p>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  layout: "menu/tutor",
  data() {
    return {
      isLoading: true,
      anexos: [],
      quantidadeAnexos: 0,
      mainProps: { width: 600, height: 600},
      imageData: "",
			form: {
        titulo: "",
        corpo: "",
        imagem: "",
        inicio_exibicao: "",
        limite_exibicao: "",
        petiano: {
          pessoa: {
            nome: ""
          }
        }
      }
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  },
  mounted() {
    this.$axios
      .get(`noticia/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        if (this.form.imagem != null)
          this.imageData = this.filterNameFile(this.form.imagem);
        this.isLoading = false;
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);
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
        .get(`http://177.20.148.190:8080/downloadfile/${nomeAnexo}`, {responseType: 'arraybuffer'})
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
ul {
  list-style: none;
  padding-left: 10px;
}
p {
  font-size: 15px;
}
strong {
  font-size: 16px;
}
h3,
h4 {
  font-weight: 300;
}
h5,
h6 {
  display: inline;
  font-size: 18px;
}
</style>