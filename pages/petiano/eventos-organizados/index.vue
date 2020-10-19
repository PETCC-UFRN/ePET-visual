<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-calendar-check-o px-2"></i>Eventos organizados</h2>
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
              <b-button :disabled="disabledBotaoCertificado"
                  @click.prevent="gerarCertificado(row.item)"
                class="btn btn-sm btn-success mt-2"
              >
                <i class="fa fa-certificate fa-fw"></i> Declaração de conclusão
              </b-button>

              <nuxt-link
                :to="`/petiano/eventos-organizados/gerenciar-anexos/${row.item.evento.idEvento}`"
                class="btn btn-sm btn-indigo mt-2"
              >
                <i class="fa fa-files-o fa-fw" ></i> Gerenciar anexos
              </nuxt-link>
              

              <nuxt-link
                :to="`/petiano/eventos-organizados/organizadores/?idEvento=${row.item.evento.idEvento}`"
                class="btn btn-sm btn-teal mt-1"
                style="color: white"
              ><i class="fa fa-group fa-fw"></i> Organizadores</nuxt-link>
              <b-button
                :to="`/petiano/eventos-organizados/participantes/?idEvento=${row.item.evento.idEvento}`"
                class="btn btn-sm mt-1"
                variant="secondary"
              ><i class="fa fa-group fa-fw"></i> Participantes</b-button>
              <nuxt-link
                  :to="`/petiano/eventos-organizados/${row.item.idOrganizadores}`"
                  class="btn btn-sm btn-info mt-1"><i class="fa fa-eye fa-fw"></i>
                Detalhes</nuxt-link>
              <nuxt-link
                class="btn btn-sm btn-warning mt-1"
                :to="`/petiano/eventos-organizados/edit/${row.item.evento.idEvento}`"
              ><i class="fa fa-pencil fa-fw"></i> Editar</nuxt-link>
              <b-button
                @click.prevent="del(row.item.idEvento, row.index)"
                class="btn btn-sm btn-danger mt-1"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>
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
          <h5>Nenhum evento organizado</h5>
        </div>
      </div>
    </b-card>

    <b-modal v-model="modalShow" title="Informações adicionais" hide-footer no-close-on-backdrop>
      <label for="data-ingresso">Perído do evento</label>
      <b-form-datepicker
        id="data-ingresso"
        v-model="form.periodoEvento"
        type="date"
        required
        locale="pt-br"
        label-no-date-selected="Nenhuma data selecionada"
      ></b-form-datepicker>
      <b-button variant="primary" class="w-100 mt-2">OK</b-button>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";


export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      file:[],
      progressValue: 0,
      isLoading: true,
      eventos: [],
      eventoPeriodo: [],
      currentPage: 1,
      periodoDefinido: false,
      form: {
        periodoEvento: '',
        evento: {
          idEvento: 0,
        }
      },
      fields: [
        { key: "evento.titulo", sortable: true, label: "Título"  },
        { key: "actions", label: "Ações disponíveis"  }
      ],
      modalShow: false
    };
  },
  mounted() {
    this.consumindoEventosOrganizandoApi();
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  computed: {
    disabledBotaoCertificado() {
      return (moment().isAfter(moment(this.d_inscricao_fim)));
    },
  },

  methods: {
    cadastrar() {
      this.$axios
        .post(`periodo-evento-cadastrar/${this.form.evento.idEvento}`, this.form)
        .then(res => {
          Swal.fire({
            title: "Perído do evento cadastrado",
            icon: 'success',
          })
        })
        .catch( err => {
          Swal.fire({
            title: "Perído do evento não cadastrado",
            icon: 'error',
          })
        });
    },
    cadastrarPeriodo(evento) {
      this.modalShow = !this.modalShow
      this.form.evento = evento

      if (this.form.periodoEvento !== "") {
        this.form.evento =  evento
      }
    },
    consumirPeriodoEventoApi(idEvento){
      this.$axios
        .get(`periodo-evento-buscar/${idEvento}`)
        .then(res => {
          this.form.periodoEvento = res.data;
          this.periodoDefinido = true;
        })
        .catch(() =>  {
          this.periodoDefinido = false;
        })
    },
    gerarCertificado(item) {
      let idPessoa = item.pessoa.idPessoa;
      let idEvento = item.evento.idEvento;
      this.$axios.get(
        `certificado/gerarOrganizador/${idPessoa}/${idEvento}`,
        {responseType: 'arraybuffer'}
      ).then(res => {
        let fileURL = window.URL.createObjectURL(new Blob([res.data], {type: 'application/*'}));
        let fileLink = document.createElement('a');
        let nomeAnexoCorrigido = 'certificado';

        fileLink.href = fileURL;
        fileLink.setAttribute('download', nomeAnexoCorrigido);
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch(err => {
        this.$axios
          .get(`certificado/gerarOrganizador/${idPessoa}/${idEvento}`)
          .catch(err => {
            Swal.fire({
              title: "Declaração não gerada",
              icon: "error",
              text: err.response.data.detalhes
            });
          });
      });
    },
    consumindoEventosOrganizandoApi() {
      this.$axios
        .get(`organizadores-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.eventos = res.data;
          this.isLoading = false;
          this.eventoPeriodos = res
        })
        .catch( err => {
          if (err.response.status === 404) {
            this.isLoading = false ;
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
