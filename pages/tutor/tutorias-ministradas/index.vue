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
      <div v-else>Nenhuma tutoria ministrada</div>
    </b-card>
  </div>
</template>

<script>


import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
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
    this.$axios.get("tutorias-ministradas").then(res => {
      this.tutorias_ministradas = res.data.content;
    });
  }
};
</script>

