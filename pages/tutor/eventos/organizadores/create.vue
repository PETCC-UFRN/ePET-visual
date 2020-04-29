<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3><i class="fa fa-edit"></i> Cadastrar organizador</h3>             
          </b-col>
          <b-col>
            <div class="card-actions">
              <nuxt-link to="/tutor/eventos/organizadores" class="btn btn-close">
                <i class="icon-close"></i>
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Pessoa:</label>
            <select class="form-control" v-model="form.pessoa">
              <option
                v-for="participante in pessoas"
                :key="participante.idPessoa"
                :value="participante.idPessoa"
              >{{ participante.nome }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Evento:</label>
            <select class="form-control" v-model="form.evento">
              <option
                v-for="evento in eventos"
                :key="evento.idEvento"
                :value="evento.idEvento"
              >{{ evento.titulo }}</option>
            </select>
          </div>
          <!--<div class="form-group">
            <label for="exampleFormControlInput1">confirmado</label>
            <input type="bool" class="form-control" v-model="form.confirmado" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">espera</label>
            <input type="bool" class="form-control" v-model="form.espera" />
          </div>-->
          <div class="form-group">
            <b-button type="submit" variant="primary">
              <i class="fa fa-dot-circle-o"></i> Enviar
            </b-button>
            <b-button type="reset" variant="danger">
              <i class="fa fa-ban"></i> Limpar campos
            </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "~/axios";

export default {
  layout: "menu/tutor",
  data() {
    return {
      form: {
        pessoa: 0,
        evento: 0
      },
      alert: {
        message: "",
        class: ""
      },
      pessoas: {},
      eventos: {}
    };
  },
  methods: {
    submitForm(e) {
      axios
        .post(
          "organizadores-cadastrar/" + this.form.evento + "/" + this.form.pessoa
        )
        .then(res => {
          this.alert.class = "success";
          this.alert.message = "Organizador cadastrado com sucesso.";
          this.form = Object.entries(this.form).map(item => {
            return (item = "");
            this.$router.push({ path: "/tutor/eventos/organizadores" });
          });
        })
        .catch(err => {
          this.alert.class = "danger";
          this.alert.message =
            "Organizador não cadastrado. Por favor, tente novamente";
        });
      e.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.pessoa = 0;
      this.form.evento = 0;
    }
  },
  mounted() {
    axios.get("pessoas").then(res => {
      this.pessoas = res.data.content;
    });

    axios.get("eventos-abertos").then(res => {
      this.eventos = res.data;
    });
  }
};
</script>