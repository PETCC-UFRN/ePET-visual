<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2>
              <i class="fa fa-edit px-2"></i>Cadastrar disciplina
            </h2>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <b-row>
            <b-col cols="4">
              <div class="form-group">
                <label for="codigo">
                  <strong>Código</strong>
                </label>
                <input
                  id="codigo"
                  type="text"
                  class="form-control"
                  placeholder="Digite o código"
                  v-model="form.codigo"
                />
              </div>
            </b-col>
            <b-col>
              <div class="form-group">
                <label for="nome">
                  <strong>Nome</strong>
                </label>
                <input
                  id="nome"
                  type="text"
                  class="form-control"
                  placeholder="Digite o nome"
                  v-model="form.nome"
                />
              </div>
            </b-col>
          </b-row>
          <div class="form-group">
            <b-button block type="submit" variant="success">
              <i class="fa fa-check fa-fw"></i> Confirmar cadastro de disciplina
            </b-button>
          </div>
        </form>
      </div>
    </div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2>
              <i class="fa fa-book px-2"></i>Disciplinas cadastradas
            </h2>
          </b-col>
        </b-row>
      </template>
      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner
          style="width: 3rem; height: 3rem;"
          type="grow"
          variant="primary"
          label="Large Spinner"
        ></b-spinner>
      </div>
      <div v-else>
        <div v-if="disciplinas.length > 0">
          <b-input-group class="mt-3 mb-3">
            <b-form-input v-model="keyword" placeholder="Buscar por nome ou por código" type="text"></b-form-input>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="search">
                <i class="fa fa-search"></i>
              </b-btn>
            </b-input-group-text>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="cancelSearch"><i class="fa fa-remove"></i></b-btn>
            </b-input-group-text>
          </b-input-group>

          <b-table
            responsive="sm"
            :items="disciplinas"
            :bordered="false"
            striped   
            :per-page="pageSize"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-button
                v-if="row.item.ativo === true"
                @click.prevent="desativarAtivar(row.item.ativo, row.item.idDisciplina, row.item.nome, row.item.codigo)"
                class="btn btn-sm btn-danger"
              >
                <i class="fa fa-times-circle fa-fw"></i> Desativar
              </b-button>
              <b-button
                v-if="row.item.ativo === false"
                @click.prevent="desativarAtivar(row.item.ativo, row.item.idDisciplina, row.item.nome, row.item.codigo)"
                class="btn btn-sm btn-success"
              >
                <i class="fa fa-check fa-fw"></i> Ativar
              </b-button>
              <b-button
                @click.prevent="editar(row.item.idDisciplina, row.item.nome, row.item.codigo, row.item.ativo)"
                class="btn btn-sm btn-warning"
              >
                <i class="fa fa-pencil fa-fw"></i> Editar
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="numElements"
              :per-page="pageSize"
              pills
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhuma disciplina cadastrada</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      keyword: "",
      isLoading: true,
      form: {
        codigo: "",
        ativo: true,
        nome: ""
      },
      disciplinas: [],
      currentPage: 1,
      numElements: 1,
      pageSize: 20,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
    this.getDisciplinas();
    // this.$on("currentPage");
  },
  watch: {
    currentPage: function(val){
      this.$axios.get("disciplinas?page=" + (val-1))
      .then(res => {
        this.disciplinas = res.data.content;
        this.numElements = res.data.totalElements;
        this.pageSize = res.data.pageable.pageSize;
      });
    }
  },
  methods: {
    editar(id, nome, codigo, ativo) {
      this.$router.push({
        path: "/petiano/tutorias-abertas/disciplinas/edit/",
        query: { id: id, nome: nome, codigo: codigo, ativo: ativo }
      });
    },
    desativarAtivar(ativo, id, nome, codigo) {
      this.$axios
        .post("disciplinas", {
          ativo: !ativo,
          idDisciplina: id,
          nome: nome,
          codigo: codigo
        })
        .then(() => {
          if (ativo === true) {
            Swal.fire({
              title: "Disciplina desativada",
              icon: "success"
            }).then(() => {
              this.getDisciplinas();
            });
          } else {
            Swal.fire({
              title: "Disciplina ativada",
              icon: "success"
            }).then(() => {
              this.getDisciplinas();
            });
          }
        })
        .catch(err => {
          if (ativo === true) {
            Swal.fire({
              title: "Disciplina não desativada",
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Disciplina não ativada",
              icon: "error"
            });
          }
        });
    },
    getDisciplinas() {
      this.$axios
        .get("disciplinas?page=0")
        .then(res => {
          this.numElements = res.data.totalElements;
          this.pageSize = res.data.pageable.pageSize;
          this.disciplinas = res.data.content;
          this.isLoading = false;
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
          this.isLoading = false
        });
    },
    cancelSearch() {
      this.keyword = '';
      this.getDisciplinas();
    },
    search() {
      this.$axios
        .get('pesquisar-disciplina/' + this.keyword)
        .then(res => {
          this.numItems = res.data.totalElements;
          this.disciplinas = res.data.content;
        });
    },
    setCurrentPage(val) {
      this.currentPage = val;
    },
    reset() {
      this.form.codigo = "";
      this.form.nome = "";
    },
    submitForm(e) {
      Swal.fire({
        title: 'Confirmação de criação',
        showCancelButton: true,
        confirmButtonText: `Confirmar`,
        cancelButtonText: `Cancelar`,
        html: `Confirmo a crição da disciplina <strong>${this.form.nome}</strong> de código <strong>${this.form.codigo}</strong>. Não será possível apagá-la após isso, apenas realizar edição.`
      }).then((result) => {
        console.log(result.value);
        if (result.value != null) {
          e.preventDefault();
          this.$axios
            .post("disciplinas", this.form)
            .then(res => {
              Swal.fire({
                title: "Disciplina cadastrada",
                icon: "success"
              }).then(() => {
                this.reset();
                this.getDisciplinas();
              });
            })
            .catch(err => {
              Swal.fire({
                title: "Disciplina não cadastrada",
                icon: "error"
              });
            });
        } 
      });

    }
  }
};
</script>


<style scoped>
.bbutton {
  border-radius: 0px !important;
}
h2,
h4 {
  font-weight: 300;
}
strong {
  color: gray;
}
</style>
