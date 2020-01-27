<template>
  <div class="animated fadeIn">
    <div>
      <b-row>
        <b-col md="12">
          <b-card header="Criar Usuário">
            <b-form>
              <b-form-group label="E-mail">
                <b-form-input type="email" required placeholder="Insira o título" v-model="usuario.email"></b-form-input>
              </b-form-group>
              <b-form-group label="Senha">
                <b-form-input required type="password" placeholder="Insira o título" v-model="usuario.senha"></b-form-input>
              </b-form-group>
              <b-form-group label="Nome">
                <b-form-input required placeholder="Insira o nome" v-model="usuario.nome"></b-form-input>
              </b-form-group>
              <b-form-group label="CPF">
                <b-form-input required  class="form-control cpf-mask" placeholder="Ex.: 00000000000" v-model="usuario.cpf"></b-form-input>
              </b-form-group>

              <b-button @click="criarUsuario()" variant="primary">Cadastrar</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  //middleware: 'auth',
  name: "admin",
  layout: "adminLayout",
  components: {},
  data: function() {
    return {
      usuario: {
        email: "",
        senha: "",
        nome: "",
        cpf: ""
      },
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"])
  },
  methods: {
    async criarUsuario() {
      await axios
        .post(
          "http://localhost:8080/api/usuarios-cadastrar/",
          {
            email: this.usuario.email,
            senha: this.usuario.senha,
            nome: this.usuario.nome,
            cpf: this.usuario.cpf
          },
          { auth: { username: "h@email.com", password: "password" } }
        )
        .then(res => console.log(res));
      
    }
  }
};
</script>