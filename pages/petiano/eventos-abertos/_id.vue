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
            <h5>Título:</h5> <h6> {{form.titulo}}</h6>
          <p class="mt-3 mb-1">
            <strong>Perído de inscrições:</strong>
            <span v-if="form.d_inscricao !== ''">{{ this.form.d_inscricao | moment }}</span> -
            <span v-if="form.d_inscricao_fim !== ''">{{ this.form.d_inscricao_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Perído de realização do evento:</strong>
            <span v-if="form.d_evento_inicio !== ''">{{ this.form.d_evento_inicio | moment }}</span> -
            <span v-if="form.d_evento_fim !== ''">{{ this.form.d_evento_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Quantidade de dias de evento:</strong>
            <span v-if="form.qtdDias !== ''">{{ this.form.qtdDias}}</span> dia(s)
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
  layout: "menu/petiano",
  data() {
    return {
      isLoading: true,
      anexos: [],
      quantidadeAnexos: 0,
      form: {
        idEvento: 0,
        d_evento_fim: "",
        d_evento_inicio: "",
        d_inscricao: "",
        d_inscricao_fim: "",
        descricao: "",
        local: "",
        percentual: 0,
        qtdCargaHoraria: "",
        qtdDias: "",
        qtdVagas: "",
        titulo: "",
        valor: "",
        ativo: false
      }
    };
  },
  mounted() {
    this.$axios
      .get(`eventos/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        this.isLoading = false;
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);

        this.$axios
          .get(`anexos-evento/${this.form.idEvento}`)
          .then(res => {
            this.quantidadeAnexos = res.data.length;
            this.anexos = res.data; 
          })
          .catch(err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: 'Evento não possui anexos',
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
h3, h4 {
  font-weight: 300;
}
h5, h6 {
  display: inline;
  font-size: 18px;
}
</style>