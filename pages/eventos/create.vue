<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Titulo</label>
            <input type="text" class="form-control" v-model="form.titulo" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Descrição</label>
            <input type="text" class="form-control" v-model="form.descricao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Local</label>
            <input type="text" class="form-control" v-model="form.local" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Carga Horaria</label>
            <input type="number" class="form-control" v-model="form.qtdCargaHoraria" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Dias</label>
            <input type="number" class="form-control" v-model="form.qtdDias" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Vagas</label>
            <input type="number" class="form-control" v-model="form.qtdVagas" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Valor</label>
            <input type="number" min="0" pattern="\d+" class="form-control" v-model="form.valor" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Data Inscrição</label>
            <input type="date" class="form-control" v-model="form.d_inscricao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Data Final das Inscrição</label>
            <input type="date" class="form-control" v-model="form.d_inscricao_fim" />
          </div>
          <div class="form-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import auth from "../../auth";

export default {
  layout: "menu/petiano",
  data() {
    return {
      form: {
        titulo: "teste",
        descricao: "testando",
        local: "rua dos testes",
        qtdCargaHoraria: 0,
        qtdDias: 0,
        qtdVagas: 0,
        valor: 0,
        d_inscricao_fim: "",
        d_inscricao: "",
        ativo: true,
      }
    };
  },
  methods: {
    submitForm(e) {
      axios
        .post("http://epet.imd.ufrn.br/api/eventos-cadastrar", auth, this.form)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(this.form));

      e.preventDefault();
    }
  }
};
</script>