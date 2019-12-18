<template>
  <div >
        <Comum/>  
        <div  class="container">
            <div>
                <br>
                <div>
                    <h2 class="titulo">Sobre o PET-CC</h2>
                    <p style="text-align:center; font-size:20px">
                        O Programa de Educação Tutorial (<b>PET</b>) é um projeto nacional, organizado através
                        de cursos de graduação das Instituições de Ensino Superior do Brasil. Diante disso, 
                        nosso grupo está relacionado ao curso de Ciência da Computação (<b>CC</b>) da universidade
                        federal do Rio grande do Norte (<b>UFRN</b>). Além disso, assim como cada PET, somos orientados por um tutor, 
                        atualmente o professor Umberto Costa e nosso grupo é composto por <i>12</i> bolsistas e até <i>6</i> voluntários.
                    </p>
                    <hr>
                </div>
                
                <div class="col-8 mx-auto">
                    <h2 class="titulo">Tutor</h2>
                    <div v-if="petianosAtuais.length > 0" class="col-lg-16">
                        <div v-for="petianoAtual in petianosAtuais" :key="petianoAtual.id">
                            <div v-if="petianoAtual.pessoa.tipo_usuario.nome === 'tutor'">
                                <b-card 
                                    :title="petianoAtual.pessoa.nome" 
                                    title-tag="h2" 
                                    img-src="https://placekitten.com/300/300" 
                                    img-alt="Card image" img-left class="mb-3">
                                    <b-card-text text-tag="h5">
                                        <p><b>Ingresso:</b> {{petianoAtual.data_ingresso}}</p>
                                        <p><b>Site pessoal:</b> {{petianoAtual.site_pessoal}}.</p>
                                        <p><b>Área de interesse:</b> {{petianoAtual.area_interesse}}.</p>
                                        <p><b>Lattes:</b> <a>{{petianoAtual.lattes}}</a></p>        
                                    </b-card-text>
                                </b-card>
                            </div>
                        </div>        
                    </div>
                    <div v-else> 
                        <h4>Nenhum tutor cadastrado!</h4> 
                    </div>
                </div>
                <hr>
                
                <div class="col-8 mx-auto">
                    <h2 class="titulo">Membros</h2>
                    <div v-if="petianosAtuais.length > 0" class="col-lg-16">
                        <div v-for="petianoAtual in petianosAtuais" :key="petianoAtual.id">
                            <div v-if="petianoAtual.pessoa.tipo_usuario.nome !== 'tutor'">
                                {{temPetiano = true}}
                                <b-card 
                                    :title="petianoAtual.pessoa.nome" 
                                    title-tag="h2" 
                                    img-src="https://placekitten.com/300/300" 
                                    img-alt="Card image" img-left class="mb-3">
                                    <b-card-text text-tag="h5">
                                        <p><b>Ingresso:</b> {{petianoAtual.data_ingresso}}</p>
                                        <p><b>Site pessoal:</b> {{petianoAtual.site_pessoal}}.</p>
                                        <p><b>Área de interesse:</b> {{petianoAtual.area_interesse}}.</p>
                                        <p><b>Lattes:</b> <a>{{petianoAtual.lattes}}</a></p>        
                                    </b-card-text>
                                </b-card>
                            </div>
                        </div>        
                    </div>
                    <div v-else> 
                        <h4> Nenhum petiano cadastrado!</h4> 
                    </div>
                    <div v-if="temPetiano === false"> 
                        <h4> Nenhum petiano cadastrado!</h4> 
                    </div>    
                </div>
                <hr>
                <div class="divBottom col-8 mx-auto">
                    <h2 class="titulo">Membros egressos</h2>
                    <div v-if="petianosAntigos.length > 0" class="col-lg-16">
                        <div v-for="petianoAtual in petianosAtuais" :key="petianoAtual.id">
                            <div v-for="petianoAntigo in petianosAntigos" :key="petianoAntigo.id">
                                <b-card 
                                    :title="petianoAtual.pessoa.nome" 
                                    title-tag="h2" 
                                    img-src="https://placekitten.com/300/300" 
                                    img-alt="Card image" img-left class="mb-3">
                                    <b-card-text text-tag="h5">
                                        <p><b>Ingresso:</b> {{petianoAtual.data_ingresso}}</p>
                                        <p><b>Site pessoal:</b> {{petianoAtual.site_pessoal}}.</p>
                                        <p><b>Área de interesse:</b> {{petianoAtual.area_interesse}}.</p>
                                        <p><b>Lattes:</b> <a>{{petianoAtual.lattes}}</a></p>        
                                    </b-card-text>
                                </b-card>
                            </div>
                        </div>        
                    </div>
                    <div v-else> 
                        <h4> Nenhum petiano egresso cadastrado!</h4> 
                    </div>
                    
                </div>
                



            </div>
        </div>
        <BottomBar/>
  </div>
</template>

<script>
import Comum from "../components/Comum";

import axios from "../axios";
import BottomBar from "../components/anonymous/BottomBar";
import About from "../components/anonymous/About";


export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar,
        About
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


<style>

.titulo {
margin-top: 20px;
margin-bottom: 10px;
font-weight: bold;
text-align: center;
font-size: 36px;
box-sizing: border-box;
margin: .67em 0;

}

#regular-text {
color: #333;
box-sizing: border-box;
position: relative;
padding-right: 15px;
padding-left: 15px;
float: left;
width: 66.66666667%;
text-align: justify;
}

p {
  margin: 0px 0px 0px;
}

hr {
   margin: 40px 60px 40px; 
}

.divBottom {
    margin-bottom: 50px;
}

</style>

 
