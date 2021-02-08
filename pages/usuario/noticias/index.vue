<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2>
              <i class="fa fa-newspaper-o px-2"></i>Notícias
            </h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner
          style="width: 3rem; height: 3rem;"
          type="grow"
          variant="primary"
          label="Large Spinner"
        ></b-spinner>
      </div>
      <div v-else>
        <div v-if="noticias.length > 0">
          
          <b-table
            responsive="sm"
            :items="noticias"
            :bordered="false"
            striped   
            :per-page="pageSize"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <nuxt-link
                :to="`/usuario/noticias/${row.item.idNoticia}`"
                class="btn btn-sm btn-info"
              >
                <i class="fa fa-eye fa-fw" aria-hidden="true"></i> Detalhes
              </nuxt-link>
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
          <h5>Nenhuma notícia cadastrada</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      isLoading: true,
      noticias: [],
      keyword: "",
      currentPage: 1,
      numElements: 1,
      pageSize: 20,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
    this.getNoticias();
  },
  watch: {
    currentPage: function(val) {
      this.$axios.get("noticia?page=" + (val-1)).then(res => {
        this.noticias = res.data.content;
        this.numElements = res.data.totalElements;
        this.pageSize = res.data.pageable.pageSize;
      });
    }
  },
  methods: {
    setCurrentPage(val) {
      this.currentPage = val;
    },
    getNoticias() {
      this.$axios
        .get("noticias-atuais")
        .then(res => {
          this.noticias = res.data.content;
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
          this.isLoading = false;
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.isLoading = false;
          } 
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
              text:
                "Por favor, tente recarregar a página. Caso não dê certo, tente novamente mais tarde.",
              icon: "error"
            }).then(() => (this.isLoading = false));
          }
        });
    },
    cancelSearch() {
      this.getNoticias();
      this.keyword = "";
    },
    search() {
      this.$axios
        .get(`pesquisar-noticia/${this.keyword}`)
        .then(res => {
          this.noticias = res.data.content;
          this.numItems = res.data.totalElements;
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhuma notícia encontrada",
              icon: "info"
            });
          } else {
            Swal.fire({
              title: "Houve um problema...",
              text:
                "Por favor, tente recarregar a página. Caso não dê certo, tente novamente mais tarde.",
              icon: "error"
            });
          }
        });
    }
  }
};
</script>



<style scoped>
h2,
h4,
h5 {
  font-weight: 300;
}
</style>