<template>
  <div class="animated fadeIn">
    <div>
      <b-row>
        <b-col md="12">
          <b-card >
            <template v-slot:header>
              <strong><i class="fa fa-edit"></i> Usuário</strong> <small>Formulário de criação</small>
              <div class="card-actions">
                <a href="/petiano/eventos/" class="btn btn-close"><i class="icon-close"></i></a>
              </div>
            </template> 
            <b-form>
              <b-form-group label="E-mail:">
                <b-form-input type="email" required placeholder="Insira o email" v-model="usuario.email"></b-form-input>
              </b-form-group>
              <b-form-group label="Senha:">
                <b-form-input required type="password" placeholder="Insira a senha" v-model="usuario.senha"></b-form-input>
              </b-form-group>
              <b-form-group label="Nome:">
                <b-form-input required placeholder="Insira o nome" v-model="usuario.nome"></b-form-input>
              </b-form-group>
              <b-form-group label="CPF:">
                <the-mask :mask="['###.###.###-##']"  class="form-control" placeholder="Ex.: 000.000.000-00" v-model="usuario.cpf" />
              </b-form-group>

              <div class="form-group">
                <b-button @click="criarUsuario()" variant="primary"><i class="fa fa-dot-circle-o"></i> Enviar</b-button>
                <b-button type="reset" variant="danger"><i class="fa fa-ban"></i> Limpar campos</b-button>
              </div>  

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
import {TheMask} from 'vue-the-mask'


export default {
  layout: "menu/petiano",
  components: {TheMask},

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
      await this.$axios
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
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      
      this.usuario.email = ""
      this.usuario.senha = ""
      this.usuario.nome = ""
      this.usuario.cpf = ""
          
    }
  }
};
</script>