<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-calendar-plus-o px-2"></i>Eventos abertos</h2>
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
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(inicioFimInscricoes)="row">
              {{ row.item.d_inscricao | moment }} - {{ row.item.d_inscricao | moment }} 
            </template>
            <template v-slot:cell(inicioFimEvento)="row">
              {{ row.item.d_evento_inicio | moment }} - {{ row.item.d_evento_fim | moment }} 
            </template>
            <template v-slot:cell(actions)="row">
              <nuxt-link
                  :to="`/usuario/eventos-abertos/${row.item.idEvento}`"
                  class="btn btn-sm btn-info mt-1"
                ><i class="fa fa-eye fa-fw"></i> Informações</nuxt-link>
              <b-button
                  @click.prevent="inscrever(row.item.idEvento)"
                  class="btn btn-sm btn-success mt-1"
                ><i class="fa fa-check fa-fw"></i> Inscrever</b-button>
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
          <h5>Nenhum evento aberto</h5>
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
  layout: "menu/usuario",
  data() {
    return {
      isLoading: true,
      keyword: '',
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título"  },
        { key: "inicioFimInscricoes",  label: "Perído de inscrições" },
        { key: "inicioFimEvento",  label: "Perído do evento" },
        { key: "actions", label: "Ações disponíveis"  }
      ]
    };
  },
  mounted() {
    this.consumindoEventosApi();
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  methods: {
    consumindoEventosApi() {
      this.$axios
        .get("eventos-abertos")
        .then(res => {
          this.eventos = res.data;
          this.isLoading = false;
        })
        .catch( err => {
          if (err.response.status === 500) {
            Swal.fire({
              title: "Nenhum evento aberto",
              icon: 'info',
            })
            .then(() => this.isLoading = false );
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo, tente novamente mais tarde.",
              icon: 'error',
            })
            .then(() => this.isLoading = false );
          }  
      });

    },
    inscrever(idEvento) {
      this.$axios
        .post(`participantes-cadastrar/${idEvento}/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          Swal.fire({
            title: "Inscrição realizada",
            icon: "success"
          });
        })
        .catch( err => {
          if (err.response.status === 500) {
            if (err.response.data.message === "Essa pessoa já fez sua inscrição no evento!") {
              Swal.fire({
                title: "Inscrição já foi realizada",
                icon: 'info',
              });
            }
            else {
              Swal.fire({
                title: "Inscrição não realizada",
                icon: 'error',
              });
            }  
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo, tente novamente mais tarde.",
              icon: 'error',
            });
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