<template>
  <div>
    <div v-if="eventos.length > 0">
      <b-card header="Eventos cadastrados">
        <!-- TODO::remover esse style -->
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="eventos/create"
        >Adicionar evento</a>
        <b-table
          responsive="sm"
          :items="eventos"
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
            <b-button @click="ativar(row.item.idEvento)" class="btn btn-sm btn-success" v-show="! row.item.ativo">Ativar</b-button>
            <b-button @click="del(row.item.idEvento, row.index)" class="btn btn-sm btn-danger">Deletar</b-button>
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
      </b-card>
    </div>
    <div class="row" v-else>Nenhum evento cadastrado</div>
  </div>
</template>

<script>
import axios from "../../axios";

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
        { key: "titulo", sortable: true },
        { key: "local", sortable: true },
        { key: "d_inscricao", sortable: true },
        { key: "qtdVagas", sortable: true },
        { key: "ativo", sortable: true },
        { key: "actions", sortable: true },
      ]
    };
  },
  mounted() {
    axios.get("eventos").then(res => {
      this.eventos = res.data.content;
    });
  },
  methods: {
    del(id, rowId){
      axios.delete("eventos-remove/" + id).then(() => {
        this.eventos.splice(rowId, 1);
        alert('Evento removido com sucesso');
      });
    },
    ativar(id){
      axios.post("eventos-ativar/" + id).then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert('Evento ativado com sucesso');
        let vm = this;
        setTimeout(function(){
          location.reload()
        }, 1500)
      });
    }
  }
};
</script>