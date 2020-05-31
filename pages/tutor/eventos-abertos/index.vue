<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-calendar-check-o px-2"></i>Eventos abertos</h2>
          </b-col>
          <b-col>
            <nuxt-link
              class="btn btn-sm btn-primary float-right mt-4"
              to="/tutor/eventos-abertos/create"
            ><i class="fa fa-plus px-2" aria-hidden="true"></i> Adicionar evento</nuxt-link>
          </b-col>
        </b-row>
      </template>
      
      <div v-if="eventosLoading === true" class="d-flex justify-content-center mb-3">
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
            :bordered="false"
            striped   
            :per-page="20"
            :fields="fields"
          >
            <template v-slot:cell(pages)="row">
              <nuxt-link
                :to="`/tutor/eventos-abertos/organizadores/?idEvento=${row.item.idEvento}`"
                class="btn btn-sm btn-teal mt-2"
                style="color: white" 
              ><i class="fa fa-group fa-fw"></i> Organizadores</nuxt-link>
              <b-button
                :to="`/tutor/eventos-abertos/participantes/?idEvento=${row.item.idEvento}`"
                class="btn btn-sm mt-2"
                variant="secondary"
              ><i class="fa fa-group fa-fw"></i> Participantes</b-button>
            </template>
            <template  v-slot:cell(actions)="row">
              <b-button
                class="btn btn-sm btn-success mt-2"
                v-if="row.item.ativo === false"
                @click.prevent="ativar(row.item.idEvento)"
              >
                <i class="fa fa-check fa-fw"></i> Ativar
              </b-button>
              <nuxt-link
                class="btn btn-sm btn-cyan mt-2"
                :to="`/tutor/eventos-abertos/${row.item.idEvento}`"
              ><i class="fa fa-eye fa-fw"></i> Informações</nuxt-link>
              <nuxt-link
                class="btn btn-sm btn-warning mt-2"
                :to="`/tutor/eventos-abertos/edit/${row.item.idEvento}`"              
              ><i class="fa fa-pencil fa-fw"></i> Editar</nuxt-link>
              <b-button
                @click.prevent="del(row.item.idEvento, row.index)"
                class="btn btn-sm btn-danger mt-2"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>

              <b-button
                  @click.prevent="inscrever(row.item.idEvento, row.item.valor)"
                  class="btn btn-sm btn-success mt-1"
                ><i class="fa fa-check-circle fa-fw"></i> Inscrever</b-button>
            </template>
          </b-table>
          <div>
            <Pagination
              :totalRows="numItems"
              :perPage="perPage"
              v-on:currentPage="setCurrentPage"
            />
          </div>
        </div>
        <div v-else>
          <h5>Nenhum evento cadastrado</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>


import Swal from "sweetalert2";
import moment from "moment";
import Pagination from "~/components/Pagination";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  components: {
    Pagination
  },
  data() {
    return {
      eventosLoading: true,
      eventosAtivarLoading: false,
      eventosRemoverLoading: false,
      keyword: '',
      eventos: [],
      currentPage: 0,
      numItems: 0,
      perPage: 20,
      fields: [
        { key: "titulo", sortable: true, label: "Título"  },
        { key: "d_inscricao", sortable: true, label: "Início das inscrições" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "d_inscricao_fim", sortable: true, label: "Fim das inscrições" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "d_evento_inicio", sortable: true, label: "Início do evento" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "d_evento_fim", sortable: true, label: "Fim do eventos" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "pages", label: "Páginas disponíveis"  },
        { key: "actions", label: "Ações disponíveis"  }
      ]
    };
  },
  mounted () {
    this.consumindoEventosApi();
  },
  watch: {
    currentPage: function(val) {
      this.$axios.get("eventos?page=" + val).then(res => {
        this.eventos = res.data.content;
        this.numPages = res.data.totalElements;
      });
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
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhum evento cadastrado",
                icon: 'info',
              });
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
    setCurrentPage(val){
      this.currentPage = val;
    },
    consumindoEventosApi() {
      this.$axios.get("eventos")
        .then(res => {
          console.log(res.data.content.length);
          console.log(res.data.totalElements);
          this.eventos = res.data.content;
          this.eventosLoading = false;
          this.numItems = res.data.totalElements;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum evento cadastrado",
              icon: 'info',
            });
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
    del(id, rowId) {
      this.$axios.delete(`eventos-remove/${id}`)
        .then( () => {
          Swal.fire({
            title: 'Evento removido',
            icon: 'success',
          })
          .then( () => this.consumindoEventosApi() );
        })
        .catch(err => {
          if (err.response.status === 500) {
            Swal.fire({
              title: 'Evento não removido',
              text: 'Não é possível remover eventos com participantes ou organizadores, remova-os antes.',
              icon: 'error'
            })
          } 
          else {
            Swal.fire({
              title: 'Evento não removido',
              icon: 'error'
            })
          }
        });
    },
    inscrever(idEvento, valor) {
      this.$axios
        .post(`participantes-cadastrar/${idEvento}/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          if (valor > 0) {
            Swal.fire({
              title: "Inscrição realizada",
              icon: "success",
              text: "A confirmação da inscrição será mediante ao pagamento. Acesse a " +
              "página de eventos inscritos para finalizar o pagamento da inscrição."
            });
          }
          else {
            Swal.fire({
              title: "Inscrição realizada",
              icon: "success",
              text: "Sua inscrição também foi confirmada devido o evento ser gratuito." + 
              " Preste atenção às datas e aproveite o evento."
            });
          }  
        })
        .catch( err => {
          if (err.response.status === 500) {
            if (err.response.data.message === "Essa pessoa já fez sua inscrição no evento!") {
              if (valor > 0) {
                Swal.fire({
                  title: "Inscrição já foi realizada",
                  icon: 'info',
                  text: 'Verifique a situação da confirmação do pagamento da sua inscrição.' +
                  ' Para isso, acesse a página eventos inscritos.',
                });
              }
              else {
                Swal.fire({
                  title: "Inscrição já foi realizada",
                  icon: 'info',
                  text: "Sua inscrição também já foi confirmada devido o evento ser gratuito." + 
                  " Preste atenção às datas e aproveite o evento."
                });
              }
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
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            });
          }  
        });
    },
    ativar(id) {
      this.$axios.post(`eventos-ativar/${id}`)
        .then( () => {
          Swal.fire({
            title: 'Evento ativado',
            icon: 'success',
          })
          .then( () => {
            this.consumindoEventosApi();
          });
        })
        .catch( err => {
          Swal.fire({
            title: 'Evento não ativado',
            icon: 'error'
          })
        });        
    }
  }
};
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
}
</style>