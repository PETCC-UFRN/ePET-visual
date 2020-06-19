<template>
  <div>
    <section class="header-site">
      <div class="container pt-5">
        <div class="row justify-content-center d-flex  align-items-center">
          <div class="col-xs-12 pt-5">
            <b-img center src="/img/logo.svg" alt="Center image"></b-img>
            <h1 class="text-white text-center petcc">Programa de Educação Tutorial</h1>
            <h2 class="text-center mb-2">Ciência da Computação</h2>            
            <p class="text-center">
              <button href="#sobre" class="mt-5 btn btn-outline-info btn-circle btn-xl"><i class="fa fa-arrow-down text-white"></i></button>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="container-site">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xs-12 pt-2">
            <h1 id="sobre" class="text-center pt-5">Sobre o PET-CC</h1>
            <p class="text-center pt-4 pr-2 pl-2"> 
              O Programa de Educação Tutorial (PET) é um projeto nacional, organizado 
              através de cursos de graduação das Instituições de Ensino Superior do Brasil. 
              Diante disso, nosso grupo está relacionado ao curso de Ciência da Computação (CC) 
              da universidade federal do Rio grande do Norte (UFRN). Além disso, assim como cada PET, 
              somos orientados por um tutor, atualmente o professor Umberto Costa e nosso grupo é 
              composto por 12 bolsistas e até 6 voluntários.
            </p>
            <h1 class="mt-5 mb-2 text-center"><i class="fa fa-user"></i> Tutor</h1>
            <div class="pt-5" v-if="tutor.length > 0">
              <b-row class="mx-auto" align-h="center">
                <div v-for="petiano in tutor" :key="petiano.id">
                  <b-col class="mt-2 mb-4 ml-2 mr-2">
                    <b-avatar size="200px" src="https://avatars3.githubusercontent.com/u/26605942?s=460&v=4">
                    </b-avatar>
                    <b-row class="mt-2" align-h="center">
                      <p class="nome pt-2 pb-2 pr-2 pl-2" style="text-align: justify">{{petiano.pessoa.nome }}</p>
                    </b-row>
                  </b-col>
                </div>
              </b-row>
            </div>
            <h1 class="mt-5 mb-2 text-center"><i class="fa fa-users"></i> Membros ativos</h1>
            <div class="pt-5" v-if="membrosAtivos.length > 0">
              <b-row class="mx-auto" align-h="center">
                <div v-for="petiano in membrosAtivos" :key="petiano.id">
                  <b-col class="mt-2 mb-2 ml-2 mr-2">
                    <b-avatar size="200px" src="https://avatars3.githubusercontent.com/u/26605942?s=460&v=4">
                    </b-avatar>
                    <b-row class="mt-2" align-h="center">
                      <p class="nome pt-2 pb-2 pr-2 pl-2" style="text-align: justify">{{petiano.pessoa.nome }}</p>
                    </b-row>
                  </b-col>
                </div>
              </b-row>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="contact">
      <h1 class="text-center pt-3">Contato</h1>
    </section>
  </div>
</template>

<script>

export default {
  layout: 'index',
  data() {
    return {
      mainProps: {width: 100, height: 100},
      mainPropsTutor: {width: 100, height: 100},
      petianosAtuais: []
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
        })
    },
  },
  computed: {
    tutor() {
      return this.petianosAtuais.filter(petiano => petiano.pessoa.tipo_usuario.nome === 'tutor')
    },
    membrosAtivos() {
      return this.petianosAtuais.filter(petiano => petiano.pessoa.tipo_usuario.nome !== 'tutor')
    }
  }
}
</script>

<style scoped>
.btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px !important;
    font-size: 24px;
    line-height: 1.33;
}

.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 15px !important;
    text-align: center;
    font-size: 24px;
    line-height: 1.42857;
}

.header-site {
  background-image: url('https://i.imgur.com/YXwU87x.jpg');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-attachment: fixed;
}

.container-site {  
  padding-bottom: 50px; 
}
h1 {
  font-weight: 300;
  font-size: 36px;
}
.petcc {
  text-shadow: #000 2px 3px 2px;
}

h2 {
  text-decoration: underline;
  font-weight: 550;
  color: #050002;
}

@media(max-width: 500px){
  img {
    max-width: 240px;
  }
} 
p {
  font-size: 19px;
}
.nome {
  font-size: 17px;
  font-weight: 300;
  background: white;
  border-radius: 5px;
}

.contact {
  background: white;
}

@media(min-width: 500px){
  .contact {
    margin-left: 100px;
    margin-right: 100px;
  }
} 
</style>