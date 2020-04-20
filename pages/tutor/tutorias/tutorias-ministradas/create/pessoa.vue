<template>
  <div>
    <div  v-if="pessoas.length > 0">
      <b-card>
        <template v-slot:header>
          <h3>Usuários cadastrados</h3>
        </template>
  
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
            <b-button @click.prevent="cadastrar(row.item.idPessoa)" 
            variant="outline-success"
            ><i class="fa fa-check-square"></i> Usuário tutorado</b-button>
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
      </b-card>
    </div>
    <div class="row" v-else>Nenhum pessoa cadastrada</div>
  </div>
</template>

<script>
import axios from "~/axios";
export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      id_tutoria: this.$route.query.id_tutoria,
      keyword: '',
      pessoas: [],
      currentPage: 1,
      fields: [
        { key: "nome", sortable: true },
        { key: "cpf", sortable: true,label: "CPF" },
        { key: "actions", sortable: true, label:"Ações disponíveis" },
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
      this.pessoas = res.data.content;
    });
  },
  methods: {
    cadastrar(id) {
      axios.get("tutorias-ministradas-cadastro/" + id + "/" + this.id_tutoria ).then(() => {
        // para não ter que atualizar os pessoas em tempo real forçarei a página a atualizar
        alert("Tutoria ministrada cadastrada");
        let vm = this;
        setTimeout(function() {
          location.reload();
        }, 1500);
      }).then(() => {

        this.$router.push({
          path: '/petiano/tutorias/tutorias-ministradas/'});
      });
    }
  }
};
</script>


<style scoped>
h3 {
  text-align: center;
}
</style>
