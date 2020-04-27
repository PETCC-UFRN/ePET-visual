<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
    </b-alert>
    <div class="card" id="b">
      <div class="card-header">
        <b-row>
          <b-col cols="12">
            <h3><i class="fa fa-edit"></i> Pessoas cadastradas</h3> 
          </b-col>
          <b-col>
            <h5>Formulário de edição</h5>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Nome:</label>
            <input type="text" class="form-control" placeholder="Digite o nome" v-model="pessoa.nome" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">CPF:</label>
            <the-mask :mask="['###.###.###-##']" class="form-control" placeholder="Ex.: 000.000.000-00" v-model="pessoa.cpf" />
          </div>
          <div class="form-group">
            <b-button class="mt-3 " type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button class="mt-3" href="/petiano/pessoas-cadastradas/" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "~/axios";
import {TheMask} from 'vue-the-mask';

export default {
  layout: "menu/petiano",
  components: {
    TheMask
  },
  data() {
    return {
      pessoa: {
        idPessoa: 0, 
        nome: "", 
        cpf: "", 
        tipo_usuario: {
          idTipo_usuario: 3, 
          nome: "comum"
        },
        usuario: {
          idUsuario: 0, 
          email: ""
        }
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  mounted() {
    axios.get("pesquisar-pessoa/" + this.$route.query.cpf).then(res => {
      this.pessoa = res.data.content[0];
    });
  },
  methods: {
    submitForm(e) {
      axios
        .post("pessoas-cadastro-atualizar/" + this.pessoa.tipo_usuario.idTipo_usuario 
          + "/" + this.pessoa.usuario.idUsuario, this.pessoa).then(res => {
            
          this.alert.class = "success";
          this.alert.message = "Pessoa editada com sucesso";

          this.$router.push({
              path: '/petiano/pessoas-cadastradas/',
            })
        })
      .catch(err => {
        this.alert.class = "danger";
        this.alert.message = "Pessoa não editada. Tente novamente.";
      });
    }
  }
};
</script>

<style scoped>

h5 {
  line-height: 1.6;
}
</style>
