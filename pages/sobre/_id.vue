<template>
    <div >
        <Comum/>  
        <div class="container">
            <br>
            <h1 class="mt-3"><i class="fas fa-users"></i> Membros ativos</h1>
            <hr>
            <div class="mt-5 mb-5 ml-5 mr-5">
                <b-row>
                    <b-col cols="4">
                        <b-img id="image" center rounded alt="Rounded image" v-bind="mainProps" fluid src="https://avatars3.githubusercontent.com/u/26605942?s=460&v=4" ></b-img>
                    </b-col>
                    <b-col>
                        <b-row class="mt-2">
                          <b-col>
                            <h3>Umberto Souza da Costa</h3> 
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col class="mt-1 mb-1" cols="12">
                            <span><i class="far fa-envelope"></i> <a href="mailto:#">abraaovld@gmail.com</a> </span>
                          </b-col>
                          <b-col class="mt-0 mb-2" cols="12">
                            <span><i class="fas fa-university"></i> <a href="#">lattes.cnpq.br/0832251893442489</a></span>
                          </b-col>
                          <b-col class="mt-2 mb-2">
                            <span><strong>Áreas de interesse:</strong> Linguagens de Programação, Composição de Módulos/Serviços, Bancos de Dados em Grafos.</span>
                          </b-col>  
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
        this.$axios.get("petianos-atuais").then(res => {
            this.petianosAtuais = res.data.content;
            });
      },
      async getPetianosAntigos() {
        this.$axios.get("petianos-antigos").then(res => {
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

 
