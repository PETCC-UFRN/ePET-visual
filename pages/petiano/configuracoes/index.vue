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
            to="/petiano/configuracoes/edit" 
          ><i class="fa fa-pencil fa-fw"></i> Editar</nuxt-link>
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
          <b-col>
            <p class="mt-1 mb-1">
              <strong>Endereço físico:</strong> 
              {{informacoes.endereco}}
            </p>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <p class="mt-0 mb-2">
              <strong><i class="fa fa-phone fa-lg"></i> </strong> 
              {{informacoes.telefone}}
            </p>
            <p class="mt-1 mb-2">
              <strong><i class="fa fa-envelope fa-lg"></i></strong> 
              {{informacoes.email}}
            </p>
            <p class="mt-1 mb-1">
              <strong><i class="fa fa-facebook-square fa-lg"></i></strong>
                <a class="mr-1" :href="informacoes.facebook" target="_blank">petccufrn</a>
            </p>
          </b-col>
          <b-col>
            <p class="mt-0 mb-2">
              <strong><i class="fa fa-youtube-square fa-lg"></i></strong>
                <a :href="informacoes.youtube" target="_blank">PET Ciência da Computação UFRN</a>
            </p>
            <p class="mt-1 mb-2">
              <strong><i class="fa fa-instagram fa-lg"></i></strong>
                <a class="mr-1" :href="informacoes.instagram" target="_blank">petccufrn</a>
            </p>
            <p class="mt-1 mb-1">
              <strong><i class="fa fa-github-square fa-lg"></i></strong>
                <a class="mr-1" :href="informacoes.github" target="_blank">PETCC-UFRN</a>
            </p>
          </b-col>
        </b-row>
			</b-card-body> 
    </b-card>
  </div>
</template>

<script>


export default {
  layout: "menu/petiano",
  data: function() {
    return {
      informacoes:{
        idInformacao: 1,
        sobre: "",
        telefone: "",
        endereco: "",
        email: "",
        github: "",
        facebook: "",
        instagram: "",
        youtube:""
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
p, a {
  font-size: 17px;
}
strong {
  font-size: 19px;
}
h3, h4 {
  font-weight: 300;
}
h5, h6 {
  display: inline;
  font-size: 18px;
}
</style>