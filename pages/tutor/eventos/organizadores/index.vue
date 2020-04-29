<template>
  <div>
    
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3><i class="fa fa-edit"></i> Cadastrar organizador</h3>             
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
        <!--  <div class="form-group">
            <label for="exampleFormControlInput1">Evento:</label>
            <select class="form-control" v-model="form.evento">
              <option
                v-for="evento in eventos"
                :key="evento.idEvento"
                :value="evento.idEvento"
              >{{ evento.titulo }}</option>
            </select>
          </div>-->
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
            <h3><i class="fa fa-group fa-fw"></i> Organizadores cadastrados</h3>
          </b-col>
        </b-row>
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
            <template v-slot:cell(actions)="row">
              <b-button
                @click="del(row.item.idOrganizadores, row.index)"
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
        <div v-else> 
          <h5>Nenhum organizador cadastrado</h5>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";
import Swal from "sweetalert2";

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
      organizadores: [],
      eventos: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", label: "Nome do usuário", sortable: true },
        { key: "evento.titulo", label: "Nome do evento", sortable: true },
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

    axios
      .get(`organizadores-evento/${this.$route.query.idEvento}`)
      .then(res => {
        this.organizadores = res.data.content;
      })
      .catch( err => {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Nenhum organizador cadastrado",
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
  },
  methods: {
    novoOrganizador() {
      this.$router.push("/tutor/eventos/organizadores/create");
    },
    del(id, rowId) {
      axios
        .delete("organizadores-remove/" + id)
        .then(() => {
          this.eventos.splice(rowId, 1);
          alert("Participante removido com sucesso");
        });
    },
    submitForm(e) {
      axios
        .post(`organizadores-cadastrar/${this.form.evento}/${this.form.pessoa}`)
        .then( res => {
          this.alert.class = "success";
          this.alert.message = "Organizador cadastrado com sucesso.";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
          });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message =
            "Organizador não cadastrado. Por favor, tente novamente";
        });
    }
  }
};
</script>
