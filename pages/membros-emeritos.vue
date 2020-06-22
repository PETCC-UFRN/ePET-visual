<template>
  <div>
    <div class="container pt-5">
      <h1 class="mt-5 mb-5 text-center"><i class="fa fa-users"></i> Membros eméritos</h1>
      <div class="mt-5 mb-2 ml-5 mr-5" v-if="membrosEmeritos.length > 0">
        <b-row class="mx-auto" align-h="center">
          <div v-for="petiano in Emeritos" :key="petiano.id">
            <b-col class="mt-2 mb-4 ml-2 mr-2">
              <b-avatar size="200px" src="https://avatars3.githubusercontent.com/u/26605942?s=460&v=4">
              </b-avatar>
              <b-row class="mt-2" align-h="center">
                <p class="pt-2 pb-2 pr-2 pl-2" style="text-align: justify">{{petiano.pessoa.nome }}</p>
              </b-row>
            </b-col>
          </div>
        </b-row>
      </div>
      <div v-else>
        <h5 class="text-center">Nenhum membro emérito cadastrado</h5>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    layout: 'index',
    data() {
      return {
        mainProps: {width: 100, height: 100},
        mainPropsTutor: {width: 100, height: 100},
        membrosEmeritos: []
      };
    },
    mounted() {
      this.getPetianosAntigos();
    },
    methods: {
      getPetianosAntigos() {
        this.$axios
          .get("petianos-antigos")
          .then(res => {
            this.membrosEmeritos = res.data.content;
          });
      }
    }
  }
</script>


<style scoped>
  a {
    color: #000000;
  }

  i.fab {
    font-size: 50px;
    padding-right: 20px;
    align-content: center;
  }

  #image {
    box-shadow: 0 0 5px #cccccc;
  }
h1 {
  font-weight: 300;
  font-size: 50px;
}

h5 {
  font-size: 20px;
}

p.card-text {
  font-size: 17px;
}
@media(max-width: 500px){
  h1 {
    font-size: 40px;
  }

  h5 {
    font-size: 17.5px;
  }
} 

  .about {
    text-align: center;
  }


  #centralizando {
    text-align: center;
  }

  p {
    font-size: 17px;
    font-weight: 300;
    background: white;
    border-radius: 5px;
  }

.container {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: 91.7vh;
}
</style>


