<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Organizadores Cadastrados</h3>
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="organizadores/create"
        ><i class="fa fa-plus" aria-hidden="true"></i>
 Adicionar organizador</a>
      </template>
      <b-card-body>
        <div v-if="eventos.length > 0">

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
           <template v-slot:cell(confirmado)="row">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" :checked="row.item.confirmado" disabled />
              </div>
            </template>
            <template v-slot:cell(espera)="row">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" :checked="row.item.espera" disabled />
              </div>
            </template>


            <template v-slot:cell(actions)="row">
              <b-button
                @click="confirmar(row.item.idOrganizadores)"
                class="btn btn-sm btn-success"
                v-show="! row.item.ativo"
              ><i class="fa fa-check" aria-hidden="true"></i>
 Confirmar</b-button>
              <b-button
                @click="del(row.item.idOrganizadores, row.index)"
                class="btn btn-sm btn-danger"
              ><i class="fa fa-trash-o fa-fw"></i> Deletar</b-button>
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
        <div v-else>Nenhum organizador cadastrado</div>
      </b-card-body>
    </b-card>
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
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", label: "Nome do usuário", sortable: true },
        { key: "evento.titulo", label: "Nome do evento", sortable: true },
        { key: "actions", sortable: true, label: "Ações disponíveis" },
        //{ key: "ativo", sortable: true },
        { key: "actions", sortable: true, label: "Ações disponíveis" }
      ]
    };
  },
  computed: {
    items () {
      return this.keyword
          ? this.eventos.filter(item => item.pessoa.nome.includes(this.keyword) || item.evento.titulo.includes(this.keyword))
          : this.eventos
    }
  },
  mounted() {
    axios.get("organizadores").then(res => {
      this.eventos = res.data.content;
    });
  },
  methods: {
    del(id, rowId) {
      console.log(id);
      axios.delete("organizadores-remove/" + id).then(() => {
        this.eventos.splice(rowId, 1);
        alert("Organizador removido com sucesso");
      });
    },
    confirmar(id) {
      axios.post("organizadores-confirmar/" + id).then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert("Organizador ativado com sucesso");
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