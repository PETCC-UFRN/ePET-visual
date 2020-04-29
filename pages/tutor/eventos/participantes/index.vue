<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3><i class="fa fa-edit"></i> Cadastrar participante</h3>             
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1"><h5>Pessoa:</h5> </label>
            <select class="form-control" v-model="form.pessoa">
              <option
                v-for="participante in pessoas"
                :key="participante.idPessoa"
                :value="participante.idPessoa"
              >{{ participante.nome }}</option>
            </select>
          </div>
          <div class="form-group">
            <b-button block type="submit" variant="success">
              <i class="fa fa-check"></i> Confirmar cadastrado de organizador
            </b-button>
          </div>
        </form>
      </div>
    </div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3><i class="fa fa-group fa-fw"></i> Participantes cadastrados </h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="eventos.length > 0">

        <!-- <b-input-group  class="mt-1 mb-3" >
            <b-form-input
              v-model="keyword"
              placeholder="Busca"            
              type="text"
            ></b-form-input>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
          </b-input-group-text>
          </b-input-group> -->
<!-- 
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
                @click="confirmar(row.item.idParticipantes)"
                class="btn btn-sm btn-success"
                v-show="! row.item.ativo"
              ><i class="fa fa-check" aria-hidden="true"></i>
 Confirmar</b-button>
              <b-button
                @click="del(row.item.idParticipantes, row.index)"
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
          </nav> -->
        </div>
        <div v-else><h5>Nenhum participante cadastrado</h5></div>
      </b-card-body>
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
      form: {
        pessoa: 0,
      },
      pessoas: {},
      keyword: '',
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", label: "Nome", sortable: true },
        { key: "actions", sortable: true, label: "Ações disponíveis" }
      ]
    };
  },
  computed: {
    items () {
      return this.keyword
          ? this.eventos.filter(item => item.evento.titulo.includes(this.keyword) || item.pessoa.nome.includes(this.keyword))
          : this.eventos
    }
  },
  mounted() {
    axios
      .get("pessoas")
      .then(res => {
        this.pessoas = res.data.content;
      })
      .catch ( err => {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Nenhum pessoa cadastrada",
            icon: 'info',
          });
        }
        else {
          Swal.fire({
            title: "Falha em consumir API",
            icon: 'error',
          });
        }
      });

    axios.get("participantes").then(res => {
      this.eventos = res.data.content;
    });
  },
  methods: {
    consumirParticipantesApi(){

    },
    submitForm(e) {
      e.preventDefault();
      axios
        .post(`participantes-cadastrar/${this.$route.query.idEvento}/${this.form.pessoa}`)
        .then( res => {
          Swal.fire({
            title: "Participante cadastrado",
            icon: 'success',
          })
          .then( () => {
            this.form = Object.entries(this.form).map(item => {
              return (item = "");
            });
            this.consumirParticipantesApi();
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Participante não cadastrado",
            icon: 'error',
          })
          .then( () => {
            this.form = Object.entries(this.form).map(item => {
              return (item = "");
            });
          });
        });
    },
    del(id, rowId) {
      axios
        .delete("participantes-remove/" + id)
        .then( () => {
          this.eventos.splice(rowId, 1);
          alert("Participante removido com sucesso");
        });
    },
    confirmar(id) {
      axios.post("participantes-confirmar/" + id).then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert("Participante ativado com sucesso");
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