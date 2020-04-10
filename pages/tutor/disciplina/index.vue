<template>
  <div>
      <b-card>
        <template v-slot:header>
          <h3>Disciplinas cadastradas</h3>
            <a
              class="btn btn-sm btn-primary float-right"
              style="color: white"
              href="/petiano/disciplina/create"
            ><i class="fa fa-plus" aria-hidden="true"></i> Adicionar disciplina</a>
        </template>

      <div v-if="disciplinas.length > 0">      
        <b-input-group  class="mt-1 mb-3" >
          <!-- Always bind the id to the input so that it can be focused when needed -->
          <b-form-input
            v-model="keyword"
            placeholder="Busca"            
            type="text"
          ></b-form-input>
          <b-input-group-text slot="append">
            <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
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
          <template v-slot:cell(actions)="row">
            <b-button 
              :href="'/petiano/disciplina/edit/' + row.item.idDisciplina"
              @click="editar(row.item.idDisciplina, row.item.nome, row.item.codigo)" 
              class="btn btn-sm btn-warning">
              <i class="fa fa-pencil fa-fw"></i> Editar</b-button>
            <b-button
              @click="del(row.item.idDisciplina, row.index)"
              class="btn btn-sm btn-danger"
            ><i class="fa fa-trash-o fa-fw"></i> Remover</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="items.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior "
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>
      </div>
      <div v-else>Nenhuma disciplina cadastrada</div>
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
      keyword: '',
      disciplinas: [],
      currentPage: 1,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true },
        { key: "actions", sortable: true, label: "Ações disponíveis" },
      ]
    };
  },
  computed: {
    items () {
      return this.keyword
          ? this.disciplinas.filter(item => item.codigo.includes(this.keyword) || item.nome.includes(this.keyword))
          : this.disciplinas
    }
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