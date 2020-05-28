<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias solicitadas</h2>
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
            :bordered="true"
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-button 
              
              v-b-toggle="`collapse-${row.item.idTutoriaMinistrada}`"
                        
                class="btn btn-sm btn-info"
                ><i class="fa fa-eye fa-fw"></i>
                Email do reponsável 
              </b-button>

              <b-collapse class="mt-3" 
                      :id="`collapse-${row.item.idTutoriaMinistrada}`">
                <b-card>{{row.item.tutoria.petiano.pessoa.usuario.email}} </b-card>
              </b-collapse>

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
          <h5>Nenhuma tutoria cadastrada ou ativa</h5> 
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
        { key: "tutoria.disciplina.codigo", sortable: true, label: "Código da disciplina" },
        { key: "tutoria.disciplina.nome", sortable: true, label: "Disciplina" },
        { key: "tutoria.petiano.pessoa.nome", sortable: true, label: "Responsável" },
        { key: "data", sortable: true, label: "Data da tutoria", formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY')}  },
        { key: "actions", sortable: true, label: "Ações disponíveis"  }
      ]
    };
  },
  mounted() {
    this.consumindoTutoriasMinistradasApi();
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