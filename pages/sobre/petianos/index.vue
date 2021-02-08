<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-4 text-center"><i class="fa fa-users"></i> Petianos</h1>  
        <div class="pt-5 mb-4" v-if="membrosAtivos.length > 0">
            <b-row class="mx-auto" align-h="center">
            <div v-for="petiano in membrosAtivos" :key="petiano.id">
                <b-col class="mt-2 mb-2 ml-2 mr-2">
                <nuxt-link :to="`/sobre/petianos/${petiano.idPetiano}`">
                    <b-avatar v-if="petiano.foto != null" size="190px" :src="`https://petcc.dimap.ufrn.br:8443/downloadfile/${petiano.foto}`">
                    </b-avatar>
                    <b-avatar v-else size="190px">
                    </b-avatar>
                <b-row class="mt-2" align-h="center">
                    <p class="nome pt-2 pb-2 pr-2 pl-2" style="text-align: justify">{{petiano.pessoa.nome }}</p>
                    </b-row>
                </nuxt-link>
                </b-col>
            </div>
            </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'index',
	head () {
		return {
			title: 'PET-CC UFRN | Petianos'
		}
	},
  data() {
    return {
        petianosAtuais: []
    }
  },
  mounted() {
    this.getPetianosAtuais();
  },
  methods: {
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
    getPetianosAtuais() {
       let aux

      this.$axios
        .get("petianos-atuais")
        .then(res => {
          this.petianosAtuais = res.data.content;
          this.petianosAtuais.forEach(petiano => {
            if( petiano.foto != null) petiano.foto = this.filterNameFile(petiano.foto);
            
            aux = petiano.pessoa.nome.split(' ')
            petiano.pessoa.nome = `${aux[0]} ${aux[1]}`;
          });
        })
        .catch(err => {
          if (err.response.status === 404) {}
          else if (err.response.status === 403) {
            Swal.fire({
              title: "Houve um problema...",
              text: "Verifique se possui a permissão necessária ou se a sessão foi expirada. "
              + "Caso a sessão tenha sido expirado, tente novamente.",
              icon: "error"
            })
            .then( () => this.$route.push('/login'));
          } 
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: "error"
            })
          }
        });
    },
  },
  computed: {
    membrosAtivos() {
        return this.petianosAtuais.filter(petiano => petiano.pessoa.tipo_usuario.nome !== 'tutor')
        }
    }
}
</script>


<style scoped>

.nome {
  font-size: 17px;
  font-weight: 300;
  background: white;
  border-radius: 5px;
}
p {
  font-size: 18px;
  text-align: justify;
}
a {
	color: #000000;
	text-decoration: none;
 }


h1 {
  font-weight: 300;
  font-size: 38px;
}


h2, h4 {
  font-weight: 300;
}

h5 {
  font-size: 20px;
}

p.card-text {
  font-size: 20px;
}
@media(max-width: 500px){
  h5 {
    font-size: 17.5px;
  }
  p.card-text {
    font-size: 15px;
  }
} 
em{
  font-size: 16px;
}

.cards {
  margin-bottom: 20px;
}


.container-fluid {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: 91.7vh;
}

</style>
