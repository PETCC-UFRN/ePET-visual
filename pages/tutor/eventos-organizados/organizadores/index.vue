<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3>
              <i class="fa fa-edit"></i> Cadastrar organizador
            </h3>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">
              <h5>Nome</h5>
            </label>
            
            <v-pessoas label="nome" :idEvento="this.$route.query.idEvento" v-model="form.pessoa"></v-pessoas>
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
            <h3>
              <i class="fa fa-group fa-fw"></i> Organizadores cadastrados
            </h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="organizadores.length > 0">
          <b-input-group class="mt-1 mb-3">
            <b-form-input v-model="keyword" placeholder="Busca por nome ou por CPF" type="text"></b-form-input>
            <b-input-group-text slot="append">
              <b-btn
                class="p-0"
                :disabled="!keyword"
                variant="link"
                size="sm"
                @click="keyword = ''"
              >
                <i class="fa fa-remove"></i>
              </b-btn>
            </b-input-group-text>
          </b-input-group>

          <b-table
            id="f"
            responsive="sm"
            :items="organizadoresFiltrados"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-button
                @click="del(row.item.idOrganizadores, row.index)"
                class="btn btn-sm btn-danger"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="organizadoresFiltrados.length"
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
import Swal from "sweetalert2";
import ParticipantesSelect from "~/components/selects/ParticipantesSelect";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  components: {
    "v-pessoas": ParticipantesSelect
  },
  data() {
    return {
      form: {
        pessoa: 0
      },
      keyword: "",
      limit: 20,
      pessoas:[],
      organizadores: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", label: "Nome", sortable: true },
        {
          key: "pessoa.cpf",
          label: "CPF",
          sortable: true,
          formatter: value => {
            if (value != null)
              return `${value.substring(0, 3)}.${value.substring(
                3,
                6
              )}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
          }
        },
        { key: "pessoa.usuario.email", label: "Email", sortable: true },
        { key: "actions",  label: "Ações disponíveis" }
      ]
    };
  },
  computed: {
    organizadoresFiltrados () {
      return this.keyword
          ? this.organizadores.filter(item => item.pessoa.nome.includes(this.keyword) || item.pessoa.cpf.includes(this.keyword))
          : this.organizadores
    }
  },
  mounted(){
    this.consumirOrganizadoresApi();
  },
  async fetch() {
    this.consumirOrganizadoresApi();
  },
  methods: {
    consumirOrganizadoresApi() {
      this.$axios
        .get(`organizadores-evento/${this.$route.query.idEvento}`)
        .then(res => {
          this.organizadores = res.data;
        })        
        .catch(err => {
          if (err.response.status === 404) {}
          else if (err.response.status === 403) {
            Swal.fire({
              title: "Houve um problema...",
              text: "Verifique se possui a permissão necessária ou se a sessão foi expirada. "
              + "Caso a sessão tenha sido expirado, tente novamente.",
              icon: "error"
            })
            .then( () => this.$route.push('/login'));
          } 
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: "error"
            })
          }
        });
    },
    del(id, rowId) {
      this.$axios
        .delete("organizadores-remove/" + id)
        .then(() => {
          Swal.fire({
            title: "Organizador removido",
            icon: "success"
          }).then(() => {
            this.organizadores.splice(rowId, 1);
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Organizador não removido",
            icon: "error"
          });
        });
    },
    submitForm(e) {
      e.preventDefault();
      this.$axios
        .post(
          `organizadores-cadastrar/${this.$route.query.idEvento}/${this.form.pessoa}`
        )
        .then(res => {
          Swal.fire({
            title: "Organizador cadastrado",
            icon: "success"
          }).then(() => {
            this.form = Object.entries(this.form).map(item => {
              return (item = "");
            });
            this.consumirOrganizadoresApi();
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Organizador não cadastrado",
            icon: "error"
          }).then(() => {
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
h3, h4 {
  font-weight: 300;
}

h4 {
  text-align: center;

}
strong {
  font-size: 18px;
}
</style>
