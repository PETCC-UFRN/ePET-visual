<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-graduation-cap px-2"></i>Tutorias abertas</h2>
          </b-col>
        </b-row>
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
                class="btn btn-sm btn-success"
              ><i class="fa fa-check fa-fw"></i>
              Solicitar tutoria</b-button>
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


export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      keyword: '',
      tutorias: [],
      currentPage: 1,
      fields: [
        { key: "disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "petiano.pessoa.nome", sortable: true, label: "Responsável" },
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
    this.$axios
      .get("tutorias")
      .then(res => {
        this.tutorias = res.data.content;
      });
  }
};
</script>

<style scoped>
h2, h4, h5 {
  font-weight: 300;
}
</style>