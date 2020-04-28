<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Disciplinas cadastradas</h3>
        <nuxt-link
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          to="/tutor/disciplinas/create"
        >
          <i class="fa fa-plus" aria-hidden="true"></i> Adicionar disciplina
        </nuxt-link>
      </template>

      <div v-if="disciplinas.length > 0">
        <b-input-group class="mt-1 mb-3">
          <b-form-input v-model="keyword" placeholder="Busca por nome ou por código" type="text"></b-form-input>
          <b-input-group-append>
            <b-button variant="success" @click="search">
              <i class="fa fa-search"></i>
            </b-button>
            <b-button variant="outline-danger" @click="getDisciplinas">
              <i class="fa fa-remove"></i>
            </b-button>
          </b-input-group-append>
        </b-input-group>

        <b-table
          responsive="sm"
          :items="disciplinas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="perPage"
          :fields="fields"
        >
          <template v-slot:cell(ativo)="row">
            <div class="form-check">
              <input
                @change="desativarAtivar(row.item.ativo, row.item.idDisciplina, row.item.nome, row.item.codigo)"
                type="checkbox"
                class="form-check-input"
                :checked="row.item.ativo"
              />
            </div>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button
              @click.prevent="editar(row.item.idDisciplina, row.item.nome, row.item.codigo, row.item.ativo)"
              class="btn btn-sm btn-warning"
            >
              <i class="fa fa-pencil fa-fw"></i> Editar
            </b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="numItems"
            :per-page="perPage"
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
  layout: "menu/tutor",
  data() {
    return {
      keyword: "",
      disciplinas: [],
      currentPage: 0,
      numItems: 0,
      perPage: 20,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true },
        { key: "ativo", sortable: true, label: "Ativo" },
        { key: "actions", sortable: true, label: "Ações disponíveis" }
      ],
    }
  },
  
  mounted() {
    this.getDisciplinas();
  },
  watch: {
    currentPage: function(val){
      axios.get("disciplinas?page=" + (val-1)).then(res => {
        console.log(res.data);
        this.disciplinas = res.data.content;
        this.numPages = res.data.totalElements;
      });
    }
  },
  methods: {
    editar(id, nome, codigo, ativo) {
      this.$router.push({
        path: "/tutor/disciplinas/edit/",
        query: { id: id, nome: nome, codigo: codigo, ativo: ativo }
      });
    },
    desativarAtivar(ativo, id, nome, codigo) {
      axios.post("disciplinas", {
        ativo: !ativo,
        idDisciplina: id,
        nome: nome,
        codigo: codigo
      });
    },
    getDisciplinas(){
      axios.get("disciplinas").then(res => {
        this.numItems = res.data.totalElements;
        this.disciplinas = res.data.content;
      });
    },
    search() {
      axios.get('https://epet.imd.ufrn.br:8443/api/pesquisar-diciplina/Melhor').then(res => {
        this.numItems = res.data.totalElements;
        this.disciplinas = res.data.content;
      });
    },
  }
};
</script>


<style scoped>
h3 {
  text-align: center;
}
</style>