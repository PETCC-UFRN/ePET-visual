<template>
  <div>
    <b-card>

      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias ministradas</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="tutorias_ministradas.length > 0">
          <b-table
            responsive="sm"
            :items="tutorias_ministradas"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
          </b-table>
          <nav>
            <b-pagination
              :total-rows="tutorias_ministradas.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>

        </div>
        <div v-else>
          <h5>Nenhuma tutoria ministrada</h5>
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
  layout: "menu/tutor",
  data() {
    return {
      isLoading: true,
      tutorias_ministradas: [],
      currentPage: 1,
      fields: [
        { key: "tutoria.disciplina.codigo", label:"Código", sortable: true },
        { key: "tutoria.disciplina.nome", label:"Disciplina", sortable: true },
        { key: "data", label:"Data de ministração", sortable: true, formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') }  },
        { key: "tutoria.petiano.pessoa.nome", label:"Responsável", sortable: true },
        { key: "pessoa.nome", label:"Solicitante", sortable: true },
      ]
    };
  },
  mounted() {
    this.$axios
      .get("tutorias-ministradas")
      .then(res => {
        this.tutorias_ministradas = res.data.content;
        this.isLoading = false;
      })
      .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhuma tutoria ministrada",
                icon: 'info',
              });
            }
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: 'error',
              });
            } 
            this.isLoading = false;

        });
      }
};
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
}
</style>