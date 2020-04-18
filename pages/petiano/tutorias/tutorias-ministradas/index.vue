<template>
  <div>
    <b-card>
        <template v-slot:header>
          <h3>Tutorias ministradas</h3>
          <nuxt-link
            class="btn btn-sm btn-primary float-right"
            style="color: white"
            to="tutorias-ministradas/create"
          ><i class="fa fa-plus" aria-hidden="true"></i> Adicionar Tutoria ministrada</nuxt-link>
        </template>

      <div v-if="tutorias_ministradas.length > 0">
        <b-table
          responsive="sm"
          :items="tutorias_ministradas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button
                :href="'/petiano/tutorias/tutorias-ministradas/' + row.item.idTutoria_ministrada"
                class="btn btn-sm btn-primary"
              ><i class="fa fa-eye" aria-hidden="true"></i>Visualizar</b-button>
            <b-button @click="del(row.item.idTutoria, row.index)" class="btn btn-sm btn-danger"
              ><i class="fa fa-trash-o fa-fw"></i> Remover</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="tutorias_ministradas.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>

      </div>
      <div v-else>Nenhuma tutoria ministrada</div>
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
      tutorias_ministradas: [],
      currentPage: 1,
      fields: [
        { key: "tutoria.disciplina.nome", label:"Nome da Disciplina", sortable: true },
        { key: "tutoria.disciplina.codigo", label:"Código da Disciplina", sortable: true },
        { key: "tutoria.petiano.pessoa.nome", label:"Nome do Petiano", sortable: true },
        { key: "actions", sortable: true, label:"Ações disponíveis" },
      ]
    };
  },
  mounted() {
    axios.get("tutorias-ministradas").then(res => {
      this.tutorias_ministradas = res.data.content;
    });
  },
  methods: {
    del(id, rowId){
      console.log(id);
      axios.delete("tutoria-remove/" + id).then(() => {
        this.tutorias_ministradas.splice(rowId, 1);
        alert('Tutoria removido com sucesso');
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