<template>
  <div>
    <b-card>

      <template v-slot:header>
        <h3>Notícias</h3>
      </template>

      <div v-if="noticias.length > 0">
        <b-table
          responsive="sm"
          :items="noticias"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button
              :href="'/usuario/noticia/' + row.item.idNoticia"
              class="btn btn-sm btn-warning"
            ><i class="fa fa-eye" aria-hidden="true"></i>Visualizar</b-button>
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
        Nenhuma notícia cadastrada
        </div>
    </b-card>
  </div>
</template>

<script>


export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      noticias: [],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        { key: "petiano.pessoa.nome", sortable: true, label: "Publicado por" },
        { key: "actions", label: "Ações disponíveis"},
      ],
    };
  },
  mounted() {
    this.$axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  }
};
</script>


<style scoped>
h3 {
  text-align: center;
}
</style>