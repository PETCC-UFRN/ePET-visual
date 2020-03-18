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
                federal do Rio grande do Norte (<b>UFRN</b>). Além disso, assim como cada PET, somos orientados por um tutor, 
                atualmente o professor Umberto Costa e nosso grupo é composto por <i>12</i> bolsistas e até <i>6</i> voluntários.
            </p>
            <hr>
            <h2 class="mt-3 mb-5">Tutor</h2>
            <div class="mt-5 mb-5 ml-5 mr-5">
                <b-row>
                    <b-col cols="5">
                        <b-img class="img-avatar" fluid src="https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/Gamer_male_avatar_men_character_professions-512.png" ></b-img>
                    </b-col>
                    <b-col>
                        <b-row>
                            <h3>Umberto Souza da Costa</h3>
                        </b-row>
                        <b-row>
                            <p class="mt-3 mb-5">Descrição: t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            <b-row class="mx-auto">
                                <div >
                                    <a href="https://github.com/Samuellucas97" target="_blank"><i class="fab fa-github-square"></i></a>
                                    <a href="http://www.linkedin.com/in/samuel-lucas-a0802a154" target="_blank"><i class="fab fa-linkedin" ></i></a>
                                    <a href="https://dev.to/samuellucas97" target="_blank"><i class="fab fa-dev"></i></a>
                                    <a href="https://www.researchgate.net/profile/Samuel_Ferino" target="_blank"><i class="fab fa-researchgate"></i></a>
                                    <a href="https://stackoverflow.com/story/samuellucas97" target="_blank"><i class="fab fa-stack-overflow"></i></a>
                                </div>
                            </b-row>
                        </b-row>
                    </b-col>
                </b-row>
            </div>



            


            <!-- <div class="col-8 mx-auto">
                <h2 class="titulo">Tutor</h2>
                <div v-if="petianosAtuais.length > 0" class="col-lg-16">
                    <div v-for="petianoAtual in petianosAtuais" :key="petianoAtual.id">
                        <div v-if="petianoAtual.pessoa.tipo_usuario.nome === 'tutor'" class="space">
                            
                            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                                <b-row no-gutters>
                                    <b-col md="6">
                                        <b-card-img src="https://placekitten.com/300/300" class="rounded-0"></b-card-img>
                                    </b-col>
                                    <b-col md="6">
                                        <b-card-body title-tag="h2"  :title="petianoAtual.pessoa.nome" >
                                        <b-card-text text-tag="h5">
                                            <div v-if="petianoAtual.data_ingresso[6] >= 6">
                                                <p><b>Ingresso:</b> {{petianoAtual.data_ingresso.slice(0,4)}}.2</p>
                                            </div>
                                            <div v-else>
                                                <p><b>Ingresso:</b> {{petianoAtual.data_ingresso.slice(0,4)}}.1</p>
                                            </div>
                                            <p><b>Site pessoal:</b> {{petianoAtual.site_pessoal}}.</p>
                                            <p><b>Área de interesse:</b> {{petianoAtual.area_interesse}}.</p>
                                            <p><b>Lattes:</b> <a>{{petianoAtual.lattes}}</a></p>        
                                        </b-card-text>
                                        </b-card-body>
                                    </b-col>
                                    </b-row>
                            </b-card>
                        </div>
                    </div>        
                </div>
                <div v-else>
                    <br> 
                    <h3>Nenhum tutor cadastrado!</h3> 
                    <br>
                </div>
            </div>
            <hr>
            <div class="col-8 mx-auto">
                <h2 class="titulo">Membros</h2>
                <div v-if="petianosAtuais.length > 0" class="col-lg-16">
                    <div v-for="petianoAtual in petianosAtuais" :key="petianoAtual.id">
                        <div v-if="petianoAtual.pessoa.tipo_usuario.nome !== 'tutor'" class="space">
                            {{temPetiano = true}}
                            
                             <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                                <b-row no-gutters>
                                    <b-col md="6">
                                        <b-card-img src="https://placekitten.com/300/300" class="rounded-0"></b-card-img>
                                    </b-col>
                                    <b-col md="6">
                                        <b-card-body title-tag="h2"  :title="petianoAtual.pessoa.nome" >
                                            <b-card-text text-tag="h5">
                                                <div v-if="petianoAtual.data_ingresso[6] >= 6">
                                                    <p><b>Ingresso:</b> {{petianoAtual.data_ingresso.slice(0,4)}}.2</p>
                                                </div>
                                                <div v-else>
                                                    <p><b>Ingresso:</b> {{petianoAtual.data_ingresso.slice(0,4)}}.1</p>
                                                </div>
                                                <p><b>Site pessoal:</b> {{petianoAtual.site_pessoal}}.</p>
                                                <p><b>Área de interesse:</b> {{petianoAtual.area_interesse}}.</p>
                                                <p><b>Lattes:</b> <a>{{petianoAtual.lattes}}</a></p>        
                                            </b-card-text>
                                        </b-card-body>
                                    </b-col>
                                    </b-row>
                            </b-card>
                        </div>
                    </div>        
                </div>
                <div v-else> 
                    <br>
                    <h3> Nenhum petiano cadastrado!</h3> 
                    <br>
                </div>
                <div v-if="temPetiano === false"> 
                    <br>
                    <h3> Nenhum petiano cadastrado!</h3> 
                    <br>
                </div>    
            </div>
            <hr>

            <div class="divBottom col-8 mx-auto">
                <h2 class="titulo">Membros egressos</h2>
                <div v-if="petianosAntigos.length > 0" class="col-lg-16">
                    <div v-for="petianoAntigo in petianosAntigos" :key="petianoAntigo.id">

                        <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                            <b-row no-gutters>
                                <b-col md="6">
                                    <b-card-img src="https://placekitten.com/300/300" class="rounded-0"></b-card-img>
                                </b-col>
                                <b-col md="6">
                                    <b-card-body title-tag="h2"  :title="petianoAntigo.pessoa.nome" >
                                        <b-card-text text-tag="h5">
                                            <p><b>Site pessoal:</b> {{petianoAntigo.site_pessoal}}.</p>
                                            <p><b>Área de interesse:</b> {{petianoAntigo.area_interesse}}.</p>
                                            <p><b>Lattes:</b> <a>{{petianoAntigo.lattes}}</a></p>        
                                        </b-card-text>
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>        
                </div>
                <div v-else>
                    <br> 
                    <h3> Nenhum petiano egresso cadastrado!</h3>
                    <br> 
                </div>
            </div> -->

        </div>
        <BottomBar/>
    </div>
</template>

<script>
import Comum from "~/components/Comum";

import axios from "~/axios";
import BottomBar from "~/components/anonymous/BottomBar";


export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar,
    },
    data() {
        return {
            temPetiano: false,
            petianosAtuais: [],
            petianosAntigos:[]
    };
  },
  mounted() {
    this.getPetianosAntigos();
    this.getPetianosAtuais();
  },
  methods: {
      async getPetianosAtuais() {
        axios.get("petianos-atuais").then(res => {
            this.petianosAtuais = res.data.content;
            });
      },
      async getPetianosAntigos() {
        axios.get("petianos-antigos").then(res => {
            this.petianosAntigos = res.data.content;
            });
      }
  }
}
</script>


<style scoped>

i.fab {
  font-size:50px;
  padding-right:20px;
  align-content: center;
}


h1, h2 {
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}

h3 {
  font-size: 32px;
  text-align: left;
}

.about {
    text-align:center;
}

p { 
  font-size:16px;
  margin: 0px 0px 0px;
}

hr {
   margin: 40px 60px 40px; 
}

.divBottom {
    margin-bottom: 50px;
}

</style>

 
