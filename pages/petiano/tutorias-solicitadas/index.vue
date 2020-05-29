<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias marcadas</h2>
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
          <nav>
            <b-pagination
              :total-rows="tutorias.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhuma tutoria marcada</h5> 
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
          <nav>
            <b-pagination
              :total-rows="tutoriasInativas.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhuma tutoria solicitada</h5> 
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      isLoading: true,
      isLoadingInativas: true,
      nomeCodigoDisciplina: false,
      nomemCpfResponsavel: false,
      tutorias: [],
      tutoriasInativas: [],
      currentPage: 1,
      fields: [
        { key: "tutoria.disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "tutoria.disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "tutoria.petiano.pessoa.nome", sortable: true, label: "Responsável" },
        { key: "data", sortable: true, label: "Data da tutoria", formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY')}  },
        { key: "actions", label: "Ações disponíveis"  }
      ],
      fieldsInativa: [
        { key: "tutoria.disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "tutoria.disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "tutoria.petiano.pessoa.nome", sortable: true, label: "Responsável" },
        { key: "actions", label: "Ações disponíveis"  }
      ]
    };
  },
  mounted() {
    this.consumindoTutoriasMinistradasApi();
    this.consumindoTutoriasMinistradasInativasApi();
  },
  methods: {
    consumindoTutoriasMinistradasApi() {
      this.$axios
        .get(`/pesquisar-pessoa-tutorias-ministradas/${this.$store.state.profile.idPessoa}`)
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
    consumindoTutoriasMinistradasInativasApi() {
      this.$axios
        .get(`/pesquisar-pessoa-tutorias-ministradas-ina/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.tutoriasInativas = res.data.content;
          this.isLoadingInativas = false;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhuma tutoria aguardando confirmacao",
              icon: 'info',
            })
            .then( () => this.isLoadingInativas = false );
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
            .then( () => this.isLoadingInativas = false );
          }
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