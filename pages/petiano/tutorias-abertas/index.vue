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
            :bordered="false"
            striped   
            :per-page="pageSize"
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
                @click="solicitarTutoria(row.item)"
                class="btn btn-sm btn-success">
                  <i class="fa fa-check fa-fw"></i>
              Solicitar tutoria
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
      idPessoa: "",
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
      numElements: 1,
      pageSize: 20,
      fields: [
        { key: "disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "petiano.pessoa.nome", label:"Responsável", sortable: true },
        { key: "actions", label:"Ações disponíveis" },
      ]
    };
  },
  watch: {
    currentPage: function(val){
      this.$axios.get("tutorias?page=" + (val-1)).then(res => {
        this.tutorias = res.data.content;
        this.numElements = res.data.totalElements;
        this.pageSize = res.data.pageable.pageSize;
      });
    }
  },
  mounted() {
    this.consumindoTutoriasApi();
    this.idPessoa = this.$store.state.profile.idPessoa;
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
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
        })
        .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhuma tutoria encontrada",
                icon: 'info',
              });
              this.keyword= '';
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
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
        })
        .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhuma tutoria encontrada",
                icon: 'info',
              });
              this.keyword= '';
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
        .get("tutorias?page=0")
        .then(res => {
          this.tutorias = res.data.content;
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
        
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
    solicitarTutoria(tutoria) {
      const idTutoria = tutoria.idTutoria;

      Swal.mixin({
        showCancelButton: true,
        confirmButtonText: 'Confirmo',
        cancelButtonText: 'Não confirmo',
        progressSteps: ['1', '2']
      })
      .queue([
        {
          title: 'Informações da tutoria',
          html: `<p><strong>Nome da disciplina:</strong> ${tutoria.disciplina.nome}</p> 
                  <p><strong>Código da disciplina:</strong> ${tutoria.disciplina.codigo}</p> 
                  <p><strong>Petiano responsável: </strong> ${tutoria.petiano.pessoa.nome}</p> 
                `
        },
        {
          title: 'Confirmação da tutoria',
          html: `Confirmo minha solicitação de tutoria na disciplina <strong> ${tutoria.disciplina.nome} </strong> pelo petiano <strong>${tutoria.petiano.pessoa.nome}</strong>.`
        }
      ])
      .then((result) => {
        if ( result.value != null) {

          this.$axios
            .get(`tutorias-ministradas-cadastro/${this.idPessoa}/${idTutoria}`)
            .then(res => {
              Swal.fire({
                title: "Tutoria solicitada",
                html: "Sua solicitação foi enviada para o email do responsável. Aguarde a confirmação" + 
                " de <strong>data e horário a ser enviada para o seu email</strong> que está cadastrado no sistema. Não esqueça de garantir que se trata de um email que você usa.",
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