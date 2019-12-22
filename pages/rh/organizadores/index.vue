<template>
  <div>
    <div v-if="eventos.length > 0">
      <b-card>
        <template v-slot:header>
          Organizadores Cadastrados
          <a
            class="btn btn-sm btn-primary float-right"
            style="color: white"
            href="organizadores/create"
          >Adicionar Organizador</a>
        </template>
        <b-card-body>
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
              >Deletar</b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="eventos.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
            />
          </nav>
        </b-card-body>
      </b-card>
    </div>
    <div v-else>
      Nenhum Organizador cadastrado
      <a
        class="btn btn-sm btn-primary float-right"
        style="color: white"
        href="organizadores/create"
      >Adicionar Organizador</a>
    </div>
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
        { key: "actions", sortable: true }
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