<template>
  <div>
    <div v-if="tutorias.length > 0">
      <b-card header="Tutores cadastrados">
        <!-- TODO::remover esse style -->
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="tutoria/create"
        >Adicionar Tutoria</a>
        <b-table
          responsive="sm"
          :items="tutorias"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(ativo)="row">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" :checked="row.item.ativo" disabled>
              </div>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button @click="del(row.item.idTutoria, row.index)" class="btn btn-sm btn-danger">Deletar</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="tutorias.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Prev"
            next-text="Next"
            hide-goto-end-buttons
          />
        </nav>
      </b-card>
    </div>
    <div class="row" v-else>Nenhuma Tutorias cadastrado</div>
  </div>
</template>

<script>
import axios from "~/axios";

export default {
  name: "dashboard",
  /* TODO:: Esse layout será apresentado tanto pro petiano quando pro coordenador
  depois será necessário uma lógica pra chamar o layout dependendo do tipo de usuário
  logado. No momento trabalharei apenas com os petianos. */
  layout: "menu/petiano",
  data() {
    return {
      tutorias: [],
      currentPage: 1,
      fields: [
        { key: "disciplina.nome", label:"Nome da Disciplina", sortable: true },
        { key: "disciplina.codigo", label:"Código da Disciplina", sortable: true },
        { key: "petiano.pessoa.nome", label:"Nome do Petiano", sortable: true },
        { key: "actions", sortable: true },
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