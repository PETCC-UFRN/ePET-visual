<template>
    <div >
        <Comum/>  
        <div class="container">
            <br>
            <h1 class="mt-3"><i class="fas fa-users"></i> Membros eméritos</h1>
            <hr>
            <div class="mt-5 mb-5 ml-5 mr-5">
                <b-row>
                    <b-col cols="4">
                        <b-img id="image" rounded alt="Rounded image" v-bind="mainProps" fluid src="https://avatars3.githubusercontent.com/u/26605942?s=460&v=4" ></b-img>
                    </b-col>
                    <b-col>
                        <b-row>
                            <h3>Umberto Souza da Costa</h3> 
                        </b-row>
                        <b-row>
                            <p class="mt-1 mb-1"><i class="far fa-envelope"></i> <a href="mailto:#">abraaovld@gmail.com</a> </p>
                            <p class="mt-0 mb-0"> <strong>Descrição:</strong> t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            <p class="mt-2 mb-0"><i class="fas fa-university"></i> <a href="#">lattes.cnpq.br/0832251893442489</a></p>
                            
                            <p class="mt-1 mb-2"><strong>Áreas de interesse:</strong> Linguagens de Programação, Composição de Módulos/Serviços, Bancos de Dados em Grafos.</p>
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
            mainProps: { width: 250, height: 250 },
            petianosAntigos:[]
    };
  },
  mounted() {
    this.getPetianosAntigos();
  },
  methods: {
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

#image {
  box-shadow: 0 0 5px #cccccc;
}

h1, h2 {
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}

h3 {
  font-size: 34px;
  text-align: left;
}

.about {
    text-align:center;
}

strong {
  font-size:19px;
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

 
