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
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>
          <span class="mt-0 mb-2">
            <h5>{{form.titulo}}</h5> 
          </span>
          <b-img v-if="form.imagem !== null" center class="mt-3 mb-5" v-bind="mainProps" :src="`https://epet.imd.ufrn.br:8443/downloadfile/${imageData}`" fluid alt="Responsive image"></b-img>
          <p class="mt-3 mb-1">
            <strong>Perído de inscrições:</strong>
            <span v-if="form.d_inscricao !== ''">{{ this.form.d_inscricao | moment }}</span> -
            <span v-if="form.d_inscricao_fim !== ''">{{ this.form.d_inscricao_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Dias de realização do evento:</strong>
            <span v-for="(dia, index) in form.periodo_evento" v-bind:key="(dia, index)">
              <span v-if="index == form.periodo_evento.length - 1">
                {{ dia | moment }}
              </span>
              <span v-else>
                {{ dia | moment }},
              </span>
            </span> 
          </p>
          <p class="mt-0 mb-1">
            <strong>Carga horária:</strong>
            {{form.qtdCargaHoraria}} hora(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Total de vagas:</strong>
            {{form.qtdVagas}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Valor da inscrição:</strong>
            {{new Intl
                .NumberFormat([], { style: 'currency', currency: 'BRL'})
                .format(form.valor) }}
          </p>
          <p class="mt-2 mb-1">
            <strong>Local do curso:</strong>
            {{form.local}}
          </p>
          <p class="mt-3 mb-2">
            <strong>Descrição:</strong>
            {{form.descricao}}
          </p>
          <span v-for="anexo in anexos" :key="anexo.id" >
            <b-button class="btn btn-indigo mt-2 float-right mr-2"
              v-if="anexos != null"
              @click="fazerDowloadAnexo(anexo.anexos.split('/').slice(2)[0])"
              style="color: white"> <i class="fa fa-download fa-fw"></i> 
              {{anexo.anexos.split('/').slice(2)[0].split('-').slice(2)[0]}}
            </b-button>
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
  layout: "menu/usuario",
  data() {
    return {
      isLoading: true,
      anexos: [],
      quantidadeAnexos: 0,
      form: {
				idEvento: 0,
				d_inscricao: "",
				d_inscricao_fim: "",
				descricao: "",
				local: "",
        qtdCargaHoraria: "",
        periodo_evento: [],
				qtdVagas: "",
				titulo: "",
				valor: "", 
      },
      imageData: "",
			mainProps: { width: 600, height: 600},
    };
  },
  mounted() {
   this.$axios.get(`eventos/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);
        this.isLoading = false;
        
        if (this.form.imagem != null)
          this.imageData = this.filterNameFile(this.form.imagem);
        
        this.$axios
          .get(`anexos-evento/${this.form.idEvento}`)
          .then(res => {
            this.quantidadeAnexos = res.data.length;
            this.anexos = res.data; 
          })
          .catch(err => {
            if (err.response.status === 404) { }
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: 'error'
              })
            }
          });
      })
      .catch(err => {
        Swal.fire({
          title: "Houve um problema...",
          text: "Por favor, tente recarregar a página. Caso não dê certo," +
          " tente novamente mais tarde.",
          icon: "error"
        })
      });
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
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
h3, h4, h5 {
  font-weight: 300;
}
h5{
  font-size: 18px;
}
</style>
