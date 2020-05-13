<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Cadastrar organizador</h2>             
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Pessoa:</strong></label>
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
            <h2><i class="fa fa-group fa-fw"></i> Organizadores cadastrados</h2>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="organizadores.length > 0">
         <b-input-group  class="mt-1 mb-3" >
            <b-form-input
              v-model="keyword"
              placeholder="Busca por nome ou por CPF"            
              type="text"
            ></b-form-input>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
            </b-input-group-text>
          </b-input-group>

          <b-table
            id="f"
            responsive="sm"
            :items="organizadores"
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
              :total-rows="organizadores.length"
              :per-page="10"
              pills
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
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", label: "Nome", sortable: true },
        { key: "pessoa.cpf", label: "CPF", sortable: true, formatter: (value) => { if (value != null) return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}` } },
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
          })
          .then( () => {
              let vm = this;
              setTimeout(function() {
                location.reload();
              }, 1500);
          });
        }
      });
  },
  async fetch () {
    this.consumirOrganizadoresApi();
  },
  methods: {
    consumirOrganizadoresApi() {
      axios
        .get(`organizadores-evento/${this.$route.query.idEvento}`)
        .then(res => {
          this.organizadores = res.data;
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
            })
            .then( () => {
                let vm = this;
                setTimeout(function() {
                  location.reload();
                }, 1500);
            });
          }
        });
    },
    novoOrganizador() {
      this.$router.push("/tutor/eventos/organizadores/create");
    },
    del(id, rowId) {
      axios
        .delete("organizadores-remove/" + id)
        .then(() => {
          Swal.fire({
            title: "Organizador removido",
            icon: 'success',
          })
          .then( () => {
            this.organizadores.splice(rowId, 1);
          });
        })
        .catch( err => {
          Swal.fire({
            title: "Organizador não removido",
            icon: 'error',
          });
        });
    },
    submitForm(e) {
      e.preventDefault();
      axios
        .post(`organizadores-cadastrar/${this.$route.query.idEvento}/${this.form.pessoa}`)
        .then( res => {
          Swal.fire({
            title: "Organizador cadastrado",
            icon: 'success',
          })
          .then( () => {
            this.form = Object.entries(this.form).map(item => {
              return (item = "");
            });
            this.consumirOrganizadoresApi();
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Organizador não cadastrado",
            icon: 'error',
          })
          .then( () => {
            this.form = Object.entries(this.form).map(item => {
              return (item = "");
            });
          });
        });
    }
  }
};
</script>


<style scoped>

h2, h4 {  
  text-align: center;
  font-weight: 300;
}

strong {
  font-size: 18px;
}
</style>