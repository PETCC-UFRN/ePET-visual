<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias ministradas</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>

        <div v-if="tutorias_ministradas.length > 0">
          <b-table
            responsive="sm"
            :items="tutorias_ministradas"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="">

              <b-button
                class="btn btn-sm btn-success"
                @click.prevent="ativar()"
              >
                <i class="fa fa-check fa-fw"></i> Ativar
              </b-button>
              
            </template>
          </b-table>
          <div>
            <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage"/>
          </div>

        </div>
        <div v-else>
          <h5>Nenhuma tutoria ministrada</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
  import Swal from "sweetalert2";
  import Pagination from "~/components/Pagination";

  import moment from "moment";

  export default {
    name: "dashboard",
    layout: "menu/petiano",
    components: {
      Pagination,
    },
    data() {
      return {
        isLoading: true,
        tutorias_ministradas: [],
        currentPage: 0,
        numItems: 0,
        perPage: 20,
        fields: [
          {key: "tutoria.disciplina.codigo", label: "Código", sortable: true},
          {key: "tutoria.disciplina.nome", label: "Disciplina", sortable: true},
          {key: "data", sortable: true, label: "Data da tutoria", formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY')}  },
          {key: "tutoria.petiano.pessoa.nome", label: "Responsável", sortable: true},
          {key: "pessoa.nome", label: "Ministrado", sortable: true},
        { key: "actions", label: "Ações disponíveis"  }
          
        ]
      };
    },
    watch: {
      currentPage: function (val) {
        this.$axios.get("tutorias-ministradas?page=" + val).then(res => {
          this.noticias = res.data.content;
          this.numPages = res.data.totalElements;
        });
      }
    },
    mounted() {
      this.getTutoriasMinistradas();
    },
    methods: {
      del(id, rowId) {
        this.$axios.delete("tutoria-desativa/" + id).then(() => {
          this.tutorias_ministradas.splice(rowId, 1);
          Swal.fire({
            title: "Tutoria removida com sucesso.",
            icon: "success"
          }).catch(err => {
            Swal.fire({
              title: "Tutoria não pode ser desativada, tente novamente mais tarde.",
              icon: "error"
            });
          });
        });
      },
      getTutoriasMinistradas() {
        this.$axios
          .get("pesquisar-petiano-tutoria-ministradas")
          .then(res => {
            this.tutorias_ministradas = res.data.content;
            this.numItems = res.data.totalElements;
            this.isLoading = false;
          })
          .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhuma tutoria ministrada",
                icon: 'info',
              })
              .then( () => this.isLoading = false );
            }
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: 'error',
              })
              .then( () => this.isLoading = false );
            }
          });
      },
      setCurrentPage(val) {
        this.currentPage = val;
      },
    }
  };
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
}
</style>