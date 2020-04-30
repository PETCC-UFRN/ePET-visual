<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3><i class="fa fa-calendar-check-o px-2"></i>Eventos cadastrados</h3>
          </b-col>
          <b-col>
            <b-button
              class="btn btn-sm btn-primary float-right mt-4"
              variant="primary"
              @click.prevent="novoEvento()"
            ><i class="fa fa-plus px-2" aria-hidden="true"></i> Adicionar evento</b-button>
          </b-col>
        </b-row>
      </template>
      <div v-if="eventos.length > 0">
          
       <b-input-group  class="mt-3 mb-3" >
          <b-form-input
            v-model="keyword"
            placeholder="Busca por título"            
            type="text"
          ></b-form-input>
          <b-input-group-text slot="append">
            <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
        </b-input-group-text>
        </b-input-group>

        <b-table
          responsive="sm"
          :items="items"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(ativo)="row">
            <b-form-checkbox
                size="lg"
                v-model="row.item.ativo"
                disabled
              ></b-form-checkbox>
          </template>
          <template v-slot:cell(pages)="row">
            <b-button
              @click="goToOrganizadores(row.item.idEvento)"
              class="btn btn-sm"
              style="color: white"  
              variant="teal"
            ><i class="fa fa-group fa-fw"></i> Organizadores</b-button>
            <b-button
              @click="goToParticipantes(row.item.idEvento)"
              class="btn btn-sm mt-2"
              variant="secondary"
            ><i class="fa fa-group fa-fw"></i> Participantes</b-button>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button
              class="btn btn-sm btn-success mt-2"
              v-if="row.item.ativo === false"
              @click.prevent="ativar(row.item.idEvento)"
            ><i class="fa fa-check fa-fw"></i> Ativar</b-button>
            <b-button
              class="btn btn-sm btn-cyan mt-2"
              @click.prevent="informacoes(row.item.idEvento)"
            ><i class="fa fa-eye fa-fw"></i> Informações</b-button>
            <b-button
              class="btn btn-sm btn-warning mt-2"
              @click.prevent="edit(row.item.idEvento)"
            ><i class="fa fa-pencil fa-fw"></i> Editar</b-button>
            <b-button
              @click.prevent="del(row.item.idEvento, row.index)"
              class="btn btn-sm btn-danger mt-2"
            ><i class="fa fa-trash-o fa-fw"></i> Remover</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="items.length"
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
    </b-card>
  </div>
</template>

<script>

import axios from "~/axios";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      keyword: '',
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título"  },
        { key: "d_inscricao", sortable: true, label: "Início das inscrições" , formatter: (value) => { if (value != null) return new Intl.DateTimeFormat('pt-BR').format(new Date(value))} },
        { key: "d_inscricao_fim", sortable: true, label: "Fim das inscrições" , formatter: (value) => { if (value != null) return new Intl.DateTimeFormat('pt-BR').format(new Date(value))} },
        { key: "ativo", sortable: true, label: "Ativo"  },
        { key: "pages", sortable: true, label: "Páginas disponíveis"  },
        { key: "actions", sortable: true, label: "Ações disponíveis"  }
      ]
    };
  },
  computed: {
    items () {
      return this.keyword
          ? this.eventos.filter(item => item.titulo.includes(this.keyword) || item.local.includes(this.keyword))
          : this.eventos
    }
  },
  mounted () {
    this.consumindoEventosApi();
  },
  methods: {
    consumindoEventosApi() {
      axios
        .get("eventos")
        .then(res => {
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
    goToParticipantes(idEvento) {
      this.$router.push({path: "/tutor/eventos/participantes/", query: {idEvento: idEvento}});
    },
    goToOrganizadores(idEvento) {
      this.$router.push({path: "/tutor/eventos/organizadores/", query: {idEvento: idEvento}});
    },
    informacoes(idEvento) {
      this.$router.push(`/tutor/eventos/eventos-cadastrados/${idEvento}`);          
    },
    edit(idEvento){
      this.$router.push(`/tutor/eventos/eventos-cadastrados/edit/${idEvento}`);    
    },
    novoEvento(){
      this.$router.push("/tutor/eventos/eventos-cadastrados/create");
    },
    del(id, rowId) {
      axios
        .delete(`eventos-remove/${id}`)
        .then( () => {
          Swal.fire({
            title: 'Evento removido',
            icon: 'success',
          })
          .then( () => {
            this.eventos.splice(rowId, 1);
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Evento não removido',
            icon: 'error'
          })
        });
    },
    ativar(id) {
      e.preventDefault();
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
