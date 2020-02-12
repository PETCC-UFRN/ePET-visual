<template>
  <div>
    <div  v-if="pessoas.length > 0">
      <b-card>
        <template v-slot:header>
          <h3>Pessoas cadastradas</h3>
          <!-- <a
            class="btn btn-sm btn-primary float-right"
            style="color: white"
            href="pessoas/create"
          >Adicionar Pessoa</a>-->
        </template>
  
       <b-input-group  class="mt-3 mb-3" >
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
          <template v-slot:cell(ativo)="row">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" :checked="row.item.ativo" disabled />
            </div>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button
              @click="ativar(row.item.idpessoa)"
              class="btn btn-sm btn-success"
              v-show="! row.item.ativo"
            ><i class="fa fa-check" aria-hidden="true"></i> Ativar</b-button>
            <b-button
              @click="del(row.item.idpessoa, row.index)"
              class="btn btn-sm btn-danger"
            ><i class="fa fa-trash-o fa-fw"></i> Remover</b-button>
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
    <div class="row" v-else>Nenhum pessoa cadastrado</div>
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
      pessoas: [],
      currentPage: 1,
      fields: [
        { key: "nome", sortable: true },
        { key: "cpf", sortable: true,label: "CPF" }
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
      axios.post("pessoas-cadastrar/" + id).then(() => {
        // para não ter que atualizar os pessoas em tempo real forçarei a página a atualizar
        alert("pessoa ativada com sucesso");
        let vm = this;
        setTimeout(function() {
          location.reload();
        }, 1500);
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