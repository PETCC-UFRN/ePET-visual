<template>
  <div>
      <b-card>

        <template v-slot:header>
          <h3>Disciplinas cadastradas</h3>
            <nuxt-link
              class="btn btn-sm btn-primary float-right"
              style="color: white"
              to="/tutor/disciplina/create"
            ><i class="fa fa-plus" aria-hidden="true"></i> Adicionar disciplina</nuxt-link>
        </template>

        <div v-if="disciplinas.length > 0">

         <b-input-group  class="mt-1 mb-3" >
            <!-- Always bind the id to the input so that it can be focused when needed -->
            <b-form-input
              v-model="keyword"
              placeholder="Busca por nome ou por código"            
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
          <template v-slot:cell(ativo)="row">
            <div class="form-check">
              <input
              @click.prevent="desativarAtivar(row.item.ativo, row.item.idDisciplina, row.item.nome, row.item.codigo)"
               type="checkbox" class="form-check-input" :checked="row.item.ativo" />
            </div>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button 
                @click.prevent="editar(row.item.idDisciplina, row.item.nome, row.item.codigo, row.item.ativo)" 
                class="btn btn-sm btn-warning">
                <i class="fa fa-pencil fa-fw"></i> Editar</b-button>    
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
  layout: "menu/tutor",
  data() {
    return {
      keyword: '',
      disciplinas: [],
      currentPage: 1,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true },
        { key: "ativo", sortable: true, label: "Ativo"  },
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
      this.disciplinas = res.data.content;
    });
  },
  methods: {
    editar(id, nome, codigo, ativo){
      this.$router.push({
                
          path: '/tutor/disciplina/edit/',
          query  : {"id": id,
                    "nome": nome,
                    "codigo":codigo,
                    "ativo":ativo}
        })
    },
    desativarAtivar(ativo, id, nome, codigo) {
      this.$nextTick(() => {
        axios.post("disciplinas", {
        "ativo": !ativo,
        "idDisciplina": id,
        "nome": nome,
        "codigo": codigo
      }).then( () => {
        
        let vm = this;
        setTimeout(function() {
          location.reload();
        }, 1500);
      });
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