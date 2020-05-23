<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Notícias cadastradas</h3>
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="/tutor/noticia/create"
        >
          <i class="fa fa-plus" aria-hidden="true"></i> Adicionar notícia
        </a>
      </template>
      <b-input-group class="mt-1 mb-3">
        <b-form-input
          v-model="keyword"
          placeholder="Busca por nome ou por código"
          type="text"
          v-on:keyup.enter="search"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="success" @click="search">
            <i class="fa fa-search"></i>
          </b-button>
          <b-button variant="outline-danger" @click="getNoticias">
            <i class="fa fa-remove"></i>
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <div v-if="noticias.length > 0">
        <b-table responsive="sm" :items="noticias" :bordered="true" :fields="fields">
          <template v-slot:cell(ativo)="row">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" :checked="row.item.ativo" disabled />
            </div>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button
              :href="'/tutor/noticia/visualize/' + row.item.idNoticia"
              class="btn btn-sm btn-primary"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
              Visualizar
            </b-button>
            <b-button
              :href="'/tutor/noticia/edit/' + row.item.idNoticia"
              class="btn btn-sm btn-warning"
            >
              <i class="fa fa-pencil fa-fw"></i> Editar
            </b-button>
            <b-button @click="del(row.item.idNoticia, row.index)" class="btn btn-sm btn-danger">
              <i class="fa fa-trash-o fa-fw"></i> Remover
            </b-button>
          </template>
        </b-table>
        <div>
          <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage" />
        </div>
      </div>
      <div v-else>Nenhuma notícia cadastrada</div>
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
          label: "Início de exibição",
          formatter: value => {
            if (value != null) return moment(value).format("DD/MM/Y");
          }
        },
        { key: "petiano.pessoa.nome", sortable: true, label: "Publicado por" },
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
      this.$axios.delete("noticia-remove/" + id)
        .then(() => {
          this.noticias.splice(rowId, 1);
          Swal.fire({
            title: "Noticia removida com sucesso",
            icon: "success"
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Remoção não realizada",
            icon: "error"
          });
        });
    },
    setCurrentPage(val) {
      this.currentPage = val;
    },
    getNoticias() {
      this.$axios.get("noticia").then(res => {
        this.noticias = res.data.content;
        this.numItems = res.data.totalElements;
      });
    },
    search() {
      this.$axios.get("pesquisar-noticia/" + this.keyword).then(res => {
        this.noticias = res.data.content;
        this.numItems = res.data.totalElements;
      });
    }
  }
};
</script>



<style scoped>
h3 {
  text-align: center;
}
</style>