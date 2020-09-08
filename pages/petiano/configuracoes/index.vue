<template>
  <div>
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Informações do site</h3>
          </b-col>
          <b-col>
          <nuxt-link
            class="btn btn-sm btn-warning float-right mt-4"
            to="/petiano/configuracoes/edit" 
          ><i class="fa fa-pencil fa-fw"></i> Editar</nuxt-link>
          </b-col>
        </b-row>
			</template>
 
			<b-card-body>
        <b-row>
          <b-col cols="12">
            <p class="mt-0 mb-1">
              <strong>Sobre o PET-CC:</strong>
              {{informacoes.sobre}}
            </p>
          </b-col>
          <b-col>
            <p class="mt-1 mb-1">
              <strong>Endereço físico:</strong> 
              {{informacoes.endereco}}
            </p>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <p class="mt-0 mb-2">
              <strong><i class="fa fa-phone fa-lg"></i> </strong> 
              {{informacoes.telefone}}
            </p>
            <p class="mt-1 mb-2">
              <strong><i class="fa fa-envelope fa-lg"></i></strong> 
              {{informacoes.email}}
            </p>
            <p class="mt-1 mb-1">
              <strong><i class="fa fa-facebook-square fa-lg"></i></strong>
                <a class="mr-1" :href="informacoes.facebook" target="_blank">petccufrn</a>
            </p>
          </b-col>
          <b-col>
            <p class="mt-0 mb-2">
              <strong><i class="fa fa-youtube-square fa-lg"></i></strong>
                <a :href="informacoes.youtube" target="_blank">PET Ciência da Computação UFRN</a>
            </p>
            <p class="mt-1 mb-2">
              <strong><i class="fa fa-instagram fa-lg"></i></strong>
                <a class="mr-1" :href="informacoes.instagram" target="_blank">petccufrn</a>
            </p>
            <p class="mt-1 mb-1">
              <strong><i class="fa fa-github-square fa-lg"></i></strong>
                <a class="mr-1" :href="informacoes.github" target="_blank">PETCC-UFRN</a>
            </p>
          </b-col>
        </b-row>
      </b-card-body> 
    </b-card>
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col>
            <h4>Modificar template de declaração</h4>
          </b-col>
        </b-row>
      </template>
      <b-form-file
        v-model="file"
        placeholder="Nenhum arquivo" browse-text="Selecionar arquivo" id="anexo"></b-form-file>
      <b-form-text> O tamanho máximo de arquivo é de 10 megabytes. </b-form-text>
      
      <b-progress :value="progressValue" :max="100" show-progress animated></b-progress>
      <template v-slot:footer>
        <b-button block @click="fazerUploadPDFTemplate"
          class="btn btn-sm btn-success mt-2">
          Atualizar arquivo template da declaração
        </b-button>
      </template>
    </b-card>    
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: "menu/petiano",
  data: function() {
    return {
      file:[],
      progressValue: 0,
      informacoes:{
        idInformacao: 1,
        sobre: "",
        telefone: "",
        endereco: "",
        email: "",
        github: "",
        facebook: "",
        instagram: "",
        youtube:""
      }
    };
  },
  mounted() {
    this.$axios.get("informacoes").then(res => {
      this.informacoes = res.data;
    });
  },
  methods: {
    fazerUploadPDFTemplate(evento) {
      const formData = new FormData()
      formData.append("file", this.file)
      this.$axios
        .post(`certificado/mudarTemplate/`, formData, {
          onUploadProgress: uploadEvent => {
            this.progressValue = `${Math.round(uploadEvent.loaded/ uploadEvent.total * 100)}%`
          }
        })
        .then(res => {
          Swal.fire({
            title: "PDF de template atualizado",
            icon: "success"
          })
          .then( () => {
            this.progressValue = 0
            this.file = []
          });
        })
        .catch(err => {
          Swal.fire({
            title: "PDF de template não atualizado",
            text: "Tente novamente em outro momento.",
            icon: "error"
          })
          .then( () => {
            this.progressValue = 0
            this.file = []
          });
        });
    },
  }
};

</script>



<style scoped>
ul {
  list-style: none;
  padding-left: 10px;
}
p, a {
  font-size: 17px;
}
strong {
  font-size: 19px;
}
h3, h4 {
  font-weight: 300;
}
h5, h6 {
  display: inline;
  font-size: 18px;
}
</style>