<template>
  <div>
    <b-card>
        <template v-slot:header>
          <h3>Quadro de tutorias</h3>
          <nuxt-link
            class="btn btn-sm btn-primary float-right"
            style="color: white"
            to="quadro-de-tutoria/create"
          ><i class="fa fa-plus" aria-hidden="true"></i> Adicionar Tutoria</nuxt-link>
        </template>
        <!-- TODO::remover esse style -->

      <div v-if="tutorias.length > 0">
        <b-table
          responsive="sm"
          :items="tutorias"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button @click.prevent="del(row.item.idTutoria, row.index)" class="btn btn-sm btn-danger"><i class="fa fa-trash-o fa-fw"></i> Remover</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="tutorias.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>

      </div>
      <div v-else>Nenhuma tutoria cadastrada</div>
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
      tutorias: [],
      currentPage: 1,
      fields: [
        { key: "disciplina.nome", label:"Nome da Disciplina", sortable: true },
        { key: "disciplina.codigo", label:"Código da Disciplina", sortable: true },
        { key: "petiano.pessoa.nome", label:"Nome do Petiano", sortable: true },
        { key: "actions", sortable: true, label:"Ações disponíveis" },
      ]
    };
  },
  mounted() {
    axios.get("tutorias").then(res => {
      this.tutorias = res.data.content;
    });
  },
  methods: {
    del(id, rowId){
      console.log(id);
      axios.delete("tutoria-remove/" + id).then(() => {
        this.tutorias.splice(rowId, 1);
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