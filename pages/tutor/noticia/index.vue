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
      <div v-if="noticias.length > 0">
        <b-input-group class="mt-1 mb-3">
          <!-- Always bind the id to the input so that it can be focused when needed -->
          <b-form-input v-model="keyword" placeholder="Busca" type="text"></b-form-input>
          <b-input-group-text slot="append">
            <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''">
              <i class="fa fa-remove"></i>
            </b-btn>
          </b-input-group-text>
        </b-input-group>

        <b-table
          responsive="sm"
          :items="items"
          :current-page="currentPage"
          :bordered="true"
          :per-page="perPage"
          :fields="fields"
        >
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
import axios from "~/axios";
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
            if (value != null)
              return `${value.substring(8, 10)}-${value.substring(
                5,
                7
              )}-${value.substring(0, 4)}`;
          }
        },
        {
          key: "limite_exibicao",
          sortable: true,
          label: "Início de exibição",
          formatter: value => {
            if (value != null)
              return `${value.substring(8, 10)}-${value.substring(
                5,
                7
              )}-${value.substring(0, 4)}`;
          }
        },
        { key: "petiano.pessoa.nome", sortable: true, label: "Publicado por" },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  computed: {
    items() {
      return this.keyword
        ? this.noticias.filter(
            item =>
              item.titulo.includes(this.keyword) ||
              item.petiano.pessoa.nome.includes(this.keyword)
          )
        : this.noticias;
    }
  },
  watch: {
    currentPage: function(val) {
      axios.get("noticia?page=" + val).then(res => {
        this.disciplinas = res.data.content;
        this.numPages = res.data.totalElements;
      });
    }
  },
  mounted() {
    this.getNoticias();
    this.$on("currentPage");
  },
  methods: {
    del(id, rowId) {
      axios.delete("noticia-remove/" + id).then(() => {
        this.noticias.splice(rowId, 1);
        alert("Noticia removido com sucesso");
      });
    },
    getNoticias() {
      axios.get("noticia").then(res => {
        this.noticias = res.data.content;
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