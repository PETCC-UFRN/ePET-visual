<template>
  <div>
      <Comum/>  
      <div class="container">
          <br>
          <h2 class="titulo">Notícias</h2>
          <div class="col-8 mx-auto" v-if="noticias.length > 0">
              <div v-for="noticia in noticias" :key="noticia.id">
                <div v-if="new Date(ano,mes,dia) >= new Date(noticia.inicio_exibicao) &&
                          new Date(ano,mes,dia) <= new Date(noticia.limite_exibicao)">
                  <b-card  :header="noticia.titulo">
                      <b-card-text>
                          <p>{{noticia.corpo}}</p>
                          {{haNoticiaValida = true}}
                      </b-card-text>
                  </b-card>
                </div>
              </div>    
          </div>
          <div v-if="haNoticiaValida === false" class="col-8 mx-auto">
            <br>
            <h3>Não há nenhuma notícia cadastrada.</h3>
            <br>
          </div>
          <div v-else class="col-8 mx-auto"> 
            <br>
            <h3>Não há nenhuma notícia cadastrada.</h3>
            <br>
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
        noticias: [],
        dia: new Date().getDate(),
        mes: new Date().getMonth(),
        ano: new Date().getFullYear(),
        haNoticiaValida: false 
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

 
