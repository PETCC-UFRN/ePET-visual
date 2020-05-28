<template>
  <div>
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Informações do site</h3>
          </b-col>
          <b-col>
          <nuxt-link
            class="btn btn-sm btn-warning float-right mt-4"
            to="/tutor/configuracoes/edit" 
          ><i class="fa fa-pencil fa-fw"></i> Editar informações</nuxt-link>
          </b-col>
        </b-row>
			</template>
 
			<b-card-body>
        <b-row>
          <b-col cols="12">
              
            <p class="mt-0 mb-1">
              <strong>Sobre o PET-CC:</strong>
              {{informacoes.sobre}}
            </p>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col>
            <p class="mt-0 mb-1">
              <strong>Telefone:</strong> 
              {{informacoes.telefone}}
            </p>
            <p class="mt-0 mb-1">
              <strong>Endereço:</strong> 
              {{informacoes.endereco}}
            </p>
            <p class="mt-0 mb-1">
              <strong>Email:</strong> 
              {{informacoes.email}}
            </p>

          </b-col>
          <b-col>
            <p class="mt-0 mb-1">
              <strong>Youtube:</strong> 
            </p>
            <p class="mt-0 mb-1">
              <strong>Instagram:</strong> 
            </p>
            <p class="mt-0 mb-1">
              <strong>Facebook:</strong> 
            </p>
            <p class="mt-0 mb-1">
              <strong>Github:</strong> 
            </p>
          </b-col>
        </b-row>
			</b-card-body> 
    </b-card>
  </div>
</template>

<script>


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
    this.$axios.get("informacoes").then(res => {
      this.informacoes = res.data;
    });
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
h3, h4 {
  font-weight: 300;
}
h5, h6 {
  display: inline;
  font-size: 18px;
}
</style>