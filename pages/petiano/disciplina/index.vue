<template>
  <div>
    <div v-if="disciplinas.length > 0">
      <b-card>

        <template v-slot:header>
          <h3>Disciplinas cadastradas</h3>
            <a
              class="btn btn-sm btn-primary float-right"
              style="color: white"
              href="disciplina/create"
            >Adicionar Disciplina</a>
        </template>

        <!-- TODO::remover esse style -->

        <b-table
          responsive="sm"
          :items="disciplinas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button @click="editar(row.item.idDisciplina, row.item.nome, row.item.codigo)" class="btn btn-sm btn-warning">Editar</b-button>
            <!--<a
              class="btn btn-sm btn-primary"
              style="color: white"
              href='disciplina/edit/${row.item.id_disciplina}'
            >Editar {{row.item.id_disciplina}}</a>-->
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="disciplinas.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior "
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>
      </b-card>
    </div>
    <div class="row" v-else>Nenhuma disciplina cadastrada</div>
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
      disciplinas: [],
      currentPage: 1,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true },
        { key: "actions", sortable: true, label: "Ações disponíveis" },
      ]
    };
  },
  mounted() {
    axios.get("disciplinas").then(res => {
      this.disciplinas = res.data;
    });
  },
  methods: {
    editar(id, nome, codigo){
      this.$router.push(
        {
          path: 'edit/',
          query  : {"id": id,
                    "nome": nome,
                    "codigo":codigo}
        }
      )
    }
  }
  /*methods: {
    del(id, rowId){
      axios.delete("eventos-remove/" + id).then(() => {
        this.disciplinas.splice(rowId, 1);
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
  }*/
};
</script>


<style scoped>
h3 {
  text-align: center;
}
</style>