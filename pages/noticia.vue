<template>
  <div>
      <Comum/>  
      <div class="container">
          <br>
          <h2 class="titulo texto">Notícias</h2>
          <div class="col-8 mx-auto" v-if="filterNoticias.length > 0">
              <div v-for="noticia in filterNoticias" :key="noticia.id">
                <b-card  :header="noticia.titulo">
                    <b-card-text>
                        <p>{{noticia.corpo}}</p>
                    </b-card-text>
                </b-card>
              </div>    
          </div>
          <div v-else class="col-8 mx-auto"> 
            <br>
            <h3 class="texto">Não há nenhuma notícia cadastrada.</h3>
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
        ano: new Date().getFullYear()
    };
  },
  mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  },
  computed: {
    filterNoticias() {
      return this.noticias.filter(noticia => new Date(this.ano,this.mes,this.dia) >= new Date(noticia.inicio_exibicao) &&
            new Date(this.ano, this.mes, this.dia) <= new Date(noticia.limite_exibicao)) 
    }   
  }
  
}
</script>


<style>

.titulo {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 36px;
  box-sizing: border-box;
  margin: .67em 0;

}

.texto {
  text-align: center;
}

</style>

 
