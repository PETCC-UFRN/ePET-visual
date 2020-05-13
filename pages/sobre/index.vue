<template>
    <div >
        <Comum/>  
        <div class="container">
            <br>
            <h1 class="mt-3">Sobre o PET-CC</h1>
            <p class="mt-3 mb-3 ml-5 mr-5 about">
                O Programa de Educação Tutorial (<b>PET</b>) é um projeto nacional, organizado através
                de cursos de graduação das Instituições de Ensino Superior do Brasil. Diante disso, 
                nosso grupo está relacionado ao curso de Ciência da Computação (<b>CC</b>) da universidade
                federal do Rio grande do Norte (<b>UFRN</b>). Além disso, assim como cada PET, somos orientados por um tutor e nosso grupo é composto por <i>12</i> bolsistas e até <i>6</i> voluntários.
            </p>
            <hr>
            <h2 class="mt-3 mb-5"><i class="fas fa-user"></i> Tutor</h2>
            <div class="mt-5 mb-3 ml-5 mr-5" v-if="tutor.lenght != 0">
                <a href="#">
                  <b-row class="mx-auto" align-h="center">
                    <b-img rounded alt="Rounded image" v-bind="mainPropsTutor" fluid src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRL9fGJTj0nE9u8thAYVEDkUVkq_5bFpk5okSZSmVhuwYNooxk7" ></b-img> 
                  </b-row>
                  <b-row class="mt-1" align-h="center">
                    <h3>Umberto</h3>
                  </b-row> 
                </a>
            </div>
            <div v-else>
				<h3 id="centralizando">Não existe tutor cadastrado.</h3>
            </div>
            <hr>
            <h2 class="mt-3 mb-5"><i class="fas fa-users"></i> Membros ativos</h2>
            <div class="mt-5 mb-2 ml-5 mr-5" v-if="membrosAtivos.lenght == 0">
                <b-row class="mx-auto" align-h="center">
                  <div v-for="i in 18" :key="i.id">
                    <b-col class="mt-2 mb-4 ml-2 mr-2">
						          <a href="#"><b-img rounded alt="Rounded image" v-bind="mainProps" fluid src="https://avatars3.githubusercontent.com/u/26605942?s=460&v=4" ></b-img> </a>
                      <b-row class="mt-1" align-h="center">
                        <h3>Jhonattan</h3>
                      </b-row>
                    </b-col> 
                  </div>
                </b-row>
            </div>
            <div v-else>
				<h3 id="centralizando">Não existem membros ativos.</h3>
            </div>
            <hr>
            <h2 class="mt-3 mb-5"><i class="fas fa-users"></i> Membros eméritos</h2>
            <div class="mt-5 mb-5 ml-5 mr-5" v-if="membrosEmeritos.lenght != 0">
                <b-row class="mx-auto" align-h="center">
                  <div v-for="membro in membrosEmeritos" :key="membro.id">
                    <b-col class="mt-2 mb-2 ml-2 mr-2">
                      	<a :href="'/sobre/' + membro.idPetiano">
						  	<b-img rounded id="image" alt="Rounded image" v-bind="mainProps" fluid src="https://avatars3.githubusercontent.com/u/17532418?s=460&v=4"></b-img> 
                      		<b-row class="mt-1" align-h="center">
								<h3>{{membro.pessoa.nome}}</h3>
							</b-row>
						</a>
                    </b-col> 
                  </div>
                </b-row>
            </div>
            <div v-else>
				<h3 id="centralizando">Não existem membros eméritos.</h3>
				<br>
            </div>
        </div>
        <BottomBar/>
    </div>
</template>

<script>
import Comum from "~/components/Comum";


import BottomBar from "~/components/anonymous/BottomBar";


export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar,
    },
    data() {
        return {
            mainProps: { width: 200, height: 200 },
            mainPropsTutor: { width: 200, height: 150 },
            petianosAtuais: [],
            membrosEmeritos:[]
    };
  },
  mounted() {
    this.getPetianosAntigos();
    this.getPetianosAtuais();
  },
  methods: {
      async getPetianosAtuais() {
        this.$axios.get("petianos-atuais").then(res => {
            this.petianosAtuais = res.data.content;
            });
      },
      async getPetianosAntigos() {
        this.$axios.get("petianos-antigos").then(res => {
            this.membrosEmeritos = res.data.content;
            });
      }
  }, 
  computed: {
    tutor() {
      return this.petianosAtuais.filter(petiano => petiano.pessoa.tipo_usuario.nome === 'tutor')
    }, 
    membrosAtivos () {
      return this.petianosAtuais.filter(petiano => petiano.pessoa.tipo_usuario.nome !== 'tutor')
    }
  }
}
</script>


<style scoped>
a { 
	color: #000000; 
}

i.fab {
  font-size:50px;
  padding-right:20px;
  align-content: center;
}

#image {
  box-shadow: 0 0 5px #cccccc;
}

h1 {
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}

h2 {
  text-align: center;
  font-weight: bold;
  font-size: 36px;
}

h3 {
  font-size: 28px;
  text-align: left;
}

.about {
    text-align:center;
}


#centralizando {
	text-align: center;
}

p { 
  font-size:16px;
}

hr {
   margin: 40px 60px 40px; 
}

.divBottom {
    margin-bottom: 50px;
}

</style>

 
