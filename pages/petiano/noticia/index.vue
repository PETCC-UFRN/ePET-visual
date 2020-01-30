<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Notícias cadastradas</h3>
        
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="/petiano/noticia/create"
        >Adicionar notícia</a>
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
          <template v-slot:cell(ativo)="row">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" :checked="row.item.ativo" disabled />
            </div>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button
              :href="'/petiano/noticia/edit/' + row.item.idNoticia"
              class="btn btn-sm btn-warning"
              style="color:white"
            >Editar</b-button>
            <b-button
              @click="del(row.item.idNoticia, row.index)"
              class="btn btn-sm btn-danger"
            >Deletar</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="noticias.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Página anterior"
            next-text="Próxima página"
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
  layout: "menu/petiano",
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
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  },
  methods: {
    del(id, rowId) {
      axios.delete("noticia-remove/" + id).then(() => {
        this.noticias.splice(rowId, 1);
        alert("Noticia removido com sucesso");
      });
    },
  }
};
</script>



<style scoped>
h3 {
  text-align: center;
}
</style>