<template>
  <div>
    <div v-if="pessoas.length > 0">
      <b-card header="pessoas cadastrados">
        <!-- TODO::remover esse style -->
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="pessoas/create"
        >Adicionar pessoa</a>
        <b-table
          responsive="sm"
          :items="pessoas"
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
            <b-button @click="ativar(row.item.idpessoa)" class="btn btn-sm btn-success" v-show="! row.item.ativo">Ativar</b-button>
            <b-button @click="del(row.item.idpessoa, row.index)" class="btn btn-sm btn-danger">Deletar</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="pessoas.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Prev"
            next-text="Next"
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
      pessoas: [],
      currentPage: 1,
      fields: [
        { key: "nome", sortable: true },
        { key: "cpf", sortable: true },
      ]
    };
  },
  mounted() {
    axios.get("pessoas").then(res => {
      this.pessoas = res.data.content;
    });
  },
  methods: {
    cadastrar(id){
      axios.post("pessoas-cadastrar/" + id).then(() => {
        // para não ter que atualizar os pessoas em tempo real forçarei a página a atualizar
        alert('pessoa ativado com sucesso');
        let vm = this;
        setTimeout(function(){
          location.reload()
        }, 1500)
      });
    }
  }
};
</script>