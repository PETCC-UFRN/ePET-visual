<template>
  <div>
    <b-card>
      <template v-slot:header>
        Participantes cadastrados
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="participantes/create"
        >Adicionar Participante</a>
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
                @click="confirmar(row.item.idParticipantes)"
                class="btn btn-sm btn-success"
                v-show="! row.item.ativo"
              >Confirmar</b-button>
              <b-button
                @click="del(row.item.idParticipantes, row.index)"
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
        </div>
        <div v-else>Nenhum Participante cadastrado</div>
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
        { key: "confirmado", sortable: true },
        { key: "espera", sortable: true },
        //{ key: "ativo", sortable: true },
        { key: "actions", sortable: true }
      ]
    };
  },
  mounted() {
    axios.get("participantes").then(res => {
      this.eventos = res.data.content;
    });
  },
  methods: {
    del(id, rowId) {
      console.log(id);
      axios.delete("participantes-remove/" + id).then(() => {
        this.eventos.splice(rowId, 1);
        alert("Participante removido com sucesso");
      });
    },
    confirmar(id) {
      axios.post("participantes-confirmar/" + id).then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert("Participante ativado com sucesso");
        let vm = this;
        setTimeout(function() {
          location.reload();
        }, 1500);
      });
    }
  }
};
</script>