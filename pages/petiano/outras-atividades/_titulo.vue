<template>
  <div class="col-md-12">
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Detalhes da atividade</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner
            style="width: 3rem; height: 3rem;"
            type="grow"
            variant="primary"
            label="Large Spinner"
          ></b-spinner>
        </div>
        <div v-else>
          <span class="mt-0 mb-2">
            <h5>Título:</h5>
            <h6>{{form.titulo}}</h6>
          </span>
          
          <p class="mt-3 mb-2">
            <strong>Conteudo:</strong>
            {{form.conteudo}}
          </p>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  layout: "menu/petiano",
  data() {
    return {
      isLoading: true,
			form: {
        titulo: "",
        conteudo: ""
      }
    };
  },
  filters: {
  },
  mounted() {
    this.$axios
      .get(`atividades/${this.$route.params.titulo}`)
      .then(res => {
        this.form = res.data;
        
        this.isLoading = false;
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);
      });
  },
  methods: {
  }
};
</script>


<style scoped>
ul {
  list-style: none;
  padding-left: 10px;
}
p {
  font-size: 15px;
}
strong {
  font-size: 16px;
}
h3,
h4 {
  font-weight: 300;
}
h5,
h6 {
  display: inline;
  font-size: 18px;
}
</style>