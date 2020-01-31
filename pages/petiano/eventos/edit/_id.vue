<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Titulo</label>
            <input type="text" class="form-control" v-model="form.titulo" />
          </div>
          
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "~/axios";

export default {
  layout: "menu/petiano",
  validate ({ params }) {
    // Id da rota deve ser um número
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      form: {
        titulo: "",
        descricao: "",
        local: "",
        qtdCargaHoraria: 0,
        qtdDias: 0,
        qtdVagas: 0,
        valor: 0,
        d_inscricao_fim: "",
        d_inscricao: "",
        ativo: false
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  mounted(){
    axios.get('eventos/'+ this.$route.params.id).then((res) => {
        this.form = res.data;
    });
  },
  methods: {
    submitForm(e) {
      axios
        .post("eventos-cadastrar", this.form)
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Evento editado com sucesso";
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message = "Evento NÃO editado. Tente novamente";
        });
      e.preventDefault();
    }
  }
};
</script>