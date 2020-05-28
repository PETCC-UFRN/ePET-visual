<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-graduation-cap px-2"></i>Tutorias abertas</h2>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                <nuxt-link
                  class="btn btn-sm btn-warning w-100 mt-4"
                  to="/petiano/tutorias-abertas/disciplinas"
                ><i class="fa fa-pencil fa-fw"></i> Gerenciar disciplinas</nuxt-link>
              </b-col>
              <b-col>
                <nuxt-link
                  class="btn btn-sm btn-primary w-100 mt-4"
                  style="color: white"
                  to="/petiano/tutorias-abertas/create"
                ><i class="fa fa-plus fa-fw" aria-hidden="true"></i> Adicionar tutoria</nuxt-link>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>  
        <div v-if="tutorias.length > 0">
          <b-form-group label="Forma de pesquisa" label-cols-lg="2">
            <b-form-radio-group label="Forma de pesquisa" 
              v-model="selected"
              :options="options" 
              class="mt-lg-2">
            </b-form-radio-group>
          </b-form-group>  
          <b-input-group  class="mt-3 mb-3" >
            <b-form-input
              v-model="keyword"
              placeholder="Digite aqui o que deseja pesquisar"            
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
            :items="tutorias"
            :current-page="currentPage"
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >

            <template v-slot:cell(actions)="row">
              <b-button
                v-if="$store.state.profile.idPessoa == row.item.petiano.pessoa.idPessoa"
                @click.prevent="desativar(row.item.idTutoria, row.index)" 
                class="btn btn-sm btn-danger">
                <i class="fa fa-times-circle fa-fw"></i> Desativar
              </b-button>
              <b-button
                v-else
                @click="solicitarTutoria(row.item.idTutoria)"
                class="btn btn-sm btn-success">
                  <i class="fa fa-check fa-fw"></i>
              Solicitar tutoria
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="tutorias.length"
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
          <h5>Nenhuma tutoria cadastrada</h5>
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
      isLoading: true,
      selected: 'nomeCodigoDisciplina',
      options: [
        { text: 'Por nome ou código de disciplina', value: 'nomeCodigoDisciplina' },
        { text: 'Por nome ou CPF do responsável', value: 'nomeCpfResponsavel' },
      ],
      keyword: '',
      nomeCodigoDisciplina: false,
      nomemCpfResponsavel: false,
      tutorias: [],
      currentPage: 1,
      fields: [
        { key: "disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "petiano.pessoa.nome", label:"Responsável", sortable: true },
        { key: "actions", sortable: true, label:"Ações disponíveis" },
      ]
    };
  },
  mounted() {
    this.consumindoTutoriasApi();
  },
  methods: {
    cancelSearch() {
      this.keyword = ''
      this.consumindoTutoriasApi()
    },
    search() {
      if (this.selected === "nomeCodigoDisciplina") {
        this.searchDisciplinaTutoria();
      }
      else {
        this.searchPetianoTutoria();
      }  
    },
    searchDisciplinaTutoria(){
      this.$axios
        .get(`pesquisar-disciplina-tutoria/${this.keyword}`)
        .then( res => {
          this.tutorias = res.data.content;
        })
        .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhuma tutoria encontrada",
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
    searchPetianoTutoria(){
      this.$axios
        .get(`pesquisar-petiano-tutoria/${this.keyword}`)
        .then( res => {
          this.tutorias = res.data.content;
        })
        .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhuma tutoria encontrada",
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
    consumindoTutoriasApi() {
      this.$axios
        .get("tutorias")
        .then(res => {
          this.tutorias = res.data.content;
          this.isLoading = false;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhuma tutoria cadastrada",
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
    solicitarTutoria(idTutoria) {
      this.$axios
        .get(`tutorias-ministradas-cadastro/${this.$store.state.profile.idPessoa}/${idTutoria}`)
        .then(res => {
          Swal.fire({
            title: "Tutoria solicitada",
            text: "Sua solicitação foi enviada para o email do responsável. Aguarde a confirmação" + 
            " de data e horário a ser enviada para o seu email que está cadastrado no sistema.",
            icon: "success"
          })
        })
        .catch(err => {
          Swal.fire({
            title: "Tutoria não solicitada",
            icon: "error"
          })
        });
    },
    desativar(id, rowId){
      this.$axios
        .delete("tutoria-desativa/" + id, {})
        .then( () => {
          Swal.fire({
            title: 'Tutoria removida',
            icon: 'success',
          })
          .then( () => {
            this.tutorias.splice(rowId, 1);
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Tutoria não removida',
            icon: 'error'
          })
        });

    }
  }
};
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
}
</style>