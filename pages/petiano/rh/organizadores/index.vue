<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Organizadores Cadastrados</h3>
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="organizadores/create"
        ><i class="fa fa-plus" aria-hidden="true"></i>
 Adicionar organizador</a>
      </template>

      <b-card-body>
        <div v-if="eventos.length > 0">
          <b-table
            responsive="sm"
            :items="eventos"
            :current-page="currentPage"
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-button
                @click="del(row.item.idOrganizadores, row.index)"
                class="btn btn-sm btn-danger"
              ><i class="fa fa-trash-o fa-fw"></i> Remover</b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="eventos.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else> Nenhum organizador cadastrado</div>
      </b-card-body>
    </b-card>
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
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", label: "Nome do usuário", sortable: true },
        { key: "evento.titulo", label: "Nome do evento", sortable: true },
        { key: "actions", sortable: true, label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
    axios.get("organizadores").then(res => {
      this.eventos = res.data.content;
    });
  },
  methods: {
    del(id, rowId) {
      axios.delete("organizadores-remove/" + id).then(() => {
        this.eventos.splice(rowId, 1);
        alert("Participante removido com sucesso");
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