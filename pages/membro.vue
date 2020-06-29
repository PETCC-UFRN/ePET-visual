<template>
  <div >
    <div class="container pt-5">
      <h1 class="mt-4 mb-2"><nuxt-link to="/#"> <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
 Voltar ao início</nuxt-link></h1>
      <hr>
      <div class="mt-3 mb-5 ml-2 mr-2">
        <b-row>
          <b-col sm="3">
            <b-avatar aligner="center" size="220px" src="https://avatars3.githubusercontent.com/u/26605942?s=460&v=4"></b-avatar>
          </b-col>
          <b-col>
            <b-row class="mt-2">
              <b-col>
                <h3>Umberto Souza da Costa</h3> 
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mt-1 mb-1" cols="12">
                <span><a href="mailto:#"><i class="fa fa-envelope" style="color:black;"></i>  abraaovld@gmail.com</a> </span>
              </b-col>
              <b-col class="mt-0 mb-2" cols="12">
                <span><a href="#"> <i class="fa fa-university" style="color:black;"></i> lattes.cnpq.br/0832251893442489</a></span>
              </b-col>
              <b-col class="mt-2 mb-2">
                <span><strong>Áreas de interesse:</strong> Linguagens de Programação, Composição de Módulos/Serviços, Bancos de Dados em Grafos.</span>
              </b-col>  
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'index',
  data() {
    return {
        petianosAtuais: [],
    };
  },
  mounted() {
    this.getPetianosAtuais();
  },
  methods: {
    getPetianosAtuais() {
      this.$axios
        .get("petianos-atuais")
        .then(res => {
          this.petianosAtuais = res.data.content;
        });
    },
  }
}
</script>


<style scoped>
a {
  text-decoration: none;
}

span {
  font-size: 19px;
}
h1 {
  font-weight: 300;
  font-size: 30px;
}

h3 {
  font-weight: 300;
  font-size: 25px;
}

</style>

 
