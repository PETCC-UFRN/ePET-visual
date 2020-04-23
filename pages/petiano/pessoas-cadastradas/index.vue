<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Pessoas cadastradas</h3>
      </template>

      <b-input-group  class="mt-1 mb-3" >
        <!-- Always bind the id to the input so that it can be focused when needed -->
        <b-form-input
          v-model="keyword"
          placeholder="Busca por nome ou por CPF"            
          type="text"
        ></b-form-input>
        <b-input-group-text slot="append">
          <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
      </b-input-group-text>
      </b-input-group>

      <div  v-if="pessoas.length > 0">
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
                @click.prevent="editar(row.item.cpf)" 
                class="btn btn-sm btn-warning">
                <i class="fa fa-pencil fa-fw"></i> Editar</b-button>
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
      <div v-else>Nenhum pessoa cadastrada</div>
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      keyword: '',
      pessoas: [],
      currentPage: 1,
      fields: [
        { key: "nome", sortable: true },
        { key: "cpf", sortable: true,label: "CPF", formatter: (value) => { if (value != null) return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`}  },
        { key: "actions", sortable: true, label: "Ações disponíveis" }
      ]
    };
  },
  computed: {
    items () {
      return this.keyword
          ? this.pessoas.filter(item => item.cpf.includes(this.keyword) || item.nome.includes(this.keyword))
          : this.pessoas
    }
  },
  mounted() {
    axios.get("pessoas").then(res => {
      this.pessoas = res.data.content.filter(pessoa => pessoa.tipo_usuario.nome == 'comum');
    });
  },
  methods: {
    editar(cpf){
      this.$router.push({
          path: '/petiano/pessoas-cadastradas/edit/',
          query  : {"cpf": cpf}
        })
    }
  }
};
</script>


<style scoped>
h3 {
  text-align: center;
}
</style>