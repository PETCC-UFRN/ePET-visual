<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Notícias cadastradas</h3>
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="/petiano/noticia/create"
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
              :href="'/petiano/noticia/visualize/' + row.item.idNoticia"
              class="btn btn-sm btn-primary"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
              Visualizar
            </b-button>
            <b-button
              :href="'/petiano/noticia/edit/' + row.item.idNoticia"
              class="btn btn-sm btn-warning"
            >
              <i class="fa fa-pencil fa-fw"></i> Editar
            </b-button>
            <b-button @click="del(row.item.idNoticia, row.index)" class="btn btn-sm btn-danger">
              <i class="fa fa-trash-o fa-fw"></i> Remover
            </b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="items.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>
      </div>
      <div v-else>Nenhuma notícia cadastrada</div>
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      keyword: "",
      noticias: [],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        {
          key: "inicio_exibicao",
          sortable: true,
          label: "Início de exibição",
          formatter: value => {
            if (value != null)
              return moment(value).format('DD/MM/Y');
          }
        },
        {
          key: "limite_exibicao",
          sortable: true,
          label: "Início de exibição",
          formatter: value => {
            if (value != null)
              return moment(value).format('DD/MM/Y');
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
  mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  },
  methods: {
    del(id, rowId) {
      axios
        .delete("noticia-remove/" + id)
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
          icon: "error",
        });
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