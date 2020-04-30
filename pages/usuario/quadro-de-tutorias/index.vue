<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Quadro de tutorias</h3>
      </template>

      <div v-if="filterTutorias.length > 0">
          
       <b-input-group  class="mt-3 mb-3" >
          <!-- Always bind the id to the input so that it can be focused when needed -->
          <b-form-input
            v-model="keyword"
            placeholder="Buscar por título ou por local"            
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
                :href="'/usuario/quadro-de-tutorias/' + row.item.idTutoria"
                variant="outline-warning"
              ><i class="fa fa-eye" aria-hidden="true"></i>
              Visualizar</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="items.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>
      </div>
      <div v-else>Nenhum tutoria cadastrada ou ativa</div>
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      keyword: '',
      tutorias: [],
      currentPage: 1,
      fields: [
        { key: "disciplina.nome", sortable: true, label: "Nome da disciplina" },
        { key: "disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "petiano.pessoa.nome", sortable: true, label: "Nome do petiano" },
        { key: "actions", sortable: true, label: "Ações disponíveis"  }
      ]
    };
  },
  
  computed: {
    items () {
      return this.keyword
          ? this.filterTutorias.filter(item => item.titulo.includes(this.keyword) || item.local.includes(this.keyword))
          : this.filterTutorias
    },
    filterTutorias() {
      return this.tutorias.filter(tutoria => tutoria.ativo == true) 
	  }
  },
  mounted() {
    axios.get("tutorias").then(res => {
      this.tutorias = res.data.content;
    });
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>