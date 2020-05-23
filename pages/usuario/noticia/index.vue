<template>
  <div>
    <b-card>

      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-newspaper-o px-2"></i>Notícias</h2>
          </b-col>
        </b-row>                
      </template>


      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
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
            :current-page="currentPage"
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <nuxt-link
                  :to="`/usuario/noticia/${row.item.idNoticia}`"
                  class="btn btn-sm btn-info"
                >
                  <i class="fa fa-eye fa-fw" aria-hidden="true"></i> Informações
              </nuxt-link>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="noticias.length"
              :per-page="10"
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
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      isLoading: true,
      noticias: [],
      keyword: "",
      currentPage: 1,
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
          label: "Início de exibição",
          formatter: value => {
            if (value != null) return moment(value).format("DD/MM/Y");
          }
        },
        { key: "actions", label: "Ações disponíveis"},
      ],
    };
  },
  mounted() {
    this.getNoticias();
  },
  methods: {
    getNoticias() {
      this.$axios
      .get("noticia").then(res => {
        this.noticias = res.data.content;
        this.isLoading = false;
      })
      .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhuma notícia cadastrada",
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
            Swal.fire({
              title: "Nenhuma notícia encontrada",
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
    }
  }
};
</script>



<style scoped>
h2, h4 {
  font-weight: 300;
}
</style>