<template>
  <div>
    <section class="header-site">
      <div class="container pt-5">
        <div class="row justify-content-center d-flex  align-items-center">
          <div class="col-xs-12 pt-5 pb-5">
            <b-img center src="/img/pet-logo.png" alt="Center image"></b-img>
            <h1 class="text-white text-center petcc">Programa de Educação Tutorial</h1>
            <h2 class="text-center mb-2">do Curso de Ciência da Computação</h2>
          </div>
        </div>
      </div>
    </section>
    <section class="container-site">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xs-12 pt-2">
            <h1 id="sobre" class="text-center pt-5">Sobre o PET-CC UFRN</h1>
            <p class="text-center pt-4 pr-2 pl-2">
              {{informacoes.sobre}}
            </p>
            <h1 class="mt-5 mb-2 text-center"><i class="fa fa-user"></i> Tutor</h1>
            <div class="pt-5" v-if="tutor.length > 0">
              <b-row class="mx-auto" align-h="center">
                <div v-for="petiano in tutor" :key="petiano.id">
                  <b-col class="mt-2 mb-4 ml-2 mr-2">
                    <nuxt-link :to="`/membro/${petiano.idPetiano}`">
                      <b-avatar v-if="petiano.foto != null" size="190px" :src="`http://177.20.148.190:8080/downloadfile/${petiano.foto}`">
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
            <h1 class="mt-5 mb-2 text-center"><i class="fa fa-users"></i> Membros ativos</h1>
            <div class="pt-5" v-if="membrosAtivos.length > 0">
              <b-row class="mx-auto" align-h="center">
                <div v-for="petiano in membrosAtivos" :key="petiano.id">
                  <b-col class="mt-2 mb-2 ml-2 mr-2">
                    <nuxt-link :to="`/membro/${petiano.idPetiano}`">
                      <b-avatar v-if="petiano.foto != null" size="190px" :src="`http://177.20.148.190:8080/downloadfile/${petiano.foto}`">
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
    </section>
    <section class="contact mb-5" id="contato">
      <b-row class="mx-auto pt-5" align-h="center">
        <b-col class="contact-dados" cols="5">
            <h1 class="pb-1" >Contato</h1>

            <p><strong>Email:</strong>
              <a :href="`mailto:${informacoes.email}`">{{informacoes.email}}</a>
            </p>
            <p><strong>Telefone:</strong>
              <a :href="`tel:${informacoes.telefone}`">{{informacoes.telefone}}</a>
            </p>
            <p class="mt-1 mb-2">
              <a class="mr-1" :href="informacoes.facebook" target="_blank"><i class="fa fa-facebook-square fa-lg text-black"></i> petccufrn</a>
            </p>
            <p class="mt-1 mb-2">
                <a :href="informacoes.youtube" target="_blank"><i class="fa fa-youtube-square fa-lg"></i> PET Ciência da Computação UFRN</a>
            </p>
            <p class="mt-1 mb-2">
              <a class="mr-1" :href="informacoes.instagram" target="_blank"><i class="fa fa-instagram fa-lg"></i> petccufrn</a>
            </p>
            <p class="mt-1 mb-1">
              <a class="mr-1" :href="informacoes.github" target="_blank"><i class="fa fa-github-square fa-lg"></i> PETCC-UFRN</a>
            </p>
        </b-col>
        <b-col class="contact-imagem">
          <div id="map-container-google-1" class="z-depth-1-half map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.0994332567075!2d-35.20050558520093!3d-5.841607859200002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ff75fe0da203%3A0x779ce70a2e19eceb!2sDepartamento%20de%20Inform%C3%A1tica%20e%20Matem%C3%A1tica%20Aplicada%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN!5e0!3m2!1sen!2sbr!4v1576003314468!5m2!1sen!2sbr"
              frameborder="0"
              style="border-radius:2px;"
              allowfullscreen
            ></iframe>
          </div>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>

export default {
  layout: 'index',
  data() {
    return {
      informacoes: {
        email:"",
        endereco:"",
        telefone:"",
        sobre:""
      },
      mainProps: {width: 100, height: 100},
      mainPropsTutor: {width: 100, height: 100},
      petianosAtuais: []
    };
  },

  mounted() {
    this.getPetianosAtuais();
    this.getInformacoes();
  },
  methods: {
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
    getPetianosAtuais() {
      this.$axios
        .get("petianos-atuais")
        .then(res => {
          this.petianosAtuais = res.data.content;
          this.petianosAtuais.forEach(petiano => {
            if( petiano.foto != null) petiano.foto = this.filterNameFile(petiano.foto);
          });
        })
    },
    getInformacoes() {
      this.$axios
        .get("informacoes")
        .then(res => {
          this.informacoes = res.data;
        });
    }
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
a {
  text-decoration: none;
}

a i {
  color:black !important;
}

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
  background-image: url('../static/img/backgroundLogo.jpg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
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
  padding-bottom: 70px;
}

@media(min-width: 500px){
  .contact {
    margin-left: 150px;
    margin-right: 150px;
  }

  .contact-dados {
    padding-left: 50px;
    padding-top: 30px;

  }
  .contact-imagem {
    padding-right: 50px;
  }
}

@media(max-width: 500px){
  .contact-dados p {
      font-size: 16px;
    }
}
.map-container {
  overflow: hidden;
  padding-bottom: 350px;
  position: relative;
  height: 0;
}
.map-container iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
