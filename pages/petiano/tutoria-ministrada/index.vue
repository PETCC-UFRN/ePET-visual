<template>
  <div>
    <div v-if="tutorias.length > 0">
      <b-card header="Tutores cadastrados">
        <!-- TODO::remover esse style -->
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
            <b-button @click="sol(row.item.idTutoria, row.index)" class="btn btn-sm btn-success">Solicitar Tutoria</b-button>
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
      currentPessoa:[],
      currentPage: 1,
      fields: [
        { key: "disciplina.nome", label:"Nome da disciplina", sortable: true },
        { key: "disciplina.codigo", label:"Código da disciplina", sortable: true },
        { key: "petiano.pessoa.nome", label:"Nome do petiano", sortable: true },
        { key: "actions", sortable: true, label:"Ações disponíveis" },
      ]
    };
  },
  mounted() {
    axios.get("tutorias").then(res => {
      this.tutorias = res.data.content;
      
    });
    axios.get("pessoas-usuario").then(res => {
      this.currentPessoa = res.data;
      /*if(res.data.tipo_usuario.nome != "petiano" && res.data.tipo_usuario.nome != "tutor")
      {
        this.$router.push("/");
      }*/
    });
  },
  methods: {
    sol(id, rowId){
      console.log("tutorias-ministradas/"+id +"/"+this.currentPessoa.idPessoa+"/");
      axios.post("tutorias-ministradas-cadastro/"+this.currentPessoa.idPessoa+"/"+id +"/").then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert('Tutoria solicitada com sucesso');
        let vm = this;
        setTimeout(function(){
          location.reload()
        }, 1500)
      });
    }
  }
};
</script>