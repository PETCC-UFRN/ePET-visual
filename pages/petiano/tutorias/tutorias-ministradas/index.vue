<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Tutorias ministradas</h3>
        <nuxt-link
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          to="tutorias-ministradas/create"
        ><i class="fa fa-plus" aria-hidden="true"></i> Adicionar Tutoria ministrada
        </nuxt-link>
      </template>

      <div v-if="tutorias_ministradas.length > 0">
        <b-table
          responsive="sm"
          :items="tutorias_ministradas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button
              :href="'/petiano/tutorias/tutorias-ministradas/' + row.item.idTutoria_ministrada"
              variant="outline-warning"
            ><i class="fa fa-eye" aria-hidden="true"></i> Visualizar
            </b-button>
            <b-button @click="del(row.item.idTutoria_ministrada, row.index)"
                      variant="outline-danger"
            ><i class="fa fa-trash-o fa-fw"></i> Remover
            </b-button>
          </template>
        </b-table>
        <div>
          <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage"/>
        </div>

      </div>
      <div v-else>Nenhuma tutoria ministrada</div>
    </b-card>
  </div>
</template>

<script>
  import Swal from "sweetalert2";
  import Pagination from "~/components/Pagination";

  export default {
    name: "dashboard",
    layout: "menu/petiano",
    components: {
      Pagination,
    },
    data() {
      return {
        tutorias_ministradas: [],
        currentPage: 0,
        numItems: 0,
        perPage: 20,
        fields: [
          {key: "tutoria.disciplina.nome", label: "Nome da Disciplina", sortable: true},
          {key: "tutoria.disciplina.codigo", label: "Código da Disciplina", sortable: true},
          {key: "tutoria.petiano.pessoa.nome", label: "Nome do Petiano", sortable: true},
          {key: "actions", sortable: true, label: "Ações disponíveis"},
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
        this.$axios.get("tutorias-ministradas").then(res => {
          this.tutorias_ministradas = res.data.content;
          this.numItems = res.data.totalElements;
        });
      },
      setCurrentPage(val) {
        this.currentPage = val;
      },
    }
  };
</script>


<style scoped>
  h3 {
    text-align: center;
  }
</style>
