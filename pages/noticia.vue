<template>
  <div >
        <Comum/>  
        <div class="container">
            <br>
            <h2 class="titulo">Notícias</h2>
            <div class="col-8 mx-auto" v-if="noticias.length > 0">
                <div v-for="noticia in noticias" :key="noticia.id">
                    
                    <b-card  :title="noticia.titulo" :subtitle="noticia.inicio_exibicao">
                        <b-card-text>
                            <p>{{noticia.corpo}}</p>
                            {{noticia.inicio_exibicao}}
                        </b-card-text>
                    </b-card>
                </div>    
            </div>
            <div v-else > 
                <h3>Não há nenhuma notícia cadastrada.</h3>
            </div>

            <div>
          </div>
      </div>
    <BottomBar/>
  </div>
</template>

<script>
import Comum from "../components/Comum";
import axios from "../axios";
import BottomBar from "../components/anonymous/BottomBar";

export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar
    },
    data() {
    return {
      noticias: []
    };
  },
  mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
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

</style>

 
