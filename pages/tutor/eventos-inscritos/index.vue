<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-calendar-check-o px-2"></i>Eventos inscritos</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="eventos.length > 0">  
          
          <b-table
            responsive="sm"
            :items="eventos"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">

              <b-button :disabled="disabledBotaoCertificado(row.item.evento)"
                  @click.prevent="gerarCertificado(row.item)"
                class="btn btn-sm btn-success mt-1"
              >
                <i class="fa fa-certificate fa-fw"></i> Declaração de conclusão
              </b-button>

              <nuxt-link
                  :to="`/tutor/eventos-inscritos/${row.item.idParticipantes}`"
                  class="btn btn-sm btn-info mt-1"
                ><i class="fa fa-info-circle fa-fw" aria-hidden="true"></i>
                Detalhes</nuxt-link>
                <nuxt-link
                :to="`/tutor/eventos-inscritos/meus-anexos/${row.item.idParticipantes}`"
                class="btn btn-sm btn-indigo mt-1"
                  v-if="row.item.evento.participante_anexos == true"
              >
                <i class="fa fa-files-o fa-fw" ></i> Meus anexos
              </nuxt-link>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="eventos.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhum evento inscrito</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      isLoading: true,
      keyword: '',
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "evento.titulo", sortable: true, label: "Título"  },
        { key: "actions", label: "Ações disponíveis"  }
      ]
    };
  },
  mounted() {
    this.consumindoEventosParticipandoApi();
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  methods: {
    disabledBotaoCertificado(evento) {
      if (evento.d_evento_fim == null)
        return true;  

      return !(moment().isAfter(moment(evento.d_evento_fim)));
    },
    cancelSearch() {
      this.keyword = ''
      this.consumindoEventosParticipandoApi()
    },
    search() {
      this.$axios.get(`pesquisar-evento/${this.keyword}`)
        .then( res => {
          this.eventos = res.data.content;
        })
        .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhum evento organizando",
                icon: 'info',
              })
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
    gerarCertificado(item) {
      let idPessoa = item.pessoa.idPessoa;
      let idEvento = item.evento.idEvento;
      this.$axios.get(
        `certificado/gerar/${idPessoa}/${idEvento}`,
        {responseType: 'arraybuffer'}
      )
      .then(res => {
        let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: 'application/*'}));
        let fileLink = document.createElement('a');
        let nomeAnexoCorrigido = 'certificado';
      })
      .catch(err => {
        this.$axios
          .get(`certificado/gerar/${idPessoa}/${idEvento}`)
          .catch(err => {
            Swal.fire({
              title: "Certificado não gerado",
              icon: "error",
              text: err.response.data.detalhes
            });
          });
      });
    },
    consumindoEventosParticipandoApi() {
      this.$axios
        .get(`participantes-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.eventos = res.data.content;
          this.isLoading = false;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum evento participando",
              icon: 'info',
            })
            .then(() => this.isLoading = false );
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
            .then(() => this.isLoading = false );
          }  
      });

    }
  }
};
</script>

<style scoped>
h2, h4, h5 {
  font-weight: 300;
}
</style>