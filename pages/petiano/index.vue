<template>
  <div>
    <div v-if="isLoading" class="parent-lds-ellipsis">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-6">
        <span class="lead"><h1>Bem vindo!</h1></span>
      </div>
      <div class="col-md-6">
        <b-card >
          <template v-slot:header>
            <h4 class="mb-0">Notícias</h4>
          </template>
          <b-table
            responsive="sm"
            hover
            :items="resNoticias"
            :current-page="currentPage"
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-button
                :href="'/petiano/noticia/edit/' + row.item.idNoticia"
                class="btn btn-sm btn-warning"
              ><i class="fa fa-eye" aria-hidden="true"></i>
 Visualizar</b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="resNoticias.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "~/axios";
import style from "~/assets/css/loading.css";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data: function() {
    return {
      isLoading: true,
      noticias: {}, // requisicao de noticias
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        { key: "petiano.pessoa.nome", sortable: true, label: "Publicado por" },
        { key: "actions", label: "Ações disponíveis"},
      ]
    };
  },
  mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
      this.isLoading = false;
    });
  },
  computed: {
    resNoticias: function() {
      return this.noticias.filter(item => {
        return new Date(item.limite_exibicao).getTime() > Date.now() && new Date(item.inicio_exibicao).getTime() < Date.now();
      });
    }
  }
};
</script>