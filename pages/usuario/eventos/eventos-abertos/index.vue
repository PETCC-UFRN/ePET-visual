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
            <template v-slot:cell(inicioFimInscricoes)="row">
              {{ row.item.d_inscricao | moment }} - {{ row.item.d_inscricao | moment }} 
            </template>
            <template v-slot:cell(inicioFimEvento)="row">
              {{ row.item.d_evento_inicio | moment }} - {{ row.item.d_evento_fim | moment }} 
            </template>
            <template v-slot:cell(actions)="row">
              <nuxt-link
                  :to="`/usuario/eventos/eventos-abertos/${row.item.idEvento}`"
                  class="btn btn-sm btn-info mt-1"
                ><i class="fa fa-eye fa-fw"></i> Informações</nuxt-link>
              <b-button
                  @click.prevent="inscrever(row.item.idEvento)"
                  class="btn btn-sm btn-success mt-1"
                ><i class="fa fa-check fa-fw"></i> Inscrever-me</b-button>
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
    cancelSearch() {
      this.keyword = ''
      this.consumindoEventosApi()
    },
    search() {
      this.$axios.get(`pesquisar-evento/${this.keyword}`)
        .then( res => {
          this.eventos = res.data.content;
        })
        .catch( err => {
            if (err.response.status === 500) {
              Swal.fire({
                title: "Nenhum evento aberto",
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
      
      return  Swal.fire({
        title: 'Cadastrando inscrição',
        text: 'Para concluir a inscrição, escolha a forma de inscrição no evento.',
        input: 'select',
        inputOptions: {
          participante: 'Participante',
          organizador: 'Organizador'
        },
        inputPlaceholder: 'Forma de inscrição',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'Participante') {
              resolve()
            }
            else if (value === 'Organizador') {
              resolve()
            } else {
              resolve('Você precisa escolher umas das opções válidas apresentadas para poder finalizar a inscrição.')
            }
          })
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