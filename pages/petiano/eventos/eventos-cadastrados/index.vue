<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Eventos cadastrados</h3>
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="eventos-cadastrados/create"
        ><i class="fa fa-plus" aria-hidden="true"></i>
 Adicionar evento</a>
      </template>
      <div v-if="eventos.length > 0">
          
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
              @click="ativar(row.item.idEvento)"
              class="btn btn-sm btn-success"
              v-show="! row.item.ativo"
            ><i class="fa fa-check" aria-hidden="true"></i>
              Ativar</b-button>
            <b-button
              :href="'/petiano/eventos/eventos-cadastrados/edit/' + row.item.idEvento"
              class="btn btn-sm btn-warning"
            ><i class="fa fa-pencil fa-fw"></i> Editar</b-button>
            <b-button
              @click="del(row.item.idEvento, row.index)"
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
      </div>
      <div v-else>Nenhum evento cadastrado</div>
    </b-card>
  </div>
</template>

<script>


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
        { key: "titulo", sortable: true, label: "Título"  },
        { key: "local", sortable: true },
        { key: "d_inscricao", sortable: true, label: "Início das inscrições" , formatter: (value) => { if (value != null) return `${value.substring(8, 10)}-${value.substring(5, 7)}-${value.substring(0, 4)}`} },
        { key: "d_inscricao_fim", sortable: true, label: "Fim das inscrições" , formatter: (value) => { if (value != null) return `${value.substring(8, 10)}-${value.substring(5, 7)}-${value.substring(0, 4)}`} },
        { key: "qtdVagas", sortable: true, label: "Quantidade de vagas" },
        { key: "ativo", sortable: true, label: "Ativo"  },
        { key: "actions", sortable: true, label: "Ações disponíveis"  }
      ]
    };
  },
  
  computed: {
    items () {
      return this.keyword
          ? this.eventos.filter(item => item.titulo.includes(this.keyword) || item.local.includes(this.keyword))
          : this.eventos
    }
  },
  mounted() {
    this.$axios.get("eventos").then(res => {
      this.eventos = res.data.content;
    });
  },
  methods: {
    del(id, rowId) {
      this.$axios.delete("eventos-remove/" + id).then(() => {
        this.eventos.splice(rowId, 1);
        alert("Evento removido com sucesso");
      });
    },
    ativar(id) {
      this.$axios.post("eventos-ativar/" + id).then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert("Evento ativado com sucesso");
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