<template>
  <div>
    <div class="container pt-5">
      <h1 class="mt-5 mb-5 text-center"><i class="fa fa-users"></i> Ex-petianos</h1>
      <div class="mt-5 mb-2 ml-5 mr-5" v-if="membrosEmeritos.length > 0">
        <b-row class="mx-auto mb-5" align-h="center">
          <div v-for="petiano in membrosEmeritos" :key="petiano.id">
            <b-col class="mt-2 mb-4 ml-2 mr-2">
              <nuxt-link :to="`/sobre/ex-petianos/${petiano.idPetiano}`">

                <b-avatar v-if="petiano.foto != null" size="190px" :src="`https://petcc.dimap.ufrn.br:8443/downloadfile/${petiano.foto}`">
                </b-avatar>
                <b-avatar v-else size="190px">
                </b-avatar>
                
                <b-row class="mt-2" align-h="center">
                  <p class="pt-2 pb-2 pr-2 pl-2" style="text-align: justify">{{petiano.pessoa.nome }}</p>
                </b-row>
              </nuxt-link>  
            </b-col>
          </div>
        </b-row>
        <b-row class="mx-auto mt-5" align-h="center">
          <nav>
            <b-pagination
              :total-rows="numElements"
              :per-page="pageSize"
              pills
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </b-row>      
      </div>
      <div v-else>
        <h5 class="text-center">Nenhum ex-petiano cadastrado.</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: 'index',
  head () {
    return {
      title: 'PET-CC UFRN | Ex-petianos'
    }
  },
  data() {
    return {
      isLoading: true,
      tutorias: [],
      currentPage: 1,
      numElements: 1,
      pageSize: 20,
      mainProps: {width: 100, height: 100},
      mainPropsTutor: {width: 100, height: 100},
      membrosEmeritos: []
    };
  },
  mounted() {
    this.getPetianosAntigos();
  },
  watch: {
    currentPage: function(val){
      let aux
      this.$axios
        .get("petianos-antigos?page=" + (val-1))
        .then(res => {
          this.membrosEmeritos = res.data.content;
          this.membrosEmeritos.forEach(petiano => {
            if( petiano.foto != null) petiano.foto = this.filterNameFile(petiano.foto)
            aux = petiano.pessoa.nome.split(' ')
            petiano.pessoa.nome = `${aux[0]} ${aux[1]}`;
          });

          this.numElements = res.data.totalElements;
          this.pageSize = res.data.pageable.pageSize;
        });
    }
  },
  methods: {
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
    getPetianosAntigos() {
      let aux
      this.$axios
        .get("petianos-antigos?page=0")
        .then(res => {
          this.membrosEmeritos = res.data.content;
          this.membrosEmeritos.forEach(petiano => {
            if( petiano.foto != null) petiano.foto = this.filterNameFile(petiano.foto);

            aux = petiano.pessoa.nome.split(' ')
            petiano.pessoa.nome = `${aux[0]} ${aux[1]}`;
          });
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
        
        })
        .catch( err => {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," +
            " tente novamente mais tarde.",
            icon: 'error',
          })
        });
    }
  }
}
</script>


<style scoped>
  a {
    color: #000000;
  text-decoration: none;
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
  font-size: 40px;
}

h5 {
  font-size: 20px;
}

p.card-text {
  font-size: 17px;
}
@media(max-width: 500px){

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


