<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-newspaper-o px-2"></i>Notícias cadastradas</h2>
          </b-col>
          <b-col>
            <nuxt-link
              class="btn btn-sm btn-primary float-right mt-4 wf-100"
              style="color: white"
              to="/tutor/noticias/create"
            >
              <i class="fa fa-plus fa-fw"></i> Adicionar notícia      
            </nuxt-link>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>          
        <div v-if="noticias.length > 0">
          <b-input-group class="mt-1 mb-3">
            <b-form-input
              v-model="keyword"
              placeholder="Busca por título"
              type="text"
              v-on:keyup.enter="search"
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
            :items="noticias" 
            :bordered="false"
            striped   
            :fields="fields">
            <template v-slot:cell(actions)="row">
                     
              <nuxt-link
                :to="`/tutor/noticias/gerenciar-anexos/${row.item.idNoticia}`"
                class="btn btn-sm btn-indigo mt-2"
              >
                <i class="fa fa-files-o fa-fw" ></i> Gerenciar anexos
              </nuxt-link>
              <nuxt-link
                :to="`/tutor/noticias/${row.item.idNoticia}`"
                class="btn btn-sm btn-cyan mt-2"
              >
                <i class="fa fa-eye fa-fw" aria-hidden="true"></i> Detalhes
              </nuxt-link>
              <nuxt-link
                :to="`/tutor/noticias/edit/${row.item.idNoticia}`"
                class="btn btn-sm btn-warning mt-2"
              >
                <i class="fa fa-pencil fa-fw"></i> Editar
              </nuxt-link>
              <b-button 
                @click.prevent="del(row.item.idNoticia, row.index)" 
                class="btn btn-sm btn-danger mt-2"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>
            </template>

          </b-table>
          <div>
            <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage" />
          </div>
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
      isLoading: true,
      keyword: "",
      noticias: [],
      currentPage: 0,
      numItems: 0,
      perPage: 20,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        {
          key: "inicio_exibicao",
          sortable: true,
          label: "Início de exibição",
          formatter: value => {
            if (value != null) return moment(value).format("DD/MM/Y");
          }
        },
        {
          key: "limite_exibicao",
          sortable: true,
          label: "Fim de exibição",
          formatter: value => {
            if (value != null) return moment(value).format("DD/MM/Y");
          }
        },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
    this.getNoticias();
  },
  watch: {
    currentPage: function(val) {
      this.$axios.get("noticia?page=" + val).then(res => {
        this.noticias = res.data.content;
        this.numPages = res.data.totalElements;
      });
    }
  },
  methods: {
    del(id, rowId) {
      this.$axios
        .delete("noticia-remove/" + id)
        .then(() => {
          this.noticias.splice(rowId, 1);
          Swal.fire({
            title: "Notícia removida",
            icon: "success"
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Notícia não removida",
            icon: "error"
          });
        });
    },
    setCurrentPage(val) {
      this.currentPage = val;
    },
    getNoticias() {
      this.$axios
        .get("noticia")
        .then(res => {
          this.noticias = res.data.content;
          this.numItems = res.data.totalElements;
          this.isLoading = false;
        })
        .catch( err => {
          if (err.response.status === 404) {
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
          }
          this.isLoading = false;
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
        .catch( err => {
          if (err.response.status === 404) {
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
    }
  }
};
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
}
</style>