<template>
  <div>
    <b-card>
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
              class="btn btn-sm btn-primary"
              style="color:white"
            >Ver</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="noticias.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Prev"
            next-text="Next"
            hide-goto-end-buttons
          />
        </nav>
      </div>
      <div v-else>Nenhuma noticia cadastrada</div>
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      noticias: [],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true },
        { key: "petiano.pessoa.nome", sortable: true, label: "Publicado por" },
        { key: "actions"},
      ],
    };
  },
  mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  }
};
</script>