<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-list px-2"></i>Atividades cadastradas</h2>
          </b-col>
          <b-col>
            <nuxt-link
              class="btn btn-sm btn-primary float-right mt-4 wf-100"
              style="color: white"
              to="/tutor/outras-atividades/create"
            >
              <i class="fa fa-plus fa-fw"></i> Adicionar atividade      
            </nuxt-link>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>          
        <div v-if="atividades.length > 0">

          <b-table             
            responsive="sm"
            :items="atividades"
            :bordered="false"
            striped
            fixed   
            :per-page="pageSize"
            :fields="fields"
            
            >
            <template v-slot:cell(actions)="row">
              <nuxt-link
                :to="`/tutor/outras-atividades/${row.item.titulo}`"
                class="btn btn-sm btn-cyan mt-2"
              >
                <i class="fa fa-eye fa-fw" aria-hidden="true"></i> Detalhes
              </nuxt-link>
              <nuxt-link
                :to="`/tutor/outras-atividades/edit/${row.item.titulo}`"
                class="btn btn-sm btn-warning mt-2"
              >
                <i class="fa fa-pencil fa-fw"></i> Editar
              </nuxt-link>
              <b-button 
                @click.prevent="del(row.item.idAtividade, row.index)" 
                class="btn btn-sm btn-danger mt-2"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="numElements"
              :per-page="pageSize"
              pills
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhuma atividade cadastrada</h5>
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
      file:[],
      progressValue: 0,
      isLoading: true,
      atividades: [],
      currentPage: 1,
      numElements: 1,
      pageSize: 20,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        {
          key: "conteudo",
          sortable: true,
          label: "Conteudo"
        },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
    this.getAtividades();
  },
  watch: {
    currentPage: function(val) {
      this.$axios.get("atividades?page=" + val).then(res => {
        this.atividades = res.data;
        //this.numElements = res.data.totalElements;
        //this.pageSize = res.data.pageable.pageSize;
      });
    }
  },
  methods: {
    del(id, rowId) {
      this.$axios
        .delete("atividades-remover/" + id)
        .then(() => {
          this.atividades.splice(rowId, 1);
          Swal.fire({
            title: "Atividade removida",
            icon: "success"
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Atividade não removida",
            icon: "error"
          });
        });
    },
    setCurrentPage(val) {
      this.currentPage = val;
    },
    getAtividades() {
      this.$axios
        .get("atividades")
        .then(res => {
          this.atividades = res.data;
          //this.numElements = res.data.totalElements;
          //this.currentPage = res.data.number + 1;          
          //this.pageSize = res.data.pageable.pageSize;
          this.isLoading = false;
          for (const atividade of this.atividades) {
            if(atividade.conteudo.length > 200){
              atividade.conteudo = atividade.conteudo.substring(0,200)+"...";
            }
          }
        })        
        .catch(err => {
          if (err.response.status === 404) {}
          else if (err.response.status === 403) {
            Swal.fire({
              title: "Houve um problema...",
              text: "Verifique se possui a permissão necessária ou se a sessão foi expirada. "
              + "Caso a sessão tenha sido expirado, tente novamente.",
              icon: "error"
            })
            .then( () => this.$route.push('/login'));
          } 
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: "error"
            })
          }
          this.isLoading = false
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