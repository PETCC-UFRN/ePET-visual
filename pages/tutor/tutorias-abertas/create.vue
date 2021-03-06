<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-book px-2"></i>Disciplinas para tutoria</h2>
          </b-col>
        </b-row>
      </template>
      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>  
        <div v-if="disciplinas.length > 0">
          
          <b-input-group  class="mt-3 mb-3" >
            <b-form-input
              v-model="keyword"
              placeholder="Busca por nome ou por código"            
              type="text"
            ></b-form-input>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="search"><i class="fa fa-search"></i></b-btn>
            </b-input-group-text>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="cancelSearch"><i class="fa fa-remove"></i></b-btn>
            </b-input-group-text>
          </b-input-group>
          <b-table
            responsive="sm"
            :items="disciplinas"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-button 
                @click="cadastrar(row.item.idDisciplina)" 
                class="btn btn-sm btn-warning"
              ><i class="fa fa-check" aria-hidden="true"></i> Tornar-se responsável
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="disciplinas.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              pills
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhuma disciplina ativa cadastrada</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      isLoading: true,
      keyword: '',
      form: {
        codigo: "",
        ativo: true,
        nome: ""
      },
      disciplinas: [],
      currentPessoa: [],
      currentPetiano: [],
      currentPage: 1,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true, label: "Nome" },
        { key: "actions", sortable: true, label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
    this.consumirDisciplinasApi();

    this.$axios
      .get("pessoas-usuario")
      .then(res => {
        this.currentPessoa = res.data;
        if (
          res.data.tipo_usuario.nome != "petiano" &&
          res.data.tipo_usuario.nome != "tutor"
        ) {
          this.$router.push("/");
        }
      })
      .finally(() => {
        this.$axios
          .get(`petianos-pessoa/${this.currentPessoa.idPessoa}`)
          .then(res2 => {
            this.currentPetiano = res2.data;
          })
          .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Usuário não tem permissão nem de petiano nem de tutor",
                icon: 'error',
              });
            } else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: "error"
              })
            }
          });
      });
  },
  methods: {
    cancelSearch() {
      this.keyword = ''
      this.consumirDisciplinasApi()
    },
    search() {
      this.$axios
        .get(`pesquisar-disciplina-ativa/${this.keyword}`)
        .then( res => {
          this.disciplinas = res.data.content;
        })
        .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhuma disciplina ativa encontrada",
                icon: 'info',
              });
            }
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: 'error',
              })
            }  
        });
    },
    consumirDisciplinasApi() {
      this.$axios
        .get("disciplinas-ativas")
        .then(res => {
          this.disciplinas = res.data.content;
          this.isLoading = false;
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum disciplina ativa encontrada",
              icon: 'info',
            });
          } else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: "error"
            })
          }
        });
    },
    submitForm(e) {
      e.preventDefault();
      this.$axios
        .post("disciplinas", this.form)
        .then(res => {
          Swal.fire({
            title: "Disciplina cadastrada",
            icon: "success"
          }).then(() => {
            this.reset();
            this.consumirDisciplinasApi();
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Disciplina não cadastrada",
            icon: "error"
          });
        });
    },
    cadastrar(id) {
      this.$axios
        .post(`tutoria-cadastro/${this.currentPetiano.idPetiano}/${id}/`)
        .then(() => {
          Swal.fire({
            title: "Disciplina tutorada cadastrada",
            icon: "success"
          }).then(() => {
            this.$router.push("/tutor/tutorias-abertas");
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Disciplina tutorada não cadastrada",
            icon: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
  text-align: center;
}
</style>