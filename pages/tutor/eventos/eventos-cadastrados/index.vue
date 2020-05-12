<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-calendar-check-o px-2"></i>Eventos cadastrados</h2>
          </b-col>
          <b-col>
            <nuxt-link
              class="btn btn-sm btn-primary float-right mt-4"
              to="/tutor/eventos/eventos-cadastrados/create"
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
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(pages)="row">
              <nuxt-link
                :to="`/tutor/eventos/organizadores/?idEvento=${row.item.idEvento}`"
                class="btn btn-sm btn-teal"
                style="color: white" 
              ><i class="fa fa-group fa-fw"></i> Organizadores</nuxt-link>
              <b-button
                :to="`/tutor/eventos/participantes/?idEvento=${row.item.idEvento}`"
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
                :to="`/tutor/eventos/eventos-cadastrados/${row.item.idEvento}`"
              ><i class="fa fa-eye fa-fw"></i> Informações</nuxt-link>
              <nuxt-link
                class="btn btn-sm btn-warning mt-2"
                :to="`/tutor/eventos/eventos-cadastrados/edit/${row.item.idEvento}`"              
              ><i class="fa fa-pencil fa-fw"></i> Editar</nuxt-link>
              <b-button
                @click.prevent="del(row.item.idEvento, row.index)"
                class="btn btn-sm btn-danger mt-2"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="eventos.length"
              :per-page="10"
              pills
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhum evento cadastrado</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from "~/axios";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      eventosLoading: true,
      eventosAtivarLoading: false,
      eventosRemoverLoading: false,
      keyword: '',
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título"  },
        { key: "d_inscricao", sortable: true, label: "Início das inscrições" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "d_inscricao_fim", sortable: true, label: "Fim das inscrições" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "d_evento_inicio", sortable: true, label: "Início do evento" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "d_evento_fim", sortable: true, label: "Fim do eventos" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "pages", sortable: true, label: "Páginas disponíveis"  },
        { key: "actions", sortable: true, label: "Ações disponíveis"  }
      ]
    };
  },
  mounted () {
    this.consumindoEventosApi();
  },
  methods: {
    cancelSearch() {
      this.keyword = ''
      this.consumindoEventosApi()
    },
    search() {
      axios
        .get(`pesquisar-evento/${this.keyword}`)
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
                title: "Falha em consumir API",
                icon: 'error',
              })
              .then( () => {
                let vm = this;
                setTimeout(function() {
                  location.reload();
                }, 1500);
              });
            }  
        });
    },
    consumindoEventosApi() {
      axios
        .get("eventos")
        .then(res => {
          this.eventos = res.data.content;
          this.eventosLoading = false;
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
              title: "Falha em consumir API",
              icon: 'error',
            })
            .then( () => {
              let vm = this;
              setTimeout(function() {
                location.reload();
              }, 1500);
            });
          }  
        });
    },
    informacoes(idEvento) {
      this.$router.push(`/tutor/eventos/eventos-cadastrados/${idEvento}`);          
    },
    edit(idEvento){
      this.$router.push(`/tutor/eventos/eventos-cadastrados/edit/${idEvento}`);    
    },
    del(id, rowId) {
      axios
        .delete(`eventos-remove/${id}`)
        .then( () => {
          Swal.fire({
            title: 'Evento removido',
            icon: 'success',
          })
          .then( () => this.eventos.splice(rowId, 1) );
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
    ativar(id) {
      axios
        .post(`eventos-ativar/${id}`)
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
            title: 'Erro na ativação',
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