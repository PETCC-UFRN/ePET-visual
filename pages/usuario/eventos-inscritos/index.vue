<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2>
              <i class="fa fa-calendar-check-o px-2"></i>Eventos inscritos
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
                :to="`/usuario/eventos-inscritos/${row.item.idParticipantes}`"
                class="btn btn-sm btn-info"
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
                Informações
              </nuxt-link>
            </template>
          </b-table>
          <div>
            <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage" />
          </div>
        </div>
        <div v-else>
          <h5>Inscrito em nenhum evento</h5>
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
  layout: "menu/usuario",
  components: {
    Pagination
  },

  data() {
    return {
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
    this.consumindoEventosParticipandoApi();
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
    setCurrentPage(val) {
      this.currentPage = val;
    },
    cancelSearch() {
      this.keyword = "";
      this.consumindoEventosParticipandoApi();
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
    consumindoEventosParticipandoApi() {
      this.$axios
        .get(`participantes-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.eventos = res.data.content;
          this.isLoading = false;
          this.numItems = res.data.totalElements;
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum evento participando",
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