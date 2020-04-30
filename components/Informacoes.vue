<template>
  <div>
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col cols="12">
            <h3>Informações do site</h3>
          </b-col>
          <b-col >
            <em>Informações públicas exibidas no site relacionadas ao PET-CC.</em>
          </b-col>
          <b-col>

          <b-button
            class="float-right mt-2"
            variant="warning"
            @click.prevent="goEditInformations()"
          ><i class="icon-wrench" aria-hidden="true"></i> Editar informações</b-button>
          </b-col>
        </b-row>
			</template>
 
			<b-card-body>
        <b-row>
          <b-col cols="12">
            <b-card header-tag="header"> 
              <template v-slot:header>
                <b-row>
                  <b-col cols="12">
                    <h4>Sobre o PET-CC</h4>
                  </b-col>
                </b-row>
              </template>
              <b-card-body>
                <p>{{informacoes.sobre}}</p>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card header-tag="header"> 
              <template v-slot:header>
                <b-row>
                  <b-col cols="12">
                    <h4>Contatos</h4>
                  </b-col>
                </b-row>
              </template>
              <b-card-body>
                <p><strong>Telefone:</strong> {{informacoes.telefone}}</p>
                <p><strong>Endereço:</strong> {{informacoes.endereco}}</p>
                <p><strong>Email:</strong> {{informacoes.email}}</p>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col>
            <b-card header-tag="header"> 
              <template v-slot:header>
                <b-row>
                  <b-col cols="12">
                    <h4>Redes socias</h4>
                  </b-col>
                </b-row>
              </template>
              <b-card-body>
                <p><strong>Youtube:</strong> </p>
                <p><strong>Instagram:</strong> </p>
                <p><strong>Facebook:</strong> </p>
                <p><strong>Github:</strong> </p>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
			</b-card-body> 
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";

export default {
  layout: "menu/tutor",
  data: function() {
    return {
      informacoes:{
        idInformacao: 1,
        sobre: "",
        telefone: "",
        endereco: "",
        email: ""
      }
    };
  },
  mounted() {
    axios.get("informacoes").then(res => {
      this.informacoes = res.data;
    });
  },
  methods: {
    goEditInformations() {
      this.$router.push("/tutor/configuracoes-site/edit");
    }
  }
};

</script>

<style scoped>

i {
  font-size:19px;
}
</style>