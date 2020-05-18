<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-header">
        <strong>
          <i class="fa fa-edit"></i> Pessoas cadastradas
        </strong>
        <small>Formulário de edição</small>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Nome:</label>
            <input type="text" class="form-control" placeholder="Digite o nome" v-model="form.nome" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">CPF:</label>
            <input type="text" class="form-control" placeholder="Digite o CPF" v-model="form.cpf" />
          </div>
          <div class="form-group">
            <b-button type="submit" variant="primary">
              <i class="fa fa-dot-circle-o"></i> Salvar modificações
            </b-button>
            <a href="/tutor/pessoas-cadastradas/" class="btn btn-danger">
              <i class="fa fa-ban"></i> Cancelar
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  layout: "menu/tutor",
  data() {
    return {
      form: {
        idPessoa: "",
        nome: "",
        cpf: "",
        tipo_usuario: ""
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  mounted() {
    this.form = JSON.parse(this.$route.query.data);
  },
  methods: {
    submitForm(e) {
      this.$axios
        .post(
          "pessoas-cadastro-atualizar/" +
            this.form.tipo_usuario.idTipo_usuario +
            "/" +
            this.form.usuario.idUsuario,
          this.form
        )
        .then(res => {
          Swal.fire({
            title: "Cadastro atualizado com sucesso",
            icon: "success"
          }).then(() => {
            this.$router.push('/tutor/pessoas-cadastradas/edit/' + this.$route.params.id + '?data=' + JSON.stringify(this.form));
          });
        })
        .catch(err => {
          Swal.fire({
            title:
              "Algo deu errado na hora de editar os dados. Tente novamente mais tarde!",
            icon: "error"
          });
        });
    }
  }
};
</script>