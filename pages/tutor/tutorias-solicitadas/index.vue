<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias confirmadas</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="tutorias.length > 0">
          
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
             
             <b-button  @click="row.toggleDetails" class="btn btn-sm btn-info">
                {{ row.detailsShowing ? 'Esconder' : 'Mostrar'}} email do responsável
              </b-button>              
            </template>

            <template v-slot:row-details="row">
              <b-card>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                  <b-col>{{ row.item.tutoria.petiano.pessoa.usuario.email }}</b-col>
                </b-row>

              </b-card>
            </template>

          </b-table>
          <div>
            <Pagination :totalRows="numItemsTutoria" :perPage="perPage" v-on:currentPage="setCurrentPageTutoria" />
          </div>
        </div>
        <div v-else>
          <h5>Nenhuma tutoria confirmada</h5> 
        </div>
      </div>
    </b-card>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias solicitadas</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoadingInativas === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="tutoriasInativas.length > 0">
          
          <b-table
            responsive="sm"
            :items="tutoriasInativas"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fieldsInativa"
          >
            <template v-slot:cell(actions)="row">
             
             <b-button  @click="row.toggleDetails" class="btn btn-sm btn-info">
                {{ row.detailsShowing ? 'Esconder' : 'Mostrar'}} email do responsável
              </b-button>              
            </template>

            <template v-slot:row-details="row">
              <b-card>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                  <b-col>{{ row.item.tutoria.petiano.pessoa.usuario.email }}</b-col>
                </b-row>

              </b-card>
            </template>

          </b-table>
          <Pagination :totalRows="numItemsTutoriasInativas" :perPage="perPageInativas" v-on:currentPage="setCurrentPageTutoriasInativas" />
        </div>
        <div v-else>
          <h5>Nenhuma tutoria solicitada</h5> 
        </div>
      </div>
    </b-card>    
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias concluídas</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="tutoriasConcluidas.length > 0">
          
          <b-table
            responsive="sm"
            :items="tutoriasConcluidas"
            :current-page="currentPageTutoriasConcluidas"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fieldsConcluidas"
          >
          <template v-slot:cell(actions)="row">
             
             <b-button  @click="row.toggleDetails" class="btn btn-sm btn-info">
                {{ row.detailsShowing ? 'Esconder' : 'Mostrar'}} email do responsável
              </b-button>              
            </template>

            <template v-slot:row-details="row">
              <b-card>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                  <b-col>{{ row.item.tutoria.petiano.pessoa.usuario.email }}</b-col>
                </b-row>

              </b-card>
            </template>

          </b-table>
            <Pagination :totalRows="numItemsTutoriaConcluidas" :perPage="perPageC" v-on:currentPage="setCurrentPageTutoriasConcluidas" />
        </div>
        <div v-else>
          <h5>Nenhuma tutoria concluída</h5> 
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";
import Pagination from "~/components/Pagination";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      currentPageTutoria: 0,
      currentPageTutoriasConcluidas: 0,
      numItemsTutoria: 0,
      numItemsTutoriaConcluidas: 0, 
      numItemsTutoriasInativas: 0,
      perPage: 20,
      perPageConcluidas: 20,
      perPageInativas: 20,
      isLoading: true,
      isLoadingConluidas: true,
      isLoadingInativas: true,
      nomeCodigoDisciplina: false,
      nomemCpfResponsavel: false,
      tutorias: [],
      tutoriasConcluidas: [],
      tutoriasInativas: [],
      currentPage: 1,
      fields: [
        { key: "tutoria.disciplina.codigo", sortable: true, label: "Código" },
        { key: "tutoria.disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "tutoria.petiano.pessoa.nome", sortable: true, label: "Responsável" },
        { key: "data", sortable: true, label: "Data da tutoria", formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY')}  },
        { key: "actions", label: "Ações disponíveis"  }
      ],
      fieldsConcluidas: [
        { key: "tutoria.disciplina.codigo", sortable: true, label: "Código" },
        { key: "tutoria.disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "tutoria.petiano.pessoa.nome", sortable: true, label: "Responsável" },
        { key: "data", sortable: true, label: "Data da tutoria", formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY')}  },
      ],
      fieldsInativa: [
        { key: "tutoria.disciplina.codigo", sortable: true, label: "Código" },
        { key: "tutoria.disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "tutoria.petiano.pessoa.nome", sortable: true, label: "Responsável" },
        { key: "actions", label: "Ações disponíveis"  }
      ]
    };
  },
  mounted() {
    this.consumindoTutoriasMinistradasApi();
    this.consumindoTutoriasMinistradasConcluidasApi();
    this.consumindoTutoriasMinistradasInativasApi();
  },
  methods: {
    setCurrentPageTutoria(val) {
      this.currentPageTutoria = val;
    },
    setCurrentPageTutoriasConcluidas(val) {
      this.currentPageTutoriasConcluidas = val;
    },
    setCurrentPageTutoriasInativas (val) {
      this.setCurrentPageTutoriasInativas = val;
    },
    consumindoTutoriasMinistradasConcluidasApi() {
      this.$axios
        .get(`/pesquisar-pessoa-tutorias-ministradas-concluidas/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.tutoriasConcluidas = res.data.content;
          this.isLoadingConluidas = false;
          this.numItemsTutoriaConcluidas = res.data.totalElements;
        })
        .catch( err => {
          if (err.response.status === 404) {
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
          }
          this.isLoading = false;

        });
    },
    consumindoTutoriasMinistradasApi() {
      this.$axios
        .get(`/pesquisar-pessoa-tutorias-ministradas/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.tutorias = res.data.content;
          this.isLoading = false;
          this.numItemsTutoria = res.data.totalElements;

        })
        .catch( err => {
          if (err.response.status === 404) {
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
          }
          this.isLoading = false;

        });
    },
    consumindoTutoriasMinistradasInativasApi() {
      this.$axios
        .get(`/pesquisar-pessoa-tutorias-ministradas-ina/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.tutoriasInativas = res.data.content;
          this.isLoadingInativas = false;
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
    
  }
};
</script>

<style scoped>
h2, h4, h5 {
  font-weight: 300;
}
</style>