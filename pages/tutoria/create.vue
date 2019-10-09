<template>
  <div>
    <div v-if="disciplinas.length > 0">
      <b-card header="Disciplinas cadastradas">
        <!-- TODO::remover esse style -->
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="../disciplina/create"
        >Adicionar Disciplina</a>
        <b-table
          responsive="sm"
          :items="disciplinas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button @click="cadastrar(row.item.idDisciplina)" class="btn btn-sm btn-primary">Virar tutor</b-button>
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
            prev-text="Prev"
            next-text="Next"
            hide-goto-end-buttons
          />
        </nav>
      </b-card>
    </div>
    <div class="row" v-else>Nenhuma Disciplina cadastrada</div>
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
      disciplinas: [],
      currentPessoa:[],
      currentPage: 1,
      fields: [
        { key: "codigo", sortable: true },
        { key: "nome", sortable: true },
        { key: "actions", sortable: true },
      ]
    };
  },
  mounted() {
    axios.get("disciplinas").then(res => {
      this.disciplinas = res.data;
    });
    axios.get("pessoas-usuario").then(res => {
      this.currentPessoa = res.data;
      console.log(res.data.tipo_usuario.nome);
      if(res.data.tipo_usuario.nome != "petiano" && res.data.tipo_usuario.nome != "tutor")
      {
        this.$router.push("/");
      }
      
    });
  },
  methods: {
    cadastrar(id){
      /*this.$router.push(
        {
          path: 'edit/',
          query  : {"id": id,
                    "nome": nome,
                    "codigo":codigo}
        }
      )*/
      console.log("tutoria-cadastro/" + this.currentPessoa.idPessoa +"/"+id+"/");
      axios.post("tutoria-cadastro/" + this.currentPessoa.idPessoa +"/"+id+"/").then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert('Tutoria cadastrada com sucesso');
        let vm = this;
        setTimeout(function(){
          location.reload()
        }, 1500)
      });
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