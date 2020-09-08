<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2>
              <i class="fa fa-calendar-check-o px-2"></i>Eventos organizados
            </h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner
          style="width: 3rem; height: 3rem;"
          type="grow"
          variant="primary"
          label="Large Spinner"
        ></b-spinner>
      </div>
      <div v-else>
        <div v-if="eventos.length > 0">
          <b-table
            responsive="sm"
            :items="eventos"
            :current-page="currentPage"
            :bordered="false"
            striped
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <nuxt-link
                :to="`/usuario/eventos-organizados/gerenciar-anexos/${row.item.evento.idEvento}`"
                class="btn btn-sm btn-indigo mt-1"
              >
                <i class="fa fa-files-o fa-fw" ></i> Gerenciar anexos
              </nuxt-link>
              <nuxt-link
                :to="`/usuario/eventos-organizados/organizadores/?idEvento=${row.item.evento.idEvento}`"
                class="btn btn-sm btn-teal mt-1"
                style="color: white" 
              ><i class="fa fa-group fa-fw"></i> Organizadores</nuxt-link>
              <b-button
                :to="`/usuario/eventos-organizados/participantes/?idEvento=${row.item.evento.idEvento}`"
                class="btn btn-sm mt-1"
                variant="secondary"
              ><i class="fa fa-group fa-fw"></i> Participantes</b-button>
              <nuxt-link
                  :to="`/usuario/eventos-organizados/${row.item.idOrganizadores}`"
                  class="btn btn-sm btn-info mt-1"><i class="fa fa-eye fa-fw"></i>
                Detalhes</nuxt-link>
              <nuxt-link
                class="btn btn-sm btn-warning mt-1"
                :to="`/usuario/eventos-organizados/edit/${row.item.evento.idEvento}`"              
              ><i class="fa fa-pencil fa-fw"></i> Editar</nuxt-link>
            </template>
          </b-table>
          <div>
            <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage" />
          </div>
        </div>
        <div v-else>
          <h5>Nenhum evento organizado</h5>
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
      file:[],
      progressValue: 0,
      isLoading: true,
      keyword: "",
      eventos: [],
      currentPage: 0,
      numItems: 0,
      perPage: 20,
      fields: [
        { key: "evento.titulo", sortable: true, label: "Título" },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
    this.consumindoEventosOrganizandoApi();
  },
  watch: {
    currentPage: function(val) {
      this.$axios.get("eventos?page=" + val).then(res => {
        this.eventos = res.data.content;
        this.numPages = res.data.totalElements;
      });
    }
  },
  methods: {
    fazerUploadAnexo(evento) {
      const formData = new FormData()
      formData.append("file", this.file)
      this.$axios
        .post(`anexos-evento-upload/${evento.idEvento}`, formData, {
          onUploadProgress: uploadEvent => {
            this.progressValue = `${Math.round(uploadEvent.loaded/ uploadEvent.total * 100)}%`
          }
        })
        .then(res => {
          delete evento["_showDetails"]
          
          this.$axios
            .post(`anexos-evento-cadastro/${evento.idEvento}`, {
                anexos: res.data.anexos,
                idAnexo: res.data.idAnexo,
                evento: evento
              }
            )
            .then(res => {
              Swal.fire({
                title: "Anexo do evento enviado",
                icon: "success"
              })
              .then( () => {
                this.progressValue = 0
                evento["_showDetails"] = true
                this.file = []
              });
            })
            .catch(err => {
              Swal.fire({
                title: "Anexo do evento não enviado",
                text: "Tente novamente em outro momento.",
                icon: "error"
              });
            });
        })
        .catch(err => {
          Swal.fire({
            title: "Upload do anexo não concluído",
            text: "Tente novamente em outro momento.",
            icon: "error"
          });
        });
    },
    setCurrentPage(val) {
      this.currentPage = val;
    },
    cancelSearch() {
      this.keyword = "";
      this.consumindoEventosOrganizandoApi();
    },
    search() {
      this.$axios
        .get(`pesquisar-evento/${this.keyword}`)
        .then(res => {
          this.eventos = res.data.content;
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum evento organizando",
              icon: "info"
            });
          } else {
            Swal.fire({
              title: "Houve um problema...",
              text:
                "Por favor, tente recarregar a página. Caso não dê certo," +
                " tente novamente mais tarde.",
              icon: "error"
            });
          }
        });
    },
    consumindoEventosOrganizandoApi() {
      this.$axios
        .get(`organizadores-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.eventos = res.data;
          this.isLoading = false;
          this.numItems = res.data.length;
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum evento organizando",
              icon: "info"
            }).then(() => (this.isLoading = false));
          } else {
            Swal.fire({
              title: "Houve um problema...",
              text:
                "Por favor, tente recarregar a página. Caso não dê certo," +
                " tente novamente mais tarde.",
              icon: "error"
            }).then(() => (this.isLoading = false));
          }
        });
    }
  }
};
</script>

<style scoped>
h2,
h4,
h5 {
  font-weight: 300;
}
</style>