<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-graduation-cap px-2"></i>Tutorias abertas</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="tutorias.length > 0">      
          <b-form-group label="Forma de pesquisa" label-size="lg" label-cols-lg="2">
            <b-form-radio-group label="Forma de pesquisa" 
              v-model="selected"
              :options="options" 
              class="mt-lg-2">
            </b-form-radio-group>
          </b-form-group>  
          <b-input-group  class="mb-3" >
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
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-button
                  @click="solicitarTutoria(row.item.idTutoria)"
                  class="btn btn-sm btn-success"
                ><i class="fa fa-check fa-fw"></i>
                Solicitar tutoria</b-button>
            </template>
          </b-table>
          <div>
            <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage" />
          </div>
        </div>
        <div v-else>
          <h5>Nenhuma tutoria cadastrada ou ativa</h5> 
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Pagination from "~/components/Pagination";

export default {
  name: "dashboard",
  layout: "menu/usuario",
    components: {
    Pagination
  },

  data() {
    return {
      currentPage: 0,
      numItems: 0,
      perPage: 10,
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
      fields: [
        { key: "disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "petiano.pessoa.nome", sortable: true, label: "Responsável" },
        { key: "actions", label: "Ações disponíveis"  }
      ]
    };
  },
  mounted() {
    this.consumindoTutoriasApi();
  },
  methods: {
        setCurrentPage(val) {
      this.currentPage = val;
    },

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
          this.numItems = res.data.totalElements;
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
    }
  }
};
</script>

<style scoped>
h2, h4, h5 {
  font-weight: 300;
}
</style>