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
          
          <b-input-group  class="mt-3 mb-3" >
            <b-form-input
              v-model="keyword"
              placeholder="Busca por título"            
              type="text"
            ></b-form-input>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="search"><i class="fa fa-search"></i></b-btn>
            </b-input-group-text>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="cancelSearch"><i class="fa fa-remove"></i></b-btn>
            </b-input-group-text>
          </b-input-group>

          <b-table
            responsive="sm"
            :items="eventos"
            :current-page="currentPage"
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <nuxt-link
                  :to="`/usuario/eventos/eventos-cadastrados/${row.item.evento.idEvento}`"
                  class="btn btn-sm btn-info"
                ><i class="fa fa-eye" aria-hidden="true"></i>
                Informações</nuxt-link>
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
      isLoading: true,
      keyword: '',
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "evento.titulo", sortable: true, label: "Título"  },
        { key: "evento.d_inscricao", sortable: true, label: "Início das inscrições" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "evento.d_inscricao_fim", sortable: true, label: "Fim das inscrições" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "evento.d_evento_inicio", sortable: true, label: "Início do evento" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "evento.d_evento_fim", sortable: true, label: "Fim do eventos" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "actions", sortable: true, label: "Ações disponíveis"  }
      ]
    };
  },
  mounted() {
    this.consumindoEventosOrganizandoApi();
  },
  methods: {
    cancelSearch() {
      this.keyword = ''
      this.consumindoEventosOrganizandoApi()
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
                text: "Por favor, tente recarregar a página. Caso não dê certo, tente novamente mais tarde.",
                icon: 'error',
              })
            }  
        });
    },
    consumindoEventosOrganizandoApi() {
      this.$axios
        .get(`organizadores-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.eventos = res.data;
          this.isLoading = false;
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
              text: "Por favor, tente recarregar a página. Caso não dê certo, tente novamente mais tarde.",
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