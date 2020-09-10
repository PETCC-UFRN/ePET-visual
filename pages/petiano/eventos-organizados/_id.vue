<template>
  <div class="col-md-12">
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Informações</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>
          <h5>{{form.evento.titulo}}</h5>
          <b-img v-if="form.evento.imagem !== null" center class="mt-3 mb-5" v-bind="mainProps" :src="`https://epet.imd.ufrn.br:8443/downloadfile/${imageData}`" fluid alt="Responsive image"></b-img>

          <p class="mt-3 mb-1">
            <strong>Perído de inscrições:</strong>
            <span v-if="form.evento.d_inscricao !== ''">{{ this.form.evento.d_inscricao | moment }}</span> -
            <span v-if="form.evento.d_inscricao_fim !== ''">{{ this.form.evento.d_inscricao_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Perído de realização do evento:</strong>
            <span v-if="form.evento.d_evento_inicio !== ''">{{ this.form.evento.d_evento_inicio | moment }}</span> -
            <span v-if="form.evento.d_evento_inicio !== ''">{{ this.form.evento.d_evento_fim | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Quantidade de dias de evento:</strong>
            {{form.evento.qtdDias}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Carga horária:</strong>
            {{form.evento.qtdCargaHoraria}} hora(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Total de vagas:</strong>
            {{form.evento.qtdVagas}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Valor da inscrição:</strong>
            {{new Intl
                .NumberFormat([], { style: 'currency', currency: 'BRL'})           
                .format(form.evento.valor) }}
          </p>
          <p class="mt-0 mb-1">
            <strong>Local do curso:</strong>
            {{form.evento.local}}
          </p>
          <p class="mt-3 mb-2">
            <strong>Descrição:</strong>
            {{form.evento.descricao}}
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
    <b-card header-tag="header">
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
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>    
          <p class="mt-0 mb-1" v-if="this.form.evento.inicio_rolagem !== null && this.form.evento.inicio_rolagem !== ''">
            <strong>Perído de rolagem:</strong>
            <span>{{ this.form.evento.inicio_rolagem | moment }}</span> -
            <span v-if="this.form.evento.fim_rolagem !== null && this.form.evento.fim_rolagem !== ''">{{ this.form.evento.fim_rolagem | moment}}</span>
          </p>
          <p class="mt-0 mb-1">
            <strong>Quantidade de dias de compensação:</strong>
            {{form.evento.dias_compensacao}} dia(s)
          </p>
          <p class="mt-0 mb-1">
            <strong>Há anexo para os participantes:</strong>
            <span v-if="form.evento.participante_anexos === true ">Sim.</span>
            <span v-else>Não.</span> 
          </p> 
          <p class="mt-3 mb-2">
            <strong>Texto de declaração do participante:</strong>
            {{form.evento.textoDeclaracaoEvento}}
          </p>
          <p class="mt-2 mb-1">
            <strong>Texto de declaração do organizador:</strong>
            {{form.evento.textoDeclaracaoEventoOrganizador}}
          </p>
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
      eventoTerminou: true,
      anexos: [],
      quantidadeAnexos: 0,
      imageData: "",
			mainProps: { width: 600, height: 600},
      form: {  
        evento: { 
          titulo: "", 
          descricao: "", 
          local: "", 
          imagem: null, 
          d_inscricao: "", 
          d_inscricao_fim: "", 
          d_evento_inicio: "", 
          d_evento_fim: "", 
          inicio_rolagem: "", 
          fim_rolagem: "", 
          dias_compensacao: 0, 
          percentual: 0, 
          ativo: true, 
          participante_anexos: false, 
          qtdVagas: 5, 
          qtdCargaHoraria: 2, 
          qtdDias: 5, 
          valor: 0, 
          textoDeclaracaoEvento: "", 
          textoDeclaracaoEventoOrganizador: "" 
        }, 
        data_maxima: "", 
        confirmado: true, 
        espera: false, 
        idParticipantes: 26 
      } 
    };
  },
  mounted() {
    this.$axios
      .get(`organizadores/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        this.$nuxt.$emit("changeCrumbs", this.form.evento.titulo);
        this.isLoading = false;

        if (this.form.evento.imagem != null)
          this.imageData = this.filterNameFile(this.form.evento.imagem);

        this.$axios
          .get(`anexos-evento/${this.form.evento.idEvento}`)
          .then(res => {
            this.quantidadeAnexos = res.data.length;
            this.anexos = res.data; 
          })
          .catch(err => {
            if (err.response.status === 404) {}
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
        .then(() => this.isLoading = false);
      });
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  computed: {
    disabledBotaoCertificado() {
      return !(moment(new Date().getDay()) > moment(this.d_inscricao_fim)); 
    },
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
h5 {
  font-size: 22px;
}
</style>