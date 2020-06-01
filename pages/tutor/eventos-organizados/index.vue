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
              <nuxt-link
                  :to="`/tutor/eventos-organizados/${row.item.idOrganizadores}`"
                  class="btn btn-sm btn-info ml-2"><i class="fa fa-eye fa-fw"></i>
                Informações</nuxt-link>
              <b-button
                disabled
                class="btn btn-sm btn-success ml-2" ><i class="fa fa-check fa-fw"></i>
              Registrar presenças</b-button>
              <b-button
                @click="cadastrarPeriodo(row.item.evento)"
                class="btn btn-sm btn-success ml-2" ><i class="fa fa-check-circle fa-fw"></i>
              Definir perído do evento</b-button>
              
              <b-button
                disabled
                :to="`/tutor/eventos-organizados/periodo-evento/${row.item.evento.idEvento}`"
                class="btn btn-sm btn-warning ml-2"><i class="fa fa-pencil fa-fw"></i>
              Gerenciar período do evento</b-button>
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

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
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
            Swal.fire({
              title: "Nenhum evento organizando",
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